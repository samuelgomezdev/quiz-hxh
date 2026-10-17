// Embaralha uma cópia (Fisher–Yates). Usado uma vez por quiz, para que
// a ordem das opções não denuncie o tipo e se mantenha ao voltar uma pergunta.
export function embaralhar(lista, aleatorio = Math.random) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
