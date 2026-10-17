// Prepara os dados que o site precisa, em versão enxuta.
// O site nunca lê a wiki: só estes arquivos estáticos (RNF05).
// Uso: npm run dados (dentro de web/) ou node scripts/preparar-web.mjs

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ler = async (arq) => JSON.parse(await readFile(path.join(raiz, "data", arq), "utf8"));

const [personagens, fontes, tipos, perguntas] = await Promise.all([
  ler("personagens.json"), ler("fontes.json"), ler("tipos-nen.json"), ler("perguntas.json"),
]);

const urlPorId = Object.fromEntries(fontes.map((f) => [f.id, f.url_artigo]));
const comTipo = personagens
  .filter((p) => p.tipo_nen_id)
  .map((p) => ({
    id: p.id,
    nome: p.nome,
    tipo: p.tipo_nen_id,
    secundario: p.tipo_nen_secundario_id,
    foraDoManga: p.fonte_tipo === "fora_do_manga",
    fonte: p.fonte_tipo_detalhe,
    nota: p.nota_tipo,
    url: urlPorId[p.fonte_id],
  }))
  .sort((a, b) => a.nome.localeCompare(b.nome));

const destino = path.join(raiz, "web", "src", "dados");
await mkdir(destino, { recursive: true });
await writeFile(path.join(destino, "personagens.json"), JSON.stringify(comTipo));
await writeFile(path.join(destino, "tipos.json"), JSON.stringify(tipos));
await writeFile(path.join(destino, "perguntas.json"), JSON.stringify(perguntas));
console.log(`dados do site: ${comTipo.length} personagens, ${perguntas.length} perguntas, ${tipos.length} tipos`);
