// Motor do Hatsu: combinações completas, o caso do Killua e o link do resultado.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { REFERENCIAS, VIVENCIAS } from "../conteudo/hatsu.mjs";
import { HEXAGONO } from "../motor/pontuacao.mjs";
import { codificarHatsu, decodificarHatsu, gerarHatsu, PERGUNTAS_HATSU } from "../motor/hatsu.mjs";

const base = { motivacao: "proteger", alcance: "perto", voto: "nome" };

test("cada vivência tem Hatsu com nome, efeito e origem do nome para os seis tipos", () => {
  for (const v of VIVENCIAS) {
    for (const tipo of HEXAGONO) {
      const h = gerarHatsu(tipo, { ...base, vivencia: v.id });
      assert.ok(h?.nome && h.efeito && h.origemDoNome, `${v.id} × ${tipo}`);
      assert.ok(h.referencia, `${v.id} × ${tipo} sem referência`);
    }
  }
});

test("os 72 nomes de Hatsu são diferentes entre si", () => {
  const nomes = VIVENCIAS.flatMap((v) => Object.values(v.hatsu).map(([nome]) => nome));
  assert.equal(new Set(nomes).size, nomes.length);
});

test("Transformação + eletricidade → mesmo caminho do Killua", () => {
  const h = gerarHatsu("transformacao", { ...base, vivencia: "eletricidade" });
  assert.equal(h.referencia.id, "killua-zoldyck");
  assert.equal(h.referencia.relacao, "mesmo");
});

test("Intensificação + eletricidade → mesma vivência do Killua, por outro caminho", () => {
  const h = gerarHatsu("intensificacao", { ...base, vivencia: "eletricidade" });
  assert.equal(h.referencia.id, "killua-zoldyck");
  assert.equal(h.referencia.relacao, "vivencia");
});

test("o voto usa o alvo da motivação e o peso define o ganho", () => {
  const h = gerarHatsu("materializacao", { vivencia: "perda", motivacao: "vinganca", alcance: "perto", voto: "vida" });
  assert.match(h.voto.regra, /quem feriu você ou os seus/);
  assert.equal(h.voto.peso, 3);
  assert.equal(h.referencia.id, "kurapika");
});

test("o tipo das referências bate com a base da Hunterpedia", () => {
  const personagens = JSON.parse(readFileSync(new URL("../data/personagens.json", import.meta.url), "utf8"));
  const porId = Object.fromEntries(personagens.map((p) => [p.id, p]));
  for (const r of REFERENCIAS) assert.equal(porId[r.id]?.tipo_nen_id, r.tipo, r.id);
});

test("código do Hatsu: ida e volta, e código inválido", () => {
  const escolhas = { vivencia: "fogo", motivacao: "diversao", alcance: "apoio", voto: "custo" };
  const codigo = codificarHatsu(escolhas);
  assert.equal(codigo.length, PERGUNTAS_HATSU.length);
  assert.deepEqual(decodificarHatsu(codigo), escolhas);
  assert.equal(decodificarHatsu("zzzz"), null);
  assert.equal(decodificarHatsu("ab"), null);
});
