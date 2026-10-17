// Casos de teste mínimos definidos no documento de requisitos (Algoritmo de pontuação)
// e validação do conteúdo gerado.

import { test } from "node:test";
import assert from "node:assert/strict";
import { calcularResultado, distancia } from "../motor/pontuacao.mjs";
import { montarVersao, validarVersao } from "../scripts/gerar-perguntas.mjs";
import { TROUPE, ZODIACO } from "../conteudo/perguntas.mjs";

const trupe = montarVersao("trupe", TROUPE);
const zodiaco = montarVersao("zodiaco", ZODIACO);

// Responde sempre a opção do tipo pedido; se a pergunta não tiver, pega a primeira
function responderTudo(perguntas, tipo) {
  return Object.fromEntries(
    perguntas.map((p) => [p.id, (p.opcoes.find((o) => o.tipo_principal === tipo) ?? p.opcoes[0]).id]),
  );
}

test("distância no hexágono", () => {
  assert.equal(distancia("intensificacao", "intensificacao"), 0);
  assert.equal(distancia("intensificacao", "emissao"), 1);
  assert.equal(distancia("intensificacao", "especializacao"), 3);
});

test("só respostas de Intensificação → Intensificação, vizinhos a 80%", () => {
  const r = calcularResultado(trupe, responderTudo(trupe, "intensificacao"));
  assert.equal(r.principal, "intensificacao");
  assert.equal(r.afinidade.intensificacao, 100);
  assert.equal(r.afinidade.transformacao, 80);
  assert.equal(r.afinidade.emissao, 80);
  assert.equal(r.afinidade.especializacao, 0);
});

test("cada tipo é alcançável nas duas versões", () => {
  for (const perguntas of [trupe, zodiaco]) {
    for (const tipo of ["intensificacao", "transformacao", "materializacao", "especializacao", "manipulacao", "emissao"]) {
      assert.equal(calcularResultado(perguntas, responderTudo(perguntas, tipo)).principal, tipo, tipo);
    }
  }
});

test("mesmas respostas geram sempre o mesmo resultado (RF04)", () => {
  const respostas = responderTudo(zodiaco, "manipulacao");
  assert.deepEqual(calcularResultado(zodiaco, respostas), calcularResultado(zodiaco, respostas));
});

test("empate decidido pela pergunta de desempate", () => {
  const perguntas = [
    { id: "a", opcoes: [{ id: "a1", pesos: { intensificacao: 3 } }] },
    { id: "b", desempate: true, opcoes: [{ id: "b1", pesos: { emissao: 3 } }] },
  ];
  const r = calcularResultado(perguntas, { a: "a1", b: "b1" });
  assert.equal(r.principal, "emissao");
});

test("resultado Especialização: os outros cinco seguem a fórmula", () => {
  const r = calcularResultado(trupe, responderTudo(trupe, "especializacao"));
  assert.equal(r.principal, "especializacao");
  assert.equal(r.afinidade.intensificacao, 40);
  assert.equal(r.afinidade.materializacao, 80);
});

test("conteúdo das duas versões passa na validação de equilíbrio", () => {
  assert.deepEqual(validarVersao(trupe, 13).erros, []);
  assert.deepEqual(validarVersao(zodiaco, 12).erros, []);
});
