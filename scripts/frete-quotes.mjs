// Pega cotacoes reais de frete via calculadora publica do Melhor Envio.
// Origem: 37570-000. Destinos: capitais + algumas cidades interior.
import puppeteer from 'puppeteer-core';

const ORIGIN = '37570000';
const DESTS = [
  // [name, cep, region]
  ['Sao Paulo - SP',     '01310100', 'SE'],
  ['Campinas - SP',      '13010001', 'SE'],
  ['Rio de Janeiro - RJ','20040002', 'SE'],
  ['Belo Horizonte - MG','30190001', 'SE'],
  ['Juiz de Fora - MG',  '36010001', 'SE'],
  ['Vitoria - ES',       '29010001', 'SE'],
  ['Curitiba - PR',      '80010100', 'S'],
  ['Florianopolis - SC', '88010001', 'S'],
  ['Porto Alegre - RS',  '90010110', 'S'],
  ['Brasilia - DF',      '70040010', 'CO'],
  ['Goiania - GO',       '74110010', 'CO'],
  ['Cuiaba - MT',        '78005000', 'CO'],
  ['Salvador - BA',      '40010001', 'NE'],
  ['Recife - PE',        '50010001', 'NE'],
  ['Fortaleza - CE',     '60010001', 'NE'],
  ['Sao Luis - MA',      '65010010', 'NE'],
  ['Manaus - AM',        '69010010', 'N'],
  ['Belem - PA',         '66010100', 'N'],
  ['Rio Branco - AC',    '69900010', 'N'],
];
const PACKAGES = [
  { label: '250g moido', width: 18, height: 6, length: 10, weight: 0.3 },
  { label: '500g graos', width: 22, height: 7, length: 12, weight: 0.55 },
];

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const results = [];

try {
  for (const [name, cep, region] of DESTS) {
    for (const pkg of PACKAGES) {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36');
      await page.setViewport({ width: 1440, height: 900 });

      // Use a public shipping calculator API instead — try Frete Calc public endpoint
      const url = 'https://www.melhorenvio.com.br/calculadora';
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

      try {
        // Inputs may vary; try standard placeholders
        await page.waitForSelector('input[placeholder*="CEP de origem" i], input[name*="origin" i]', { timeout: 8000 });
        const origInput = await page.$('input[placeholder*="CEP de origem" i], input[name*="origin" i]');
        if (origInput) { await origInput.click({ clickCount: 3 }); await origInput.type(ORIGIN, { delay: 30 }); }

        const destInput = await page.$('input[placeholder*="CEP de destino" i], input[name*="destination" i]');
        if (destInput) { await destInput.click({ clickCount: 3 }); await destInput.type(cep, { delay: 30 }); }

        // Weight, dim
        const w = await page.$('input[name*="weight" i], input[placeholder*="Peso" i]');
        if (w) { await w.click({ clickCount: 3 }); await w.type(String(pkg.weight).replace('.', ','), { delay: 30 }); }

        // Submit
        const btn = await page.$('button[type="submit"]');
        if (btn) await btn.click();

        await new Promise(r => setTimeout(r, 4000));

        // Try to capture results
        const data = await page.evaluate(() => document.body.innerText.slice(0, 2000));
        results.push({ name, cep, region, pkg: pkg.label, data: data.slice(0, 800) });
      } catch (e) {
        results.push({ name, cep, region, pkg: pkg.label, err: e.message });
      }

      await page.close();
      break; // try only first iteration to debug
    }
    break;
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
