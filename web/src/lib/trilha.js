// Foco da trilha: cada tela diz ao player o que está em foco (personagens, grupo, etapa),
// e o motor (motor/trilha.mjs) escolhe a faixa. Sem foco, vale só a rota.
import { useEffect, useSyncExternalStore } from "react";

let foco = {};
const ouvintes = new Set();

function definir(novo) {
  foco = novo;
  for (const ouvir of ouvintes) ouvir();
}

export function useFocoAtual() {
  return useSyncExternalStore((ouvir) => (ouvintes.add(ouvir), () => ouvintes.delete(ouvir)), () => foco);
}

// Na tela: useFocoDaTrilha({ momento: "pergunta", personagens: ["chrollo-lucilfer"] })
export function useFocoDaTrilha(novo) {
  const chave = JSON.stringify(novo);
  useEffect(() => {
    definir(JSON.parse(chave));
    return () => definir({});
  }, [chave]);
}
