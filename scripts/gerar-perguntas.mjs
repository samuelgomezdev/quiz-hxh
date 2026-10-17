// Gera data/perguntas.json a partir de conteudo/perguntas.mjs.
// 1. Expande pesos: 3 para o tipo da opção, 1 para um vizinho no hexágono
//    (o vizinho é escolhido para manter os totais equilibrados).
// 2. Valida a estrutura e o equilíbrio entre os tipos.
// 3. Simula 200 mil quizzes com respostas aleatórias para medir viés.
// Uso: npm run perguntas

import { writeFile } from "node:fs/promises";
import { TROUPE, ZODIACO } from "../conteudo/perguntas.mjs";
import { HEXAGONO, calcularResultado } from "../motor/pontuacao.mjs";

const TIPO = {
  int: "intensificacao", tra: "transformacao", mat: "materializacao",
  esp: "especializacao", man: "manipulacao", emi: "emissao",
};
const PESO_PRINCIPAL = 3;
const PESO_VIZINHO = 1;

function vizinhos(tipo) {
  const i = HEXAGONO.indexOf(tipo);
  return [HEXAGONO.at((i + 1) % 6), HEXAGONO.at((i + 5) % 6)];
}

export function montarVersao(versao, fonte) {
  const totalVizinho = Object.fromEntries(HEXAGONO.map((t) => [t, 0]));
  return fonte.map((p, i) => {
    const ordem = i + 1;
    const id = `${versao}-${String(ordem).padStart(2, "0")}`;
    const opcoes = Object.entries(p.opcoes).map(([chave, texto], j) => {
      const tipo = TIPO[chave];
      if (!tipo) throw new Error(`${id}: chave de tipo inválida "${chave}"`);
      // vizinho com menor total até agora; empate → sentido horário
      const [a, b] = vizinhos(tipo);
      const vizinho = totalVizinho[b] < totalVizinho[a] ? b : a;
      totalVizinho[vizinho] += PESO_VIZINHO;
      return {
        id: `${id}-${String.fromCharCode(97 + j)}`,
        texto,
        tipo_principal: tipo,
        pesos: { [tipo]: PESO_PRINCIPAL, [vizinho]: PESO_VIZINHO },
      };
    });
    return {
      id, versao, ordem,
      membro_tema: p.membro,
      membro_posicao: p.posicao,
      desempate: Boolean(p.desempate),
      texto: p.texto,
      opcoes,
    };
  });
}

export function validarVersao(perguntas, quantidadeEsperada) {
  const erros = [];
  if (perguntas.length !== quantidadeEsperada) erros.push(`esperava ${quantidadeEsperada} perguntas, há ${perguntas.length}`);
  if (!perguntas.at(-1)?.desempate) erros.push("a última pergunta deve ser a de desempate");
  if (perguntas.filter((p) => p.desempate).length !== 1) erros.push("deve haver exatamente uma pergunta de desempate");
  for (const p of perguntas) {
    if (p.opcoes.length < 4 || p.opcoes.length > 6) erros.push(`${p.id}: precisa de 4 a 6 opções`);
    const tipos = p.opcoes.map((o) => o.tipo_principal);
    if (new Set(tipos).size !== tipos.length) erros.push(`${p.id}: tipo repetido nas opções`);
  }
  // Equilíbrio: quantas vezes cada tipo é a opção principal e o peso total
  const vezes = Object.fromEntries(HEXAGONO.map((t) => [t, 0]));
  const peso = Object.fromEntries(HEXAGONO.map((t) => [t, 0]));
  for (const p of perguntas) for (const o of p.opcoes) {
    vezes[o.tipo_principal]++;
    for (const [t, v] of Object.entries(o.pesos)) peso[t] += v;
  }
  const amplitude = (obj) => Math.max(...Object.values(obj)) - Math.min(...Object.values(obj));
  if (amplitude(vezes) > 0) erros.push(`tipos aparecem um número desigual de vezes: ${JSON.stringify(vezes)}`);
  if (amplitude(peso) > 1) erros.push(`peso total desequilibrado: ${JSON.stringify(peso)}`);
  return { erros, vezes, peso };
}

// Simulação com gerador pseudoaleatório de semente fixa (resultado reprodutível)
export function simular(perguntas, n = 200_000, semente = 42) {
  let s = semente;
  const aleatorio = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const contagem = Object.fromEntries(HEXAGONO.map((t) => [t, 0]));
  for (let i = 0; i < n; i++) {
    const respostas = {};
    for (const p of perguntas) respostas[p.id] = p.opcoes[Math.floor(aleatorio() * p.opcoes.length)].id;
    contagem[calcularResultado(perguntas, respostas).principal]++;
  }
  return Object.fromEntries(HEXAGONO.map((t) => [t, +(100 * contagem[t] / n).toFixed(1)]));
}

async function main() {
  const versoes = [
    ["trupe", TROUPE, 13],
    ["zodiaco", ZODIACO, 12],
  ];
  const todas = [];
  let falhou = false;
  for (const [versao, fonte, qtd] of versoes) {
    const perguntas = montarVersao(versao, fonte);
    const { erros, vezes, peso } = validarVersao(perguntas, qtd);
    console.log(`\n${versao}: ${perguntas.length} perguntas`);
    console.log("  vezes como opção principal:", vezes);
    console.log("  peso total por tipo:      ", peso);
    console.log("  resultado com respostas aleatórias (%):", simular(perguntas));
    if (erros.length) { falhou = true; console.error("  ERROS:\n   - " + erros.join("\n   - ")); }
    todas.push(...perguntas);
  }
  if (falhou) process.exit(1);
  await writeFile("data/perguntas.json", JSON.stringify(todas, null, 2) + "\n", "utf8");
  console.log("\nGravado data/perguntas.json");
}

if (import.meta.url === `file://${process.argv[1]}`) main();
