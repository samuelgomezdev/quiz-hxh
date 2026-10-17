// Junta o build do site (web/dist) num único arquivo HTML para publicar
// como prévia em um Artifact do Claude. O site oficial continua sendo o
// do GitHub Pages; este arquivo é só um protótipo jogável.
// Uso: npm run site:build && node scripts/gerar-artifact.mjs

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const web = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "web");
const html = await readFile(path.join(web, "dist", "index.html"), "utf8");

const css = html.match(/href="\.\/(assets\/[^"]+\.css)"/)?.[1];
const js = html.match(/src="\.\/(assets\/[^"]+\.js)"/)?.[1];
if (!css || !js) throw new Error("Build não encontrado. Rode npm run site:build antes.");

const estilo = await readFile(path.join(web, "dist", css), "utf8");
const codigo = (await readFile(path.join(web, "dist", js), "utf8")).replaceAll("</script", "<\\/script");
const fontes = html.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>/)?.[0] ?? "";

const pagina = `<title>Qual é o seu tipo de Nen?</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fontes}
<style>${estilo}</style>
<div id="raiz"></div>
<script type="module">${codigo}</script>
`;

await mkdir(path.join(web, "artifact"), { recursive: true });
await writeFile(path.join(web, "artifact", "quiz-nen.html"), pagina);
console.log(`web/artifact/quiz-nen.html (${(pagina.length / 1024).toFixed(0)} KB)`);
