// Ponto único de acesso aos dados gerados por scripts/preparar-web.mjs
import perguntas from "../dados/perguntas.json";
import personagens from "../dados/personagens.json";
import tipos from "../dados/tipos.json";
import membros from "../dados/membros.json";
import licenca from "../dados/licenca.json";

// Cada versão tem a sua identidade visual (data-tema no <html>)
export const VERSOES = {
  trupe: {
    nome: "Trupe Fantasma",
    nomeJapones: "幻影旅団",
    grupo: "Na Trupe Fantasma",
    descricao: "13 perguntas, uma para cada número da Aranha, do #0 ao #12.",
  },
  zodiaco: {
    nome: "Zodíaco",
    nomeJapones: "十二支ん",
    grupo: "No Zodíaco",
    descricao: "12 perguntas, uma para cada signo dos doze conselheiros da Associação Hunter.",
  },
};

// Signo do Zodíaco → ideograma do zodíaco chinês
export const KANJI_DO_SIGNO = {
  Rato: "子", Boi: "丑", Tigre: "寅", Coelho: "卯", "Dragão": "辰", Serpente: "巳",
  Cavalo: "午", Carneiro: "未", Macaco: "申", Galo: "酉", "Cão": "戌", Javali: "亥",
};

// { nome: { id, tipo, url, imagem } } dos membros que inspiram as perguntas
export const membroPorNome = membros;

// Membros da versão que têm o mesmo tipo de Nen do resultado
export function membrosDoTipo(versao, tipo) {
  return perguntasDa(versao)
    .filter((p) => membros[p.membro_tema]?.tipo === tipo)
    .map((p) => ({ nome: p.membro_tema, posicao: p.membro_posicao, ...membros[p.membro_tema] }));
}

export const perguntasDa = (versao) => perguntas.filter((p) => p.versao === versao);
export const tipoPorId = Object.fromEntries(tipos.map((t) => [t.id, t]));
// Todos os personagens que o site conhece: os de tipo de Nen e os da Licença Hunter
export const personagemPorId = Object.fromEntries(
  [...licenca.citados, ...licenca.hunters, ...Object.values(licenca.organizacoes).flat(), ...personagens].map((p) => [p.id, p]),
);

// Licença Hunter
export const huntersDaEspecialidade = (id) => licenca.hunters.filter((h) => h.especialidades.includes(id));
export const membrosDaOrganizacao = (id) => licenca.organizacoes[id] ?? [];
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
