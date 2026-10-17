// Prepara os dados que o site precisa, em versão enxuta.
// O site nunca lê a wiki: só estes arquivos estáticos (RNF05).
// Uso: npm run dados (dentro de web/) ou node scripts/preparar-web.mjs

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FEITOS, ORGANIZACOES } from "../conteudo/feitos.mjs";

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ler = async (arq) => JSON.parse(await readFile(path.join(raiz, "data", arq), "utf8"));

const [personagens, fontes, tipos, perguntas, imagens] = await Promise.all([
  ler("personagens.json"), ler("fontes.json"), ler("tipos-nen.json"), ler("perguntas.json"), ler("imagens.json"),
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
    imagem: imagens[p.id] ?? null,
  }))
  .sort((a, b) => a.nome.localeCompare(b.nome));

// Membros que inspiram as perguntas (Trupe e Zodíaco), com retrato e tipo
const porNome = Object.fromEntries(personagens.map((p) => [p.nome, p]));
const membros = Object.fromEntries(
  perguntas.map((q) => {
    const p = porNome[q.membro_tema];
    return [q.membro_tema, { id: p?.id ?? null, tipo: p?.tipo_nen_id ?? null, url: urlPorId[p?.fonte_id] ?? null, imagem: imagens[p?.id] ?? null }];
  }),
);

// Licença Hunter: Hunters com especialidade ou estrelas, membros de cada
// organização e os personagens citados nos feitos. Só o necessário para o cartão.
const ficha = (p) => ({ id: p.id, nome: p.nome, url: urlPorId[p.fonte_id], imagem: imagens[p.id] ?? null, tipo: p.tipo_nen_id });
const hunters = personagens
  .filter((p) => p.especialidades?.length || p.estrelas)
  .map((p) => ({ ...ficha(p), especialidades: p.especialidades, estrelas: p.estrelas }))
  .sort((a, b) => (b.estrelas ?? 0) - (a.estrelas ?? 0) || a.nome.localeCompare(b.nome));

// Até 8 por organização: com estrelas primeiro, depois quem tem tipo de Nen; sempre com retrato
const MEMBROS_POR_ORGANIZACAO = 8;
const membrosDasOrganizacoes = Object.fromEntries(
  ORGANIZACOES.map((o) => [
    o.id,
    personagens
      .filter((p) => imagens[p.id] && p.afiliacao.some((a) => o.afiliacoes.some((pre) => a.startsWith(pre))))
      .sort((a, b) => (b.estrelas ?? 0) - (a.estrelas ?? 0) || !!b.tipo_nen_id - !!a.tipo_nen_id || a.nome.localeCompare(b.nome))
      .slice(0, MEMBROS_POR_ORGANIZACAO)
      .map(ficha),
  ]),
);

const idsCitados = new Set(FEITOS.map((f) => f.paralelo.id));
const citados = personagens.filter((p) => idsCitados.has(p.id)).map(ficha);

const destino = path.join(raiz, "web", "src", "dados");
await mkdir(destino, { recursive: true });
await writeFile(path.join(destino, "personagens.json"), JSON.stringify(comTipo));
await writeFile(path.join(destino, "tipos.json"), JSON.stringify(tipos));
await writeFile(path.join(destino, "perguntas.json"), JSON.stringify(perguntas));
await writeFile(path.join(destino, "membros.json"), JSON.stringify(membros));
await writeFile(path.join(destino, "licenca.json"), JSON.stringify({ hunters, organizacoes: membrosDasOrganizacoes, citados }));
console.log(`dados do site: ${comTipo.length} personagens (${comTipo.filter((p) => p.imagem).length} com imagem), ${perguntas.length} perguntas, ${tipos.length} tipos, ${hunters.length} Hunters com especialidade ou estrelas`);
