// Motor do Hatsu: combina o tipo de Nen (vindo do quiz) com quatro respostas
// sobre a vida da pessoa e monta a habilidade pessoal.
//   vivência  → a matéria-prima do poder (eletricidade, música, perda...)
//   tipo      → o que a aura faz com ela (reforçar, transformar, emitir...)
//   motivação → quando o poder rende mais
//   alcance   → onde o poder age
//   voto      → a regra que a pessoa aceita; regra mais pesada, poder maior

import { ALCANCES, GANHO_DO_VOTO, MOTIVACOES, REFERENCIAS, VIVENCIAS, VOTOS } from "../conteudo/hatsu.mjs";

export const PERGUNTAS_HATSU = [
  { id: "vivencia", texto: "Qual destas experiências mais marcou a sua vida?", opcoes: VIVENCIAS },
  { id: "motivacao", texto: "Por que você quer ficar mais forte?", opcoes: MOTIVACOES },
  { id: "alcance", texto: "Num confronto, onde você prefere estar?", opcoes: ALCANCES },
  { id: "voto", texto: "Que preço você aceitaria pagar por mais poder?", opcoes: VOTOS },
];

const LETRAS = "abcdefghijklmnopqrstuvwxyz";

// { vivencia: "eletricidade", ... } → "a..." (uma letra por pergunta, pela posição da opção)
export function codificarHatsu(escolhas) {
  return PERGUNTAS_HATSU.map((p) => LETRAS[p.opcoes.findIndex((o) => o.id === escolhas[p.id])] ?? "").join("");
}

export function decodificarHatsu(codigo = "") {
  if (codigo.length !== PERGUNTAS_HATSU.length) return null;
  const escolhas = {};
  for (const [i, p] of PERGUNTAS_HATSU.entries()) {
    const opcao = p.opcoes[LETRAS.indexOf(codigo[i])];
    if (!opcao) return null;
    escolhas[p.id] = opcao.id;
  }
  return escolhas;
}

// Personagem da obra mais próximo: mesma vivência e mesmo tipo; senão, mesma
// vivência por outro caminho; senão, alguém do mesmo tipo.
export function referenciaPara(tipo, vivencia) {
  const exata = REFERENCIAS.find((r) => r.vivencia === vivencia && r.tipo === tipo);
  if (exata) return { ...exata, relacao: "mesmo" };
  const mesmaVivencia = REFERENCIAS.find((r) => r.vivencia === vivencia);
  if (mesmaVivencia) return { ...mesmaVivencia, relacao: "vivencia" };
  const mesmoTipo = REFERENCIAS.find((r) => r.tipo === tipo);
  return mesmoTipo ? { ...mesmoTipo, relacao: "tipo" } : null;
}

export function gerarHatsu(tipo, escolhas) {
  const achar = (lista, id) => lista.find((o) => o.id === id);
  const vivencia = achar(VIVENCIAS, escolhas.vivencia);
  const motivacao = achar(MOTIVACOES, escolhas.motivacao);
  const alcance = achar(ALCANCES, escolhas.alcance);
  const voto = achar(VOTOS, escolhas.voto);
  if (!vivencia || !motivacao || !alcance || !voto || !vivencia.hatsu[tipo]) return null;

  const [nome, efeito] = vivencia.hatsu[tipo];
  return {
    nome,
    tipo,
    efeito,
    vivencia: { id: vivencia.id, nome: vivencia.nome, texto: vivencia.texto },
    motivacao: motivacao.efeito,
    alcance: alcance.efeito,
    alcanceId: alcance.id,
    voto: { id: voto.id, regra: voto.regra.replace("{alvo}", motivacao.alvo), peso: voto.peso, ganho: GANHO_DO_VOTO[voto.peso] },
    referencia: referenciaPara(tipo, vivencia.id),
  };
}
