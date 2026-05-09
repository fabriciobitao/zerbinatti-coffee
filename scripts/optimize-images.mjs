/**
 * Otimiza imagens em public/assets/* gerando webp + avif lado-a-lado dos originais.
 *
 * Uso: `node scripts/optimize-images.mjs`
 *
 * Estrategia:
 *   - JPG/PNG -> gera .webp (q82) e .avif (q60). Original preservado.
 *   - WEBP existente >300KB -> recomprime in-place em q78.
 *   - AVIF nao gerado se ja existe e e mais novo que o original.
 *   - Pula se o output existe e e mais novo que input.
 *
 * Por que: hero-bg.jpg (150KB), rotulo-500g.png (425KB) e wordmarks PNG
 * sao critical-path/LCP. WEBP+AVIF reduzem 50-70% do payload.
 */

import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ASSETS_DIR = "public/assets";
const WEBP_Q = 82;
const AVIF_Q = 60;
const LARGE_THRESHOLD = 300 * 1024;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function isStale(input, output) {
  try {
    const [si, so] = await Promise.all([stat(input), stat(output)]);
    return si.mtimeMs > so.mtimeMs;
  } catch {
    return true;
  }
}

async function genWebp(input, output) {
  if (!(await isStale(input, output))) return { skipped: true };
  const before = (await stat(input)).size;
  await sharp(input).webp({ quality: WEBP_Q }).toFile(output);
  const after = (await stat(output)).size;
  return { input, output, before, after };
}

async function genAvif(input, output) {
  if (!(await isStale(input, output))) return { skipped: true };
  const before = (await stat(input)).size;
  await sharp(input).avif({ quality: AVIF_Q }).toFile(output);
  const after = (await stat(output)).size;
  return { input, output, before, after };
}

async function recompressWebp(input) {
  const before = (await stat(input)).size;
  if (before < LARGE_THRESHOLD) return { skipped: true };
  const buf = await sharp(input).webp({ quality: 78 }).toBuffer();
  if (buf.byteLength >= before) return { skipped: true, reason: "no gain" };
  await sharp(buf).toFile(input);
  return { input, before, after: buf.byteLength };
}

function fmt(bytes) {
  return (bytes / 1024).toFixed(1) + "KB";
}

function logResult(r) {
  if (r.skipped) return;
  const pct = (((r.before - r.after) / r.before) * 100).toFixed(0);
  const dir = r.before > r.after ? "↓" : "↑";
  console.log(`  ${r.output ?? r.input}  ${fmt(r.before)} → ${fmt(r.after)}  ${dir}${pct}%`);
}

async function main() {
  const all = [];
  for await (const file of walk(ASSETS_DIR)) all.push(file);

  console.log(`\nVarrendo ${all.length} arquivos em ${ASSETS_DIR}/...\n`);

  const tasks = [];
  for (const f of all) {
    const lower = f.toLowerCase();
    if (lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png")) {
      const stem = f.replace(/\.(jpg|jpeg|png)$/i, "");
      tasks.push(genWebp(f, `${stem}.webp`).then(logResult));
      tasks.push(genAvif(f, `${stem}.avif`).then(logResult));
    } else if (lower.endsWith(".webp")) {
      tasks.push(recompressWebp(f).then(logResult));
    }
  }

  await Promise.all(tasks);
  console.log("\nFeito.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
