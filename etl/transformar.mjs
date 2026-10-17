// T do ETL: converte cada página da wiki em registros do modelo de dados
// (Personagem e Fonte). Função pura: mesma entrada, mesma saída.

import { urlDoArtigo } from "./api.mjs";
import { interpretarTipoNen } from "./tipo-nen.mjs";
import { categoriasDoTexto, dividirValores, lerInfobox, lerReferenciasNomeadas, numeroDoCapitulo, textoLimpo } from "./wikitext.mjs";

export const LICENCA = "CC BY-SA 3.0 — texto da Hunterpedia (hunterxhunter.fandom.com)";

// "Gon Freecss" → "gon-freecss"
export function criarId(titulo) {
  return titulo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// De onde o personagem vem, pelas categorias da página (ordem importa)
const ORIGENS = [
  ["Game-only characters", "jogo", "Personagem exclusivo de jogo"],
  ["Spin-off only characters", "spin-off", "Personagem exclusivo de spin-off"],
  ["1999 Anime-only characters", "anime-1999", "Personagem exclusivo do anime de 1999"],
  ["2011 Anime-only characters", "anime-2011", "Personagem exclusivo do anime de 2011"],
];

export function origemDoPersonagem(categorias) {
  for (const [categoria, origem, rotulo] of ORIGENS) {
    if (categorias.includes(categoria)) return { origem, rotulo };
  }
  if (categorias.includes("Movie Related Characters") && categorias.includes("Non-canon Nen users")) {
    return { origem: "filme", rotulo: "Personagem exclusivo de filme" };
  }
  return { origem: "manga", rotulo: null };
}

// O campo "type" sozinho não basta: a wiki às vezes registra sem marcação
// um tipo que vem de jogo ou de personagem que nem existe no mangá.
// As categorias da página corrigem isso.
export function ajustarFonteDoTipo(tipo, categorias, origem) {
  if (!tipo.tipo_nen_id || tipo.fonte_tipo === "fora_do_manga") return tipo;
  if (origem.origem !== "manga") {
    return { ...tipo, fonte_tipo: "fora_do_manga", fonte_tipo_detalhe: [origem.rotulo, tipo.fonte_tipo_detalhe].filter(Boolean).join("; ") };
  }
  if (categorias.includes("Unknown Nen type users") || categorias.includes("Non-canon Nen users")) {
    return { ...tipo, fonte_tipo: "fora_do_manga", fonte_tipo_detalhe: tipo.fonte_tipo_detalhe ?? "Tipo não confirmado no mangá" };
  }
  return tipo;
}

export function transformarPagina({ titulo, revisao, wikitext }, dataColeta) {
  const campos = lerInfobox(wikitext);
  const refs = lerReferenciasNomeadas(wikitext);
  const categorias = categoriasDoTexto(wikitext);
  const origem = origemDoPersonagem(categorias);
  const id = criarId(titulo);

  const personagem = {
    id,
    nome: textoLimpo(campos.name ?? "") || titulo,
    origem_personagem: origem.origem,
    ...ajustarFonteDoTipo(interpretarTipoNen(campos.type, refs), categorias, origem),
    afiliacao: dividirValores(campos.affiliation ?? "").map(textoLimpo).filter(Boolean),
    capitulo_estreia: numeroDoCapitulo(campos["manga debut"]),
    status: textoLimpo(campos.status ?? "") || null,
    fonte_id: id,
  };

  const fonte = {
    id,
    titulo_wiki: titulo,
    url_artigo: urlDoArtigo(titulo),
    revisao_wiki: revisao,
    data_coleta: dataColeta,
    licenca: LICENCA,
  };

  return { personagem, fonte };
}
