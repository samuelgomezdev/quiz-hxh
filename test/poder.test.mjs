// "Crie o seu poder": eficiência pelo hexágono, Especialização, votos, código e estilo parecido.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ESTILOS } from "../conteudo/estilos.mjs";
import { VOTOS } from "../conteudo/hatsu.mjs";
import { FORMAS, GATILHOS } from "../conteudo/poder.mjs";
import { avaliarPoder, codificarPoder, decodificarPoder, eficiencia, estilosParecidos, nomeSugerido } from "../motor/poder.mjs";
import { HEXAGONO } from "../motor/pontuacao.mjs";

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

test("sem nome, o poder recebe o Hatsu da vivência na categoria; sem vivência, sempre o mesmo", () => {
  assert.equal(nomeSugerido({ ...base, tipo: "especializacao", categoria: "especializacao", vivencia: "artesanato" }).nome, "Kintsugi");
  const sem = { ...base, vivencia: null };
  assert.ok(nomeSugerido(sem).nome && nomeSugerido(sem).origem);
  assert.deepEqual(nomeSugerido(sem), nomeSugerido({ ...sem }));
});

test("estilos da obra: personagem na base com o mesmo tipo e peças válidas", () => {
  const personagens = JSON.parse(readFileSync(new URL("../data/personagens.json", import.meta.url), "utf8"));
  const porId = Object.fromEntries(personagens.map((p) => [p.id, p]));
  for (const e of ESTILOS) {
    const p = porId[e.id];
    assert.ok(p, `${e.id} não está na base`);
    assert.equal(p.tipo_nen_id, e.tipo, e.id);
    assert.ok(HEXAGONO.includes(e.categoria), `${e.habilidade}: categoria`);
    assert.ok(FORMAS.some((f) => f.id === e.forma), `${e.habilidade}: forma`);
    assert.ok(e.gatilho === null || GATILHOS.some((g) => g.id === e.gatilho), `${e.habilidade}: gatilho`);
    for (const v of e.votos) assert.ok(VOTOS.some((x) => x.id === v), `${e.habilidade}: voto ${v}`);
    assert.ok(e.habilidade && e.resumo);
  }
});

test("estilo parecido: correntes com voto de vida → Kurapika", () => {
  const [primeiro] = estilosParecidos({ ...base, tipo: "materializacao", categoria: "materializacao", forma: "objeto", gatilho: "nome", votos: ["alvo", "vida"] });
  assert.equal(primeiro.id, "kurapika");
  assert.equal(primeiro.habilidade, "Chain Jail");
  assert.deepEqual(primeiro.emComum.votos, ["alvo", "vida"]);
});

test("estilo parecido: clone fora do próprio tipo → Kastro", () => {
  const [primeiro] = estilosParecidos({ ...base, tipo: "intensificacao", categoria: "materializacao", forma: "criatura", gatilho: "sempre" });
  assert.equal(primeiro.id, "kastro");
});

test("estilo parecido: cada categoria tem alguém, e um personagem aparece uma vez só", () => {
  for (const categoria of HEXAGONO) {
    const lista = estilosParecidos({ ...base, tipo: categoria, categoria, votos: [] });
    assert.equal(lista.length, 3);
    assert.equal(lista[0].categoria, categoria, categoria);
    assert.equal(new Set(lista.map((e) => e.id)).size, 3);
  }
});
