// "Crie o seu poder": eficiência pelo hexágono, Especialização, votos e código.

import { test } from "node:test";
import assert from "node:assert/strict";
import { avaliarPoder, codificarPoder, decodificarPoder, eficiencia } from "../motor/poder.mjs";

const base = { tipo: "transformacao", categoria: "transformacao", forma: "corpo", gatilho: "toque", vivencia: "eletricidade", votos: [] };

test("eficiência segue o hexágono", () => {
  assert.equal(eficiencia("transformacao", "transformacao"), 100);
  assert.equal(eficiencia("transformacao", "emissao"), 60);
  assert.equal(eficiencia("intensificacao", "transformacao"), 80);
  assert.equal(eficiencia("intensificacao", "materializacao"), 60);
});

test("Especialização só para especialistas", () => {
  assert.equal(avaliarPoder({ ...base, categoria: "especializacao" }).possivel, false);
  assert.equal(avaliarPoder({ ...base, tipo: "especializacao", categoria: "especializacao", forma: "regra" }).possivel, true);
});

test("votos e forma natural aumentam a potência, até 100", () => {
  const sem = avaliarPoder(base).potencia;
  const com = avaliarPoder({ ...base, votos: ["tempo", "custo"] }).potencia;
  const forcada = avaliarPoder({ ...base, forma: "criatura" }).potencia;
  assert.ok(com > sem);
  assert.ok(forcada < sem);
  assert.equal(avaliarPoder({ ...base, votos: ["vida", "custo", "tempo"] }).potencia, 100);
  assert.equal(avaliarPoder({ ...base, votos: ["vida", "custo"] }).risco, "alto");
});

test("código do poder: ida e volta, sem vivência, e inválidos", () => {
  const e = { ...base, votos: ["nome", "vida"] };
  assert.deepEqual(decodificarPoder(codificarPoder(e)), e);
  const sem = { ...base, vivencia: null };
  assert.deepEqual(decodificarPoder(codificarPoder(sem)), sem);
  assert.equal(decodificarPoder("aaaaa"), null);
  assert.equal(decodificarPoder("aaaaz1r"), null); // 6 votos: acima do máximo
});
