// Motor do "Crie o seu poder": avalia um poder montado peça por peça.
//   eficiência → afinidade do seu tipo com a categoria do poder (hexágono)
//   potência   → eficiência + forma natural + peso dos votos
// Especialização só é possível para quem é especialista, como na obra.

import { VIVENCIAS, VOTOS } from "../conteudo/hatsu.mjs";
import { COMENTARIOS, FORMAS, GATILHOS } from "../conteudo/poder.mjs";
import { distancia, HEXAGONO } from "./pontuacao.mjs";

export const MAX_VOTOS = 3;
export const MAX_NOME = 40;
export const MAX_DESCRICAO = 200;
const LETRAS = "abcdefghijklmnopqrstuvwxyz";

export function eficiencia(seuTipo, categoria) {
  if (categoria === "especializacao") return seuTipo === "especializacao" ? 100 : 0;
  return 100 - 20 * distancia(seuTipo, categoria);
}

// escolhas: { tipo, categoria, forma, gatilho, vivencia|null, votos: [ids] }
export function avaliarPoder(escolhas) {
  const forma = FORMAS.find((f) => f.id === escolhas.forma);
  const gatilho = GATILHOS.find((g) => g.id === escolhas.gatilho);
  const vivencia = VIVENCIAS.find((v) => v.id === escolhas.vivencia) ?? null;
  const votos = VOTOS.filter((v) => escolhas.votos.includes(v.id));
  if (!forma || !gatilho || !HEXAGONO.includes(escolhas.tipo) || !HEXAGONO.includes(escolhas.categoria)) return null;

  const efic = eficiencia(escolhas.tipo, escolhas.categoria);
  const natural = forma.naturais.includes(escolhas.categoria);
  const pesoVotos = votos.reduce((s, v) => s + v.peso, 0);
  const possivel = efic > 0;
  const potencia = possivel ? Math.min(100, Math.round(efic * 0.6 + (natural ? 15 : 0) + pesoVotos * 6)) : 0;

  const d = distancia(escolhas.tipo, escolhas.categoria);
  const comentarios = [
    d === 0 ? COMENTARIOS.proprio : d === 1 ? COMENTARIOS.vizinho : COMENTARIOS.distante,
    natural ? COMENTARIOS.natural : COMENTARIOS.forcada,
    pesoVotos === 0 ? COMENTARIOS.semVoto : pesoVotos >= 5 ? COMENTARIOS.votoPesado : null,
    escolhas.gatilho === "sempre" ? COMENTARIOS.sempre : null,
  ].filter(Boolean);

  return {
    possivel,
    eficiencia: efic,
    potencia,
    risco: pesoVotos >= 5 ? "alto" : pesoVotos >= 3 ? "médio" : "baixo",
    natural,
    forma,
    gatilho,
    vivencia,
    votos,
    comentarios: possivel ? comentarios : ["Só especialistas usam Especialização. Escolha outra categoria."],
  };
}

// Nome automático, para quem não der nome ao poder: o Hatsu da vivência escolhida
// na categoria do poder. Sem vivência, as peças escolhem uma (sempre a mesma).
export function nomeSugerido(escolhas) {
  let h = 0;
  for (const c of codificarPoder(escolhas)) h = (h * 31 + c.charCodeAt(0)) % 9973;
  const vivencia = VIVENCIAS.find((v) => v.id === escolhas.vivencia) ?? VIVENCIAS[h % VIVENCIAS.length];
  const [nome, , origem] = vivencia.hatsu[escolhas.categoria];
  return { nome, origem };
}

// Texto automático, para quem não escrever a própria descrição
export function descreverPoder(escolhas, avaliacao, nomesDosTipos) {
  const origem = avaliacao.vivencia ? `, nascido de ${avaliacao.vivencia.nome.toLowerCase()}` : "";
  return `Um poder de ${nomesDosTipos[escolhas.categoria]} ${avaliacao.forma.frase}${origem}, ativado ${avaliacao.gatilho.frase}.`;
}

// Código: tipo, categoria, forma, gatilho, vivência (ou "z") e votos em bits (base 36)
export function codificarPoder(e) {
  const letra = (lista, id) => LETRAS[lista.indexOf(id)];
  const viv = e.vivencia ? letra(VIVENCIAS.map((v) => v.id), e.vivencia) : "z";
  const bits = VOTOS.reduce((s, v, i) => (e.votos.includes(v.id) ? s + 2 ** i : s), 0);
  return [
    letra(HEXAGONO, e.tipo), letra(HEXAGONO, e.categoria),
    letra(FORMAS.map((f) => f.id), e.forma), letra(GATILHOS.map((g) => g.id), e.gatilho), viv, bits.toString(36).padStart(2, "0"),
  ].join("");
}

export function decodificarPoder(codigo = "") {
  const m = codigo.match(/^([a-z])([a-z])([a-z])([a-z])([a-z])([0-9a-z]{2})$/);
  if (!m) return null;
  const tipo = HEXAGONO[LETRAS.indexOf(m[1])];
  const categoria = HEXAGONO[LETRAS.indexOf(m[2])];
  const forma = FORMAS[LETRAS.indexOf(m[3])]?.id;
  const gatilho = GATILHOS[LETRAS.indexOf(m[4])]?.id;
  const vivencia = m[5] === "z" ? null : VIVENCIAS[LETRAS.indexOf(m[5])]?.id;
  const bits = parseInt(m[6], 36);
  const votos = VOTOS.filter((_, i) => Math.floor(bits / 2 ** i) % 2 === 1).map((v) => v.id);
  if (!tipo || !categoria || !forma || !gatilho || vivencia === undefined) return null;
  if (bits >= 2 ** VOTOS.length || votos.length > MAX_VOTOS) return null;
  return { tipo, categoria, forma, gatilho, vivencia, votos };
}
