/**
 * Setup do container GTM-PVDQBMTB pra Zerbinatti Coffee.
 *
 * Cria/atualiza:
 *  - Built-in vars (Click URL, Click Text, Page Path, Page URL, Referrer)
 *  - DLV - ecommerce, DLV - method, DLV - form_name
 *  - Trigger All Pages (pageview)
 *  - 6 triggers customEvent: view_item, add_to_cart, remove_from_cart,
 *    begin_checkout, generate_lead, sign_up
 *  - Tag GA4 Configuration (Google Tag) -> G-0S5M5M8DR8
 *  - 6 Tags GA4 Event (gaawe), uma por evento, encaminham `ecommerce` (e
 *    `method`/`form_name` quando aplicavel)
 *  - Cria + publica versao "SEO + GA4 baseline (Zerbinatti)"
 *
 * Idempotente: roda quantas vezes precisar.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { google } from "googleapis";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve OAuth secrets — centralizado em ~/.claude/skills/gtm-control/.secrets/
// (single source of truth) com fallback pra ./tools/.secrets/ (legacy).
function resolveSecrets() {
  const candidates = [
    path.join(os.homedir(), ".claude", "skills", "gtm-control", ".secrets"),
    path.join(__dirname, ".secrets"),
  ];
  for (const dir of candidates) {
    const client = path.join(dir, "oauth-client.json");
    const tokens = path.join(dir, "oauth-tokens.json");
    if (fs.existsSync(client) && fs.existsSync(tokens)) return { client, tokens, dir };
  }
  throw new Error(
    "OAuth secrets nao encontrados. Roda setup-gtm-auth.js (salva em ~/.claude/skills/gtm-control/.secrets/).",
  );
}
const { client: CLIENT_FILE, tokens: TOKEN_FILE, dir: SECRETS_DIR } = resolveSecrets();
console.log(`OAuth secrets: ${SECRETS_DIR}`);

const CONTAINER_PUBLIC_ID = "GTM-PVDQBMTB";
const GA4_MEASUREMENT_ID = "G-0S5M5M8DR8";
const VERSION_NAME = "SEO + GA4 baseline (Zerbinatti)";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (!fs.existsSync(TOKEN_FILE)) {
    throw new Error("Roda primeiro: node setup-gtm-auth.js");
  }
  const { installed } = JSON.parse(fs.readFileSync(CLIENT_FILE, "utf8"));
  const tokens = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf8"));
  const auth = new google.auth.OAuth2(installed.client_id, installed.client_secret);
  auth.setCredentials(tokens);
  const tm = google.tagmanager({ version: "v2", auth });

  // 1. Discover container
  console.log("→ Procurando container", CONTAINER_PUBLIC_ID);
  const accounts = (await tm.accounts.list()).data.account || [];
  await sleep(2500);
  let account, container;
  for (const acc of accounts) {
    const cs = (await tm.accounts.containers.list({ parent: acc.path })).data.container || [];
    const m = cs.find((c) => c.publicId === CONTAINER_PUBLIC_ID);
    if (m) {
      account = acc;
      container = m;
      break;
    }
    await sleep(2500);
  }
  if (!container) throw new Error(`Container ${CONTAINER_PUBLIC_ID} nao encontrado`);
  console.log(`✓ ${account.name} / ${container.name} (${container.publicId})`);

  // 2. Workspace
  const workspaces = (await tm.accounts.containers.workspaces.list({
    parent: container.path,
  })).data.workspace || [];
  await sleep(2500);
  const ws = workspaces.find((w) => w.name === "Default Workspace") || workspaces[0];
  console.log("✓ Workspace:", ws.name);

  // 3. Built-in vars
  const builtIns = ["clickUrl", "clickText", "pagePath", "pageUrl", "referrer"];
  console.log("\n→ Built-in variables");
  for (const type of builtIns) {
    try {
      await tm.accounts.containers.workspaces.built_in_variables.create({
        parent: ws.path,
        type: [type],
      });
      console.log(`   + ${type}`);
    } catch (err) {
      if (err.code === 409 || /already exists/i.test(err.message)) {
        console.log(`   ↻ ${type} (ja ativada)`);
      } else throw err;
    }
    await sleep(2500);
  }

  // 4. Custom dataLayer variables (DLV)
  const V = tm.accounts.containers.workspaces.variables;
  const dlvSpecs = [
    { name: "DLV - ecommerce", key: "ecommerce" },
    { name: "DLV - method", key: "method" },
    { name: "DLV - form_name", key: "form_name" },
  ];
  console.log("\n→ Custom dataLayer variables");
  const varsExisting = (await V.list({ parent: ws.path })).data.variable || [];
  await sleep(2500);
  const varByName = {};
  for (const spec of dlvSpecs) {
    const body = {
      name: spec.name,
      type: "v",
      parameter: [
        { type: "integer", key: "dataLayerVersion", value: "2" },
        { type: "boolean", key: "setDefaultValue", value: "false" },
        { type: "template", key: "name", value: spec.key },
      ],
    };
    const existing = varsExisting.find((v) => v.name === spec.name);
    if (existing) {
      const { data } = await V.update({ path: existing.path, requestBody: body });
      console.log(`   ↻ ${spec.name}`);
      varByName[spec.name] = data;
    } else {
      const { data } = await V.create({ parent: ws.path, requestBody: body });
      console.log(`   + ${spec.name}`);
      varByName[spec.name] = data;
    }
    await sleep(2500);
  }

  // 5. Triggers
  const T = tm.accounts.containers.workspaces.triggers;
  const trigsExisting = (await T.list({ parent: ws.path })).data.trigger || [];
  await sleep(2500);

  async function upsertTrigger(body) {
    const existing = trigsExisting.find((t) => t.name === body.name);
    if (existing) {
      const { data } = await T.update({ path: existing.path, requestBody: body });
      console.log(`   ↻ trigger: ${data.name}`);
      await sleep(2500);
      return data;
    } else {
      const { data } = await T.create({ parent: ws.path, requestBody: body });
      console.log(`   + trigger: ${data.name}`);
      await sleep(2500);
      return data;
    }
  }

  console.log("\n→ Triggers");
  const trigAllPages = await upsertTrigger({
    name: "All Pages — Initialization",
    type: "pageview",
  });

  const ecommerceEvents = [
    "view_item",
    "add_to_cart",
    "remove_from_cart",
    "begin_checkout",
    "generate_lead",
    "sign_up",
  ];

  const trigByEvent = {};
  for (const ev of ecommerceEvents) {
    const trig = await upsertTrigger({
      name: `Custom Event — ${ev}`,
      type: "customEvent",
      customEventFilter: [
        {
          type: "equals",
          parameter: [
            { type: "template", key: "arg0", value: "{{_event}}" },
            { type: "template", key: "arg1", value: ev },
          ],
        },
      ],
    });
    trigByEvent[ev] = trig;
  }

  // 6. Tags
  const G = tm.accounts.containers.workspaces.tags;
  const tagsExisting = (await G.list({ parent: ws.path })).data.tag || [];
  await sleep(2500);

  async function upsertTag(body) {
    const existing = tagsExisting.find((t) => t.name === body.name);
    if (existing) {
      const { data } = await G.update({ path: existing.path, requestBody: body });
      console.log(`   ↻ tag: ${data.name}`);
      await sleep(2500);
      return data;
    } else {
      const { data } = await G.create({ parent: ws.path, requestBody: body });
      console.log(`   + tag: ${data.name}`);
      await sleep(2500);
      return data;
    }
  }

  console.log("\n→ Tags");
  // 6a. GA4 Configuration (Google Tag)
  await upsertTag({
    name: "GA4 — Google Tag",
    type: "googtag",
    parameter: [{ type: "template", key: "tagId", value: GA4_MEASUREMENT_ID }],
    firingTriggerId: [trigAllPages.triggerId],
  });

  // 6b. GA4 Event tags por custom event
  // Encaminha `ecommerce` (items[]) pros eventos e-commerce padrao e
  // `method`/`form_name` pros eventos de lead.
  const eventParamsEcommerce = [
    {
      type: "list",
      key: "eventParameters",
      list: [
        {
          type: "map",
          map: [
            { type: "template", key: "name", value: "items" },
            { type: "template", key: "value", value: "{{DLV - ecommerce}}.items" },
          ],
        },
        {
          type: "map",
          map: [
            { type: "template", key: "name", value: "currency" },
            { type: "template", key: "value", value: "{{DLV - ecommerce}}.currency" },
          ],
        },
        {
          type: "map",
          map: [
            { type: "template", key: "name", value: "value" },
            { type: "template", key: "value", value: "{{DLV - ecommerce}}.value" },
          ],
        },
      ],
    },
  ];

  const eventParamsLead = [
    {
      type: "list",
      key: "eventParameters",
      list: [
        {
          type: "map",
          map: [
            { type: "template", key: "name", value: "method" },
            { type: "template", key: "value", value: "{{DLV - method}}" },
          ],
        },
        {
          type: "map",
          map: [
            { type: "template", key: "name", value: "form_name" },
            { type: "template", key: "value", value: "{{DLV - form_name}}" },
          ],
        },
      ],
    },
  ];

  const ecommerceEventNames = [
    "view_item",
    "add_to_cart",
    "remove_from_cart",
    "begin_checkout",
  ];
  const leadEventNames = ["generate_lead", "sign_up"];

  for (const ev of ecommerceEventNames) {
    await upsertTag({
      name: `GA4 — ${ev}`,
      type: "gaawe",
      parameter: [
        { type: "template", key: "measurementIdOverride", value: GA4_MEASUREMENT_ID },
        { type: "template", key: "eventName", value: ev },
        { type: "boolean", key: "sendEcommerceData", value: "true" },
        {
          type: "template",
          key: "getEcommerceDataFrom",
          value: "dataLayer",
        },
        ...eventParamsEcommerce,
      ],
      firingTriggerId: [trigByEvent[ev].triggerId],
    });
  }

  for (const ev of leadEventNames) {
    await upsertTag({
      name: `GA4 — ${ev}`,
      type: "gaawe",
      parameter: [
        { type: "template", key: "measurementIdOverride", value: GA4_MEASUREMENT_ID },
        { type: "template", key: "eventName", value: ev },
        ...eventParamsLead,
      ],
      firingTriggerId: [trigByEvent[ev].triggerId],
    });
  }

  // 7. Versao + publish
  console.log("\n→ Criando versao", VERSION_NAME);
  const opVer = await tm.accounts.containers.workspaces.create_version({
    path: ws.path,
    requestBody: {
      name: VERSION_NAME,
      notes:
        "GA4 G-0S5M5M8DR8 + 6 eventos (view_item/add_to_cart/remove_from_cart/begin_checkout/generate_lead/sign_up) via dataLayer.",
    },
  });
  const version = opVer.data.containerVersion;
  if (!version) {
    console.log("⚠ Resposta create_version sem containerVersion:", JSON.stringify(opVer.data, null, 2));
    throw new Error("Falha ao criar versao");
  }
  await sleep(2500);

  console.log(`✓ Versao criada: v${version.containerVersionId}`);
  console.log("→ Publicando...");
  await tm.accounts.containers.versions.publish({ path: version.path });
  console.log(`\n✅ PUBLICADO: v${version.containerVersionId}`);
  console.log(`   Tag Assistant: https://tagassistant.google.com/?id=${CONTAINER_PUBLIC_ID}`);
}

main().catch((err) => {
  console.error("\n❌ Erro:", err.message);
  if (err.errors) console.error(JSON.stringify(err.errors, null, 2));
  process.exit(1);
});
