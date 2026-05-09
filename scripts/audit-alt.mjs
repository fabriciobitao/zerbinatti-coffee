/**
 * Audita atributos alt em <img>/<Image> no codigo.
 * Lista alts vazios, genericos ou ausentes.
 *
 * Uso: `node scripts/audit-alt.mjs`
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const SRC_DIR = "src";
const GENERIC_ALTS = ["icon", "image", "photo", "img", "picture", "logo"];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(tsx|jsx)$/.test(entry.name)) yield full;
  }
}

const issues = [];

for await (const file of walk(SRC_DIR)) {
  const content = await readFile(file, "utf8");
  const lines = content.split(/\r?\n/);

  lines.forEach((line, i) => {
    const isImg = /<(img|Image)\b/.test(line);
    if (!isImg) return;

    const altMatch = line.match(/alt=("([^"]*)"|\{([^}]*)\})/);
    if (!altMatch) {
      const winStart = Math.max(0, i - 1);
      const winEnd = Math.min(lines.length, i + 6);
      const window = lines.slice(winStart, winEnd).join("\n");
      const winAlt = window.match(/alt=("([^"]*)"|\{([^}]*)\})/);
      if (!winAlt) {
        issues.push({ file, line: i + 1, type: "missing", code: line.trim() });
      }
      return;
    }

    const value = altMatch[2] ?? altMatch[3] ?? "";
    const trimmed = value.trim();
    if (trimmed === "" || trimmed === '""' || trimmed === "''") {
      issues.push({ file, line: i + 1, type: "empty", code: line.trim() });
    } else if (
      GENERIC_ALTS.includes(trimmed.toLowerCase()) ||
      /^["']?(icon|image|photo|img|picture)["']?$/i.test(trimmed)
    ) {
      issues.push({
        file,
        line: i + 1,
        type: "generic",
        value: trimmed,
        code: line.trim(),
      });
    }
  });
}

if (issues.length === 0) {
  console.log("\n✓ Todos os <img>/<Image> tem alt nao-trivial.\n");
} else {
  console.log(`\n${issues.length} achados:\n`);
  for (const issue of issues) {
    console.log(`  ${issue.type.toUpperCase()} ${issue.file}:${issue.line}`);
    console.log(`    ${issue.code}`);
  }
  console.log("");
}

process.exit(issues.length > 0 ? 1 : 0);
