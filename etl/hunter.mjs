// Regra de negócio: lê o campo "occupation" da infobox e descobre se o
// personagem é Hunter, qual a especialidade e quantas estrelas tem.
// Ex.: "[[Hunter Association#Ruins Hunters|Ruins Hunter]] ([[...|Double-Star]])"
//      → { hunter: true, especialidades: ["tesouros"], estrelas: 2 }

import { dividirValores, textoLimpo } from "./wikitext.mjs";

// A wiki tem dezenas de especialidades com um ou dois membros cada;
// o quiz agrupa em sete, pela natureza do trabalho.
export const ESPECIALIDADE_DA_WIKI = {
  Blacklist: "lista-negra", Crime: "lista-negra", Terrorist: "lista-negra", Poacher: "lista-negra", Problem: "lista-negra",
  Gourmet: "gourmet",
  Ruins: "tesouros", Treasure: "tesouros", Stone: "tesouros", Paleograph: "tesouros", Jackpot: "tesouros", Card: "tesouros",
  Beast: "natureza", "Unidentified Beast": "natureza", Dino: "natureza", Cute: "natureza", Botanical: "natureza", Sea: "natureza",
  Disease: "saude", Virus: "saude", Poison: "saude",
  Hacker: "informacao", Lost: "informacao",
  Music: "musica",
};

const ESTRELAS = { single: 1, one: 1, double: 2, two: 2, triple: 3, three: 3 };

// Funções e cargos que citam "Hunter" mas não são uma licença
const NAO_E_LICENCA = /amateur|association|exam|self-proclaimed|mentor/i;

export function interpretarOcupacao(valor = "") {
  const resultado = { hunter: false, especialidades: [], estrelas: null };
  for (const item of dividirValores(valor).map(textoLimpo)) {
    if (!/\bHunter\b/.test(item) || NAO_E_LICENCA.test(item)) continue;
    resultado.hunter = true;

    const estrela = item.match(/\((\w+)-Star\)/i);
    if (estrela) resultado.estrelas = Math.max(resultado.estrelas ?? 0, ESTRELAS[estrela[1].toLowerCase()] ?? 0);

    const tipo = item.replace(/\s*\(.*\)\s*/, "").match(/^(.+?)\s+Hunter$/)?.[1];
    const especialidade = tipo && ESPECIALIDADE_DA_WIKI[tipo];
    if (especialidade && !resultado.especialidades.includes(especialidade)) resultado.especialidades.push(especialidade);
  }
  return resultado;
}
