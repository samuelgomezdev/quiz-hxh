// O link do resultado (RF07) precisa ida e volta sem perda, e recusar códigos quebrados.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { codificar, decodificar } from "../web/src/lib/codigo.js";

const perguntas = JSON.parse(await readFile(new URL("../data/perguntas.json", import.meta.url), "utf8"));
const trupe = perguntas.filter((p) => p.versao === "trupe");

test("codificar e decodificar devolvem as mesmas respostas", () => {
  const respostas = Object.fromEntries(trupe.map((p, i) => [p.id, p.opcoes[i % p.opcoes.length].id]));
  const codigo = codificar(trupe, respostas);
  assert.equal(codigo.length, 13);
  assert.deepEqual(decodificar(trupe, codigo), respostas);
});

test("código com tamanho errado ou letra inexistente é recusado", () => {
  assert.equal(decodificar(trupe, "abc"), null);
  assert.equal(decodificar(trupe, "zzzzzzzzzzzzz"), null);
  // a pergunta 1 tem 4 opções (a–d): "e" não existe
  assert.equal(decodificar(trupe, "eaaaaaaaaaaaa"), null);
});
