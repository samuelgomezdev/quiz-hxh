// Casos reais tirados das páginas da Hunterpedia (Fase 0).
// Rodar: npm test

import { test } from "node:test";
import assert from "node:assert/strict";
import { interpretarTipoNen } from "../etl/tipo-nen.mjs";

test("Gon: tipo do mangá com referência de capítulo", () => {
  const r = interpretarTipoNen(
    `[[Nen#Enhancement|Enhancement]]<ref name="chap60">Hunter × Hunter - Volume 7, Chapter 60</ref>`,
  );
  assert.equal(r.tipo_nen_id, "intensificacao");
  assert.equal(r.tipo_nen_secundario_id, null);
  assert.equal(r.fonte_tipo, "manga");
  assert.equal(r.fonte_tipo_detalhe, "Hunter × Hunter - Volume 7, Chapter 60");
});

test("Killua: <ref name /> resolvida pelas referências da página", () => {
  const r = interpretarTipoNen(`[[Nen#Transmutation|Transmutation]]<ref name="chap60" />`, {
    chap60: "Hunter × Hunter - Volume 7, Chapter 60",
  });
  assert.equal(r.tipo_nen_id, "transformacao");
  assert.equal(r.fonte_tipo_detalhe, "Hunter × Hunter - Volume 7, Chapter 60");
});

test("Kurapika: dois tipos separados por <br /> com nota", () => {
  const r = interpretarTipoNen(
    `[[Nen#Conjuration|Conjuration]]<ref name="chap83">Vol 9, Chapter 83</ref> <br /> [[Nen#Specialization|Specialization]] (When eyes are scarlet)<ref name="chap83" />`,
  );
  assert.equal(r.tipo_nen_id, "materializacao");
  assert.equal(r.tipo_nen_secundario_id, "especializacao");
  assert.equal(r.nota_tipo, "quando os olhos estão escarlates");
});

test("Feitan: tipo fora do mangá, com databook e episódio do anime", () => {
  const r = interpretarTipoNen(
    `{{dtb||Nen#Transmutation|Transmutation}}<ref name="databook" /><ref name="ep55">Hunter x Hunter - Episode 55 (2011)</ref>`,
    { databook: "Hunter's Guide; Character & World Official Databook (pg. 129)" },
  );
  assert.equal(r.tipo_nen_id, "transformacao");
  assert.equal(r.fonte_tipo, "fora_do_manga");
  assert.match(r.fonte_tipo_detalhe, /Databook \(pg\. 129\)/);
  assert.match(r.fonte_tipo_detalhe, /Episode 55/);
});

test("Meleoron: livro de Yu Yu Hakusho ganha rótulo explicativo", () => {
  const r = interpretarTipoNen(
    `{{mnls||Nen#Specialization|Specialization}}<ref name="manual">Yu ★ Yu ★ Hakusho Official Characters Book Reikaishinshiroku, Hunter × Hunter Manual (section)</ref>`,
  );
  assert.equal(r.tipo_nen_id, "especializacao");
  assert.equal(r.fonte_tipo, "fora_do_manga");
  assert.match(r.fonte_tipo_detalhe, /mesmo autor/);
});

test("Unknown, vazio e campo ausente: sem tipo e sem fonte", () => {
  for (const valor of ["Unknown", "", undefined]) {
    const r = interpretarTipoNen(valor);
    assert.equal(r.tipo_nen_id, null, `valor: ${valor}`);
    assert.equal(r.fonte_tipo, null);
  }
});

test("Unknown (Former user): sem tipo, mas guarda a nota", () => {
  const r = interpretarTipoNen("Unknown (Former user)");
  assert.equal(r.tipo_nen_id, null);
  assert.equal(r.nota_tipo, "ex-usuário de Nen");
});

test("Nome solto sem link: 'Manipulator'", () => {
  assert.equal(interpretarTipoNen("Manipulator").tipo_nen_id, "manipulacao");
});

test("Habilidade perdida: mantém o tipo e registra a nota", () => {
  const r = interpretarTipoNen("[[Nen#Conjuration|Conjuration]] (Since lost)");
  assert.equal(r.tipo_nen_id, "materializacao");
  assert.equal(r.nota_tipo, "habilidade perdida");
});
