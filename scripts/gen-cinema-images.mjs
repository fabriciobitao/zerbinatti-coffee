#!/usr/bin/env node
/**
 * Generates 8 cinematic photos for the Zerbinatti site using
 * Gemini 2.5 Flash Image (nano-banana) with brand assets as style references.
 *
 * Run: GEMINI_API_KEY=xxx node scripts/gen-cinema-images.mjs [--only 1,2]
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const OUT_DIR = path.join(ROOT, "public/assets/cinema");
fs.mkdirSync(OUT_DIR, { recursive: true });

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("ERROR: GEMINI_API_KEY missing in env. Source .env.local first.");
  process.exit(1);
}

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

function readRef(rel) {
  const abs = path.join(ROOT, rel);
  const buf = fs.readFileSync(abs);
  const ext = path.extname(abs).slice(1).toLowerCase();
  const mime = ext === "webp" ? "image/webp"
    : ext === "png" ? "image/png"
    : ext === "jpg" || ext === "jpeg" ? "image/jpeg"
    : "application/octet-stream";
  return { inline_data: { mime_type: mime, data: buf.toString("base64") } };
}

const PROMPTS = [
  {
    id: "01-patriarca",
    slot: "hero | linhagem",
    refs: ["public/assets/galeria/peneirar.webp", "public/images/farm/drying-yard-tree.webp"],
    text: "Editorial black-and-white portrait of a Brazilian-Italian coffee farmer, 65-70 years old, weathered face with Northern Italian features — strong nose, deep-set eyes, silver hair swept back, three-day stubble. He wears a simple chambray work shirt, unbuttoned at the collar. Soft directional window light from camera left at 45 degrees, sculpting Rembrandt-style cheekbone shadow, deep falloff into pure black background. His calloused hands cradled near chest, holding a single coffee cherry between thumb and forefinger, hands in sharp focus showing decades of harvest labor — cracked nails, sun-stained skin. Shot on Leica M with 85mm Summilux at f/1.8, shallow depth of field, eyes tack-sharp, slight focus falloff at hairline. Ilford HP5 Plus 400 film aesthetic, rich silver tones, organic grain, deep blacks crushed but textured. Quiet dignity, generational weight, Peter Lindbergh meets Sebastião Salgado. Aspect ratio 4:5. Avoid color, oversaturation, smile, modern clothing, jewelry, smooth retouched skin, stock photography lighting.",
  },
  {
    id: "02-macro-grao",
    slot: "process | varietais",
    refs: ["public/images/farm/cherries-yellow.webp", "public/assets/galeria/peneirar.webp"],
    text: "Extreme macro photograph of two coffee beans side by side on a dark walnut wood surface — on the left, a pale jade-green raw bean with fine wrinkled crease; on the right, a deeply roasted bean, mahogany-brown with glossy oil bloom, a single translucent amber oil droplet beading on its surface catching specular highlight. Single hard light source from upper left at 30 degrees, raking light revealing every surface micro-texture, deep shadow on right side of frame fading into matte black void. Shot on Canon EOS R5 with 100mm macro f/2.8, focus-stacked across both beans with surgical sharpness, background blurred to soft chocolate gradient. Color palette of dark mocha, golden amber, cream highlights — warm, velvety, restrained. Kodak Portra 400 emulation pushed warm, fine film grain, cinematic contrast curve. Editorial product photography for Kinfolk or Cereal Magazine, intimate and reverent. Aspect ratio 16:9.",
  },
  {
    id: "03-drone-amanhecer",
    slot: "hero principal | terroir",
    refs: ["public/assets/galeria/3.webp", "public/assets/galeria/5.webp"],
    text: "Aerial drone photograph at first light over a Brazilian coffee plantation in Alta Mogiana hill country. Rows of coffee trees follow contour-line planting in elegant sweeping curves across rolling terrain, geometric yet organic. Low ground mist hangs between the rows like silk, settling in the valleys. The rising sun cuts horizontally from the right edge of frame, casting long raking shadows of each tree row across the red-earth soil, creating rhythmic light-shadow striping. Sky a soft gradient from warm peach near horizon to muted teal-blue zenith. A few scattered shade trees stand as dark silhouettes among the green canopy. Shot with DJI Mavic 3 Pro Hasselblad camera, 24mm equivalent, ISO 100, deep focus front to back, slightly elevated 60-meter altitude with 15-degree tilt. Color grade: warm amber highlights, deep emerald midtones, rich coffee-brown shadows. Subtle Cinestill 50D film grain, painterly atmosphere, National Geographic editorial quality. Aspect ratio 16:9. Match the warm golden hour palette and reverent landscape mood of the brand reference images.",
  },
  {
    id: "04-trentino-1897",
    slot: "linhagem | abertura origem",
    refs: ["public/images/farm/drying-yard-tree.webp"],
    text: "Faded sepia-toned photograph evoking late 19th-century Trentino, Italian Alps. A modest stone farmhouse with weathered timber balcony and red terracotta tile roof sits on a grassy slope, wooden shutters slightly ajar. Behind it, dramatic alpine valley opens to snow-capped Dolomite peaks in misty atmospheric perspective, layered receding ridgelines fading to pale cream. Foreground shows hand-stacked dry-stone wall, a wooden hand-cart with iron-rimmed wheels resting against it, single chestnut tree casting dappled shade. No people, no modern elements — pure ancestral silence. Soft overcast diffused light, no harsh shadows, gentle highlight rolloff. Shot to feel like a recovered glass-plate photograph from 1897: warm sepia base tones with cream highlights, slight vignette, organic chemical-stain texture at frame edges, fine emulsion grain. Composition follows rule of thirds, low horizon. Color palette restrained to amber, bone, walnut, slate. Nostalgic, foundational, the visual root of a family saga. Aspect ratio 3:2.",
  },
  {
    id: "05-oregon-misty",
    slot: "manifesto futuro | sonho oregon",
    refs: ["public/images/farm/seedlings-nursery.webp", "public/images/farm/drying-yard-tree.webp"],
    text: "Cinematic landscape of the Pacific Northwest Oregon coast at early morning. Dense forest of towering Douglas firs and sitka spruces rises from a moss-covered clearing, low-lying fog drifting between trunks in horizontal layers, soft god-rays piercing the canopy from upper left where pale silver sun filters through. Foreground: a flat moss-and-lichen covered basalt boulder, on which sits a single ceramic mug of steaming black coffee, vapor curling upward in a slow ribbon that catches the light. The mug is small, off-center, almost incidental — the forest dominates. Cool palette: deep forest green, slate grey, silver mist, with one warm note from the dark coffee and faint amber rim-light on the mug. Shot on Sony A7R V with 35mm f/1.4 at f/4, deep focus, low angle 40cm above moss. Subtle Cinestill 800T tungsten cast in shadows, fine grain, slight halation around light sources. Aspirational, meditative. Aspect ratio 16:9.",
  },
  {
    id: "06-pacote-still-life",
    slot: "loja | hero produto",
    refs: ["public/images/pacote-zerbinatti-2026.png", "public/images/logo.png", "public/images/farm/cherries-yellow.webp"],
    text: "Editorial still-life of the Zerbinatti coffee package standing upright as hero on a light travertine marble slab with subtle warm-cream veining. Package label fully legible, gold wordmark catching specular highlight. Hard directional light from camera left at 45 degrees through a narrow scrim, casting a long sharp-edged shadow to the right that becomes the secondary compositional element. Scattered artfully in foreground and around the base: twelve dark-roasted coffee beans, one open green raw bean, a single dried yellow coffee cherry, and a delicate sprig of coffee leaf. Negative space dominates the upper half of frame. Background: warm cream gradient fading to deep mocha at edges, slightly out of focus. Shot on Phase One IQ4 with 80mm f/2.8 at f/8 for product sharpness, focus-stacked. Color palette of cream, travertine beige, gold, dark mocha, with single warm amber accent from the yellow cherry. Kinfolk and Cereal Magazine aesthetic, restrained, architectural. Aspect ratio 4:5. Match the warm gold-and-amber tonality of the brand wordmark.",
  },
  {
    id: "07-lavagem-cherries",
    slot: "processo pos-colheita",
    refs: ["public/images/farm/cherries-yellow.webp", "public/assets/galeria/peneirar.webp"],
    text: "High-speed photograph captured at 1/8000 second, frozen-motion frame of fresh-picked coffee cherries — vibrant ruby reds and luminous golden yellows mixed together — cascading through a stream of clear water inside a concrete wet-processing tank. Hundreds of water droplets suspended mid-air, each catching warm directional light from camera right at low 30-degree angle, glowing like amber pearls. Surface of water in tank ripples with concentric rings where cherries impact. A few cherries fully submerged, color saturated by water, others tumbling at surface, others arcing through the air trailing droplet ribbons. Shot on Canon EOS R3 with 50mm f/1.4 at f/2.8, focus on the central airborne cherry cluster, shallow depth pulling background into rich chocolate-brown blur. Color grade: deep crimson, saffron yellow, warm amber water highlights, espresso-dark shadows. Subtle film grain, cinematic contrast, Annie Leibovitz documentary energy. Hyper-real yet painterly. Aspect ratio 3:2.",
  },
  {
    id: "08-espresso-ritual",
    slot: "ritual | manifesto sensorial",
    refs: ["public/images/farm/drying-yard-tree.webp", "public/images/logo.png"],
    text: "Editorial silhouette photograph: a hand pours a dark espresso shot from the polished chrome portafilter spout of an Italian La Marzocco-style espresso machine into a small white porcelain demitasse cup below. Side-lit profile, strong warm key light from camera right rim-lighting the rising steam in dramatic spiral curls and backlighting the falling stream of espresso so it glows amber-honey at its translucent edge while reading nearly black in the body. Cup is white porcelain, slightly off-center on a dark walnut counter, espresso surface visible inside catching one bright golden specular highlight — coffee as polished black mirror reflecting warmth. Background pure deep mocha-black, machine reduced to elegant silhouette, no logos visible. Hand and forearm in shadow, only the gesture readable. Shot on Hasselblad X2D with 90mm at f/2.8, eye-level, high contrast low-key exposure. Color palette: pure black, deep mocha, warm amber accent, single cream porcelain highlight. Cinestill 800T with halation around steam, fine grain, cinematic mood. La Marzocco meets Caravaggio chiaroscuro. Aspect ratio 4:5.",
  },
];

const args = process.argv.slice(2);
const onlyArg = args.find((a) => a.startsWith("--only"))?.split("=")[1]
  ?? (args.includes("--only") ? args[args.indexOf("--only") + 1] : null);
const only = onlyArg ? new Set(onlyArg.split(",").map((s) => s.trim())) : null;

async function generate(prompt) {
  const parts = prompt.refs.map(readRef);
  parts.push({ text: prompt.text });

  const body = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ["IMAGE"],
    },
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errTxt = await res.text();
    throw new Error(`API ${res.status}: ${errTxt.slice(0, 500)}`);
  }
  const json = await res.json();
  const cand = json.candidates?.[0];
  if (!cand) throw new Error(`No candidate. Response: ${JSON.stringify(json).slice(0, 800)}`);
  const imgPart = cand.content?.parts?.find((p) => p.inlineData || p.inline_data);
  if (!imgPart) throw new Error(`No image part. Response: ${JSON.stringify(json).slice(0, 800)}`);
  const inline = imgPart.inlineData || imgPart.inline_data;
  const mime = inline.mimeType || inline.mime_type || "image/png";
  const data = inline.data;
  const ext = mime.includes("png") ? "png" : mime.includes("jpeg") ? "jpg" : "webp";
  const outPath = path.join(OUT_DIR, `${prompt.id}.${ext}`);
  fs.writeFileSync(outPath, Buffer.from(data, "base64"));
  return { outPath, bytes: Buffer.byteLength(data, "base64") };
}

(async () => {
  const targets = only ? PROMPTS.filter((p) => only.has(p.id) || only.has(p.id.split("-")[0])) : PROMPTS;
  console.log(`Generating ${targets.length} cinematic images...`);
  for (const p of targets) {
    const t0 = Date.now();
    try {
      const { outPath, bytes } = await generate(p);
      const kb = Math.round(bytes / 1024);
      const dt = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`OK  ${p.id} → ${path.relative(ROOT, outPath)} (${kb} KB, ${dt}s)`);
    } catch (e) {
      const dt = ((Date.now() - t0) / 1000).toFixed(1);
      console.error(`FAIL ${p.id} (${dt}s): ${e.message}`);
    }
  }
  console.log("Done.");
})();
