// Motor do quiz: algoritmo de pontuação descrito no documento de requisitos.
//   S_t = soma dos pesos das opções escolhidas para o tipo t
//   p   = tipo com maior S_t (desempate: peso na pergunta de desempate,
//         depois a ordem fixa do hexágono)
//   A_t = 100 - 20 · d(t, p); Especialização = 0% se p não for Especialização

export const HEXAGONO = ["intensificacao", "transformacao", "materializacao", "especializacao", "manipulacao", "emissao"];

export function distancia(a, b) {
  const d = Math.abs(HEXAGONO.indexOf(a) - HEXAGONO.indexOf(b));
  return Math.min(d, HEXAGONO.length - d);
}

// perguntas: [{ id, desempate?, opcoes: [{ id, pesos: { tipo: valor } }] }]
// respostas: { [perguntaId]: opcaoId }
export function calcularResultado(perguntas, respostas) {
  const soma = Object.fromEntries(HEXAGONO.map((t) => [t, 0]));
  const desempate = Object.fromEntries(HEXAGONO.map((t) => [t, 0]));

  for (const pergunta of perguntas) {
    const opcao = pergunta.opcoes.find((o) => o.id === respostas[pergunta.id]);
    if (!opcao) continue;
    for (const [tipo, valor] of Object.entries(opcao.pesos)) {
      soma[tipo] += valor;
      if (pergunta.desempate) desempate[tipo] += valor;
    }
  }

  // Ordena por soma, depois pelo peso no desempate, depois pela ordem do hexágono
  const [principal] = [...HEXAGONO].sort(
    (a, b) => soma[b] - soma[a] || desempate[b] - desempate[a] || HEXAGONO.indexOf(a) - HEXAGONO.indexOf(b),
  );

  const afinidade = Object.fromEntries(
    HEXAGONO.map((t) => {
      if (t === "especializacao" && principal !== "especializacao") return [t, 0];
      return [t, 100 - 20 * distancia(t, principal)];
    }),
  );

  return { principal, afinidade, soma };
}
