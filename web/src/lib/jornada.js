// A jornada completa: quiz → Hatsu → Licença / poder. Quem chega por ela
// carrega no link as respostas anteriores (versão, código do quiz e do Hatsu),
// e as telas seguintes recalculam o tipo e o Hatsu a partir delas.
import { gerarHatsu, decodificarHatsu } from "../../../motor/hatsu.mjs";
import { calcularResultado } from "../../../motor/pontuacao.mjs";
import { decodificar } from "./codigo.js";
import { perguntasDa, VERSOES } from "./dados.js";

// Devolve { versao, codigo, codigoHatsu, tipo, hatsu } ou null se o link não tiver a jornada
export function lerJornada(versao, codigo, codigoHatsu) {
  if (!VERSOES[versao]) return null;
  const perguntas = perguntasDa(versao);
  const respostas = decodificar(perguntas, codigo);
  if (!respostas) return null;
  const tipo = calcularResultado(perguntas, respostas).principal;
  const escolhas = codigoHatsu ? decodificarHatsu(codigoHatsu) : null;
  return { versao, codigo, codigoHatsu: escolhas ? codigoHatsu : null, tipo, hatsu: escolhas && gerarHatsu(tipo, escolhas) };
}

// "trupe/abc/aaad" para continuar a jornada no próximo link
export const caminhoDaJornada = (j) => (j ? [j.versao, j.codigo, j.codigoHatsu].filter(Boolean).join("/") : "");
