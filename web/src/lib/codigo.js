// Converte respostas em um código curto para o link do resultado (RF07).
// Cada pergunta vira uma letra: a opção escolhida ("trupe-03-c" → "c").
// Ex.: 13 respostas da Trupe → "abdcaabcdbacf"

export function codificar(perguntas, respostas) {
  return perguntas.map((p) => (respostas[p.id] ?? "").split("-").at(-1)).join("");
}

// Devolve o mapa { perguntaId: opcaoId } ou null se o código não servir
export function decodificar(perguntas, codigo = "") {
  if (codigo.length !== perguntas.length) return null;
  const respostas = {};
  for (const [i, p] of perguntas.entries()) {
    const opcao = p.opcoes.find((o) => o.id.endsWith(`-${codigo[i]}`));
    if (!opcao) return null;
    respostas[p.id] = opcao.id;
  }
  return respostas;
}
