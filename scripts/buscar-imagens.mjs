// Gera data/imagens.json: { idDoPersonagem: urlDaMiniatura }.
// Busca o retrato de todos os personagens da base e dos membros que inspiram as perguntas
// (o site usa os de tipo de Nen, os Hunters e os membros das organizações).
// Uso: npm run imagens (usa o cache em .cache/, como o ETL)

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { criarCliente } from "../etl/api.mjs";
import { buscarImagens } from "../etl/imagens.mjs";
import { criarId } from "../etl/transformar.mjs";

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ler = async (arq) => JSON.parse(await readFile(path.join(raiz, "data", arq), "utf8"));

const [personagens, fontes, perguntas] = await Promise.all([
  ler("personagens.json"), ler("fontes.json"), ler("perguntas.json"),
]);

const tituloPorId = Object.fromEntries(fontes.map((f) => [f.id, f.titulo_wiki]));
const titulos = new Set(personagens.map((p) => tituloPorId[p.fonte_id]));
for (const p of perguntas) titulos.add(p.membro_tema);

const cliente = criarCliente({ pastaCache: path.join(raiz, ".cache") });
const porTitulo = await buscarImagens(cliente, [...titulos].sort(), (feitas, total) =>
  process.stdout.write(`\r  imagens ${feitas}/${total}`),
);
console.log();

const imagens = Object.fromEntries(
  Object.entries(porTitulo).map(([titulo, url]) => [criarId(titulo), url]).sort(([a], [b]) => a.localeCompare(b)),
);
await writeFile(path.join(raiz, "data", "imagens.json"), JSON.stringify(imagens, null, 2) + "\n", "utf8");

const semImagem = [...titulos].filter((t) => !porTitulo[t]);
console.log(`${Object.keys(imagens).length} de ${titulos.size} páginas com imagem`);
if (semImagem.length) console.log(`  sem imagem: ${semImagem.join(", ")}`);
