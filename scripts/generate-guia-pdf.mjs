/**
 * Gera o PDF do Guia de Brewing Zerbinatti a partir do HTML em
 * public/downloads/guia-brewing-zerbinatti.html
 *
 * Uso: `node scripts/generate-guia-pdf.mjs`
 *
 * Requer puppeteer (ja usado em outros scripts/snap*.mjs).
 */

import puppeteer from "puppeteer-core";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const HTML_PATH = resolve("public/downloads/guia-brewing-zerbinatti.html");
const PDF_PATH = resolve("public/downloads/guia-brewing-zerbinatti.pdf");

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--disable-gpu"],
});
const page = await browser.newPage();

await page.goto(pathToFileURL(HTML_PATH).href, { waitUntil: "networkidle0" });

await page.pdf({
  path: PDF_PATH,
  format: "A4",
  printBackground: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});

await browser.close();
console.log(`PDF gerado: ${PDF_PATH}`);
