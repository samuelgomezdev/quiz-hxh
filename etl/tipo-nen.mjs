// Regra de negócio central do ETL: interpretar o campo "type" da infobox.
//
// Formatos encontrados na Fase 0 (610 páginas):
//   [[Nen#Enhancement|Enhancement]]<ref>…</ref>          → mangá (canônico)
//   {{dtb||Nen#Transmutation|Transmutation}}<ref>…</ref> → fora do mangá
//   [[Nen#Conjuration|…]] <br /> [[Nen#Specialization|…]] (When eyes are scarlet)
//   Unknown | Unknown (Former user) | vazio | sem campo   → tipo desconhecido
//   Manipulator                                            → nome solto, sem link

import { dividirValores, referenciasDoTrecho, textoLimpo } from "./wikitext.mjs";

// Nome em inglês (tipo ou praticante) → id usado no quiz
const ID_POR_NOME = {
  enhancement: "intensificacao", enhancer: "intensificacao",
  transmutation: "transformacao", transmuter: "transformacao",
  emission: "emissao", emitter: "emissao",
  conjuration: "materializacao", conjurer: "materializacao",
  manipulation: "manipulacao", manipulator: "manipulacao",
  specialization: "especializacao", specialist: "especializacao",
};

// Template que a wiki usa em volta do tipo quando ele vem de fora do mangá
export const FONTES_FORA_DO_MANGA = {
  dtb: "Hunter's Guide: Character & World Official Databook",
  mnls: "Hunter × Hunter Manual (livro oficial de personagens de Yu Yu Hakusho, do mesmo autor)",
  gdb: "Hunter × Hunter Characters Book: World × Character × Blessing (2001)",
  trsv: "Hunter × Hunter Treasure 9 (omnibus)",
};

const NOTAS = [
  [/when eyes are scarlet/i, "quando os olhos estão escarlates"],
  [/since lost/i, "habilidade perdida"],
  [/former user/i, "ex-usuário de Nen"],
];

function traduzirNota(texto) {
  for (const [padrao, traducao] of NOTAS) if (padrao.test(texto)) return traducao;
  return texto || null;
}

// Interpreta um único valor (um pedaço entre <br />)
function lerValor(trecho, refsNomeadas) {
  const semRefs = trecho.replace(/<ref[^>]*\/>/g, "").replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, "");
  const referencias = referenciasDoTrecho(trecho, refsNomeadas);

  // 1. Template de fonte externa: {{dtb||Nen#X|X}}
  const tpl = semRefs.match(/\{\{\s*(\w+)\s*\|\|\s*Nen#(\w+)/);
  if (tpl) {
    const id = ID_POR_NOME[tpl[2].toLowerCase()];
    if (!id) return null;
    const obra = FONTES_FORA_DO_MANGA[tpl[1]] ?? `fonte "${tpl[1]}"`;
    return { id, foraDoManga: true, obra, referencias, nota: null };
  }

  // 2. Link canônico: [[Nen#X|…]]
  const link = semRefs.match(/\[\[\s*Nen#(\w+)/);
  if (link) {
    const id = ID_POR_NOME[link[1].toLowerCase()];
    if (!id) return null;
    const resto = textoLimpo(semRefs.replace(/\[\[[^\]]*\]\]/, "")).replace(/^\(|\)$/g, "");
    return { id, foraDoManga: false, obra: null, referencias, nota: traduzirNota(resto) };
  }

  // 3. Nome solto sem link: "Manipulator"
  const palavra = textoLimpo(semRefs).split(/[\s(]/)[0].toLowerCase();
  const id = ID_POR_NOME[palavra];
  if (id) return { id, foraDoManga: false, obra: null, referencias, nota: null };

  return null; // "Unknown", vazio ou texto não reconhecido
}

// Resultado no formato do modelo de dados (Personagem)
export function interpretarTipoNen(valorDoCampo, refsNomeadas = {}) {
  const vazio = {
    tipo_nen_id: null,
    tipo_nen_secundario_id: null,
    fonte_tipo: null,
    fonte_tipo_detalhe: null,
    nota_tipo: null,
  };
  if (!valorDoCampo) return vazio;

  const lidos = dividirValores(valorDoCampo)
    .map((trecho) => lerValor(trecho, refsNomeadas))
    .filter(Boolean);

  if (lidos.length === 0) {
    const nota = traduzirNota(textoLimpo(valorDoCampo).replace(/^unknown\s*\(?|\)$/gi, "").trim());
    return { ...vazio, nota_tipo: nota && nota !== "unknown" ? nota : null };
  }

  const [principal, secundario] = lidos;
  const foraDoManga = principal.foraDoManga;
  // As referências já trazem obra e página ("…Databook (pg. 129)", "Episode 55 (2011)").
  // O livro de Yu Yu Hakusho ganha um rótulo que explica a ligação com HxH.
  const referencias = principal.referencias.map((r) =>
    /Reikaishinshiroku/i.test(r) ? FONTES_FORA_DO_MANGA.mnls : r,
  );
  const detalhe = foraDoManga && referencias.length === 0 ? [principal.obra] : referencias;

  return {
    tipo_nen_id: principal.id,
    tipo_nen_secundario_id: secundario && secundario.id !== principal.id ? secundario.id : null,
    fonte_tipo: foraDoManga ? "fora_do_manga" : "manga",
    fonte_tipo_detalhe: detalhe.length ? detalhe.join("; ") : null,
    nota_tipo: secundario?.nota ?? principal.nota ?? null,
  };
}
