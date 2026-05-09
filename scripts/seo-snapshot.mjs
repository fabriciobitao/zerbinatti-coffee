/**
 * Captura snapshot SEO de cada rota: title, description, canonical, og:*,
 * twitter:*, robots, count de JSON-LD.
 *
 * Uso:
 *   node scripts/seo-snapshot.mjs http://localhost:3000
 *
 * Saida: imprime tabela em stdout + grava JSON em docs/seo-snapshots/<timestamp>.json
 */

import puppeteer from "puppeteer-core";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.argv[2] || "http://localhost:3000";

const ROUTES = [
  "/",
  "/cafes/classico",
  "/cafes/reserva",
  "/cafes/microlote",
  "/fazenda",
  "/processo",
  "/revista",
  "/revista/serra-do-cabral-terroir",
  "/revista/torra-sob-demanda-por-que-importa",
  "/revista/historia-giuseppe-zerbinatti-1897",
  "/para-empresas",
  "/termos",
  "/privacidade",
  "/entregas",
  "/sitemap.xml",
  "/robots.txt",
];

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--disable-gpu"],
});

const page = await browser.newPage();

const results = [];

for (const route of ROUTES) {
  const url = BASE + route;
  try {
    const resp = await page.goto(url, { waitUntil: "networkidle0", timeout: 20000 });
    const status = resp ? resp.status() : 0;

    if (route === "/sitemap.xml" || route === "/robots.txt") {
      const text = await page.evaluate(() => document.documentElement.textContent || "");
      results.push({
        route,
        status,
        bytes: text.length,
        preview: text.slice(0, 200),
      });
      continue;
    }

    const meta = await page.evaluate(() => {
      const get = (sel) => document.querySelector(sel)?.getAttribute("content") || null;
      const getProp = (prop) => document.querySelector(`meta[property="${prop}"]`)?.getAttribute("content") || null;
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") || null;
      const h1s = Array.from(document.querySelectorAll("h1")).map((el) => el.textContent?.trim() || "");
      const ldJson = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .map((el) => {
          try {
            return JSON.parse(el.textContent || "");
          } catch {
            return { _parseError: true };
          }
        });
      return {
        title: document.title,
        description: get('meta[name="description"]'),
        robots: get('meta[name="robots"]'),
        canonical,
        ogTitle: getProp("og:title"),
        ogDescription: getProp("og:description"),
        ogType: getProp("og:type"),
        ogUrl: getProp("og:url"),
        ogImage: getProp("og:image"),
        twitterCard: get('meta[name="twitter:card"]'),
        h1Count: h1s.length,
        h1First: h1s[0] || null,
        ldJsonCount: ldJson.length,
        ldJsonTypes: ldJson.flatMap((d) => {
          if (Array.isArray(d)) return d.map((x) => x["@type"]);
          return [d["@type"]];
        }).filter(Boolean),
      };
    });

    results.push({ route, status, ...meta });
  } catch (err) {
    results.push({ route, error: err.message });
  }
}

await browser.close();

console.log("\nSEO SNAPSHOT — " + BASE + "\n" + "=".repeat(60) + "\n");
for (const r of results) {
  console.log(`${r.route}  [${r.status ?? "?"}]`);
  if (r.error) {
    console.log(`  ERRO: ${r.error}`);
    continue;
  }
  if (r.preview !== undefined) {
    console.log(`  bytes: ${r.bytes}`);
    console.log(`  preview: ${r.preview.replace(/\n/g, " ").slice(0, 100)}`);
    continue;
  }
  console.log(`  title: ${r.title}`);
  console.log(`  desc:  ${(r.description || "—").slice(0, 100)}`);
  console.log(`  robots:    ${r.robots || "—"}`);
  console.log(`  canonical: ${r.canonical || "—"}`);
  console.log(`  og:type=${r.ogType || "—"}  og:url=${r.ogUrl || "—"}`);
  console.log(`  h1: ${r.h1Count} — "${(r.h1First || "").slice(0, 70)}"`);
  console.log(`  JSON-LD: ${r.ldJsonCount} script(s) — types: ${(r.ldJsonTypes || []).join(", ") || "—"}`);
  console.log("");
}

const dir = "docs/seo-snapshots";
await mkdir(dir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const out = join(dir, `${stamp}.json`);
await writeFile(out, JSON.stringify({ base: BASE, results }, null, 2), "utf8");
console.log(`Salvo em ${out}`);
