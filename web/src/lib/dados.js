// Ponto único de acesso aos dados gerados por scripts/preparar-web.mjs
import perguntas from "../dados/perguntas.json";
import personagens from "../dados/personagens.json";
import tipos from "../dados/tipos.json";

export const VERSOES = {
  trupe: {
    nome: "Trupe Fantasma",
    descricao: "13 perguntas, uma para cada número da Aranha, do #0 ao #12.",
  },
  zodiaco: {
    nome: "Zodíaco",
    descricao: "12 perguntas, uma para cada signo dos doze conselheiros da Associação Hunter.",
  },
};

export const perguntasDa = (versao) => perguntas.filter((p) => p.versao === versao);
export const tipoPorId = Object.fromEntries(tipos.map((t) => [t.id, t]));
export const nomesDosTipos = Object.fromEntries(tipos.map((t) => [t.id, t.nome]));

export function personagensDoTipo(tipo) {
  return {
    manga: personagens.filter((p) => p.tipo === tipo && !p.foraDoManga),
    foraDoManga: personagens.filter((p) => p.tipo === tipo && p.foraDoManga),
    secundario: personagens.filter((p) => p.secundario === tipo),
  };
}

// Sinal do Teste da Água, escrito como acontece no copo
export const SINAL_DA_AGUA = {
  intensificacao: "A água subiu até transbordar.",
  transformacao: "A água parece igual, mas o sabor mudou.",
  emissao: "A água mudou de cor.",
  materializacao: "Surgiram impurezas na água.",
  manipulacao: "A folha começou a se mover.",
  especializacao: "Algo que nenhum outro tipo provoca aconteceu com o copo.",
};
