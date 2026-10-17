// Motor da trilha sonora: a faixa de cada situação do site.
// A tela descreve a situação; o motor escolhe, do mais específico para o mais geral:
//   1. personagens em foco (o membro da pergunta, a referência do Hatsu, o estilo parecido,
//      os membros do mesmo tipo no resultado): o primeiro com faixa própria
//   2. grupo: o do primeiro personagem em foco que tem grupo; senão a organização
//      (licença, ou a que está na frente nas perguntas dos feitos); senão a versão do quiz
//   3. momento da tela (montar o poder, escolher a caçada...); por fim, a do início
//
// situacao: { tela, momento?, versao?, personagens?: [ids], organizacao? }
//   momento: "pergunta" ou "resultado" para quiz, resultado e Hatsu; etapa para feitos e poder

import { FAIXA_DO_GRUPO, FAIXA_DO_MOMENTO, FAIXA_DO_PERSONAGEM, FAIXAS, GRUPO_DO_PERSONAGEM } from "../conteudo/trilha.mjs";

const GRUPO = Object.fromEntries(Object.entries(GRUPO_DO_PERSONAGEM).flatMap(([g, ids]) => ids.map((id) => [id, g])));

const faixa = (id, motivo) => ({ id, ...FAIXAS[id], uri: `spotify:track:${FAIXAS[id].spotify}`, motivo });

export function faixaDaSituacao({ tela, momento, versao, personagens = [], organizacao } = {}) {
  const comFaixa = personagens.find((id) => FAIXA_DO_PERSONAGEM[id]);
  if (comFaixa) return faixa(FAIXA_DO_PERSONAGEM[comFaixa], { personagem: comFaixa });

  const tipoDeFaixa = momento === "pergunta" ? "pergunta" : "resultado";
  const membro = personagens.find((id) => GRUPO[id]);
  if (membro) return faixa(FAIXA_DO_GRUPO[GRUPO[membro]].membro, { personagem: membro, grupo: FAIXA_DO_GRUPO[GRUPO[membro]].nome });
  const grupo = FAIXA_DO_GRUPO[organizacao] ?? (["quiz", "resultado", "hatsu"].includes(tela) && FAIXA_DO_GRUPO[versao]);
  if (grupo) return faixa(grupo[tipoDeFaixa], { grupo: grupo.nome });

  return faixa(FAIXA_DO_MOMENTO[`${tela}/${momento}`] ?? FAIXA_DO_MOMENTO[tela] ?? FAIXA_DO_MOMENTO.inicio, {});
}
