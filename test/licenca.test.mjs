// Licença Hunter: leitura da ocupação na wiki, especialidade, estrelas,
// organização e o código do link.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { FEITOS, ORGANIZACOES } from "../conteudo/feitos.mjs";
import { interpretarOcupacao } from "../etl/hunter.mjs";
import { calcularLicenca, codificarLicenca, decodificarLicenca } from "../motor/licenca.mjs";

const org = { grupo: "associacao", ordens: "associacao", missao: "beyond" };

test("ocupação da wiki → especialidade e estrelas (casos reais)", () => {
  assert.deepEqual(
    interpretarOcupacao("[[Hunter Association#Ruins Hunters|Ruins Hunter]] ([[Hunter Association#2 Stars|Double-Star]]) <br /> Lead [[G.I. Game Masters|G.I. Game Master]]"),
    { hunter: true, especialidades: ["tesouros"], estrelas: 2 },
  );
  assert.deepEqual(interpretarOcupacao("[[Hunter Association#Types of Hunters|Rookie Hunter]]"), { hunter: true, especialidades: [], estrelas: null });
  assert.deepEqual(interpretarOcupacao("Leader/Mentor of Amateur Hunters"), { hunter: false, especialidades: [], estrelas: null });
  assert.equal(interpretarOcupacao("Disease Hunter (Triple-Star) <br /> Doctor").estrelas, 3);
});

test("sem prova difícil: aspirante, sem estrelas, e a prova aparece no que falta", () => {
  const l = calcularLicenca({ feitos: ["sistema", "premio"], caca: "informacao", org });
  assert.equal(l.licenciado, false);
  assert.equal(l.estrelas, 0);
  assert.match(l.faltam.join(" "), /Exame Hunter/);
});

test("estrelas seguem a regra da Associação", () => {
  const base = { caca: "informacao", org };
  assert.equal(calcularLicenca({ ...base, feitos: ["prova"] }).estrelas, 0);
  assert.equal(calcularLicenca({ ...base, feitos: ["prova", "sistema"] }).estrelas, 1);
  assert.equal(calcularLicenca({ ...base, feitos: ["prova", "sistema", "lider"] }).estrelas, 1);
  assert.equal(calcularLicenca({ ...base, feitos: ["prova", "sistema", "lider", "mentor"] }).estrelas, 2);
  assert.equal(calcularLicenca({ ...base, feitos: ["prova", "sistema", "lider", "mentor", "salvei"] }).estrelas, 3);
  assert.deepEqual(calcularLicenca({ ...base, feitos: FEITOS.map((f) => f.id) }).faltam, []);
});

test("especialidade pelos feitos; a caçada escolhida desempata", () => {
  assert.equal(calcularLicenca({ feitos: ["cozinho", "sabor"], caca: "musica", org }).especialidade.id, "gourmet");
  assert.equal(calcularLicenca({ feitos: [], caca: "musica", org }).especialidade.id, "musica");
  assert.equal(calcularLicenca({ feitos: ["toco"], caca: "natureza", org }).especialidade.id, "natureza");
});

test("organização mais escolhida; empate fica com a primeira da lista", () => {
  assert.equal(calcularLicenca({ feitos: [], caca: "gourmet", org }).organizacao.id, "associacao");
  const empate = { grupo: "trupe", ordens: "beyond", missao: "zoldyck" };
  assert.equal(calcularLicenca({ feitos: [], caca: "gourmet", org: empate }).organizacao.id,
    ORGANIZACOES.find((o) => ["trupe", "beyond", "zoldyck"].includes(o.id)).id);
});

test("código da licença: ida e volta, e códigos inválidos", () => {
  const r = { feitos: ["prova", "sistema", "palco"], caca: "informacao", org };
  assert.deepEqual(decodificarLicenca(codificarLicenca(r)), r);
  assert.deepEqual(decodificarLicenca(codificarLicenca({ ...r, feitos: [] })), { ...r, feitos: [] });
  assert.equal(decodificarLicenca("zzzzzzz-aaaa"), null);
  assert.equal(decodificarLicenca("1-a"), null);
});

test("personagens citados nos feitos existem na base", () => {
  const ids = new Set(JSON.parse(readFileSync(new URL("../data/personagens.json", import.meta.url), "utf8")).map((p) => p.id));
  for (const f of FEITOS) assert.ok(ids.has(f.paralelo.id), `${f.id}: ${f.paralelo.id}`);
});
