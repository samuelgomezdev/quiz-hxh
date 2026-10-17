// Trilha sonora: cada situação tem uma faixa definida por regra, nunca por acaso.
// Personagem com faixa própria → grupo dele → organização ou versão → momento da tela.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ORGANIZACOES } from "../conteudo/feitos.mjs";
import { FAIXA_DO_GRUPO, FAIXA_DO_MOMENTO, FAIXA_DO_PERSONAGEM, FAIXAS, GRUPO_DO_PERSONAGEM } from "../conteudo/trilha.mjs";
import { faixaDaSituacao } from "../motor/trilha.mjs";

const ler = (arq) => JSON.parse(readFileSync(new URL(`../data/${arq}`, import.meta.url), "utf8"));
const personagens = ler("personagens.json");
const porNome = Object.fromEntries(personagens.map((p) => [p.nome, p]));

test("toda faixa citada existe e tem id do Spotify, nome e tradução", () => {
  const citadas = [
    ...Object.values(FAIXA_DO_PERSONAGEM), ...Object.values(FAIXA_DO_MOMENTO),
    ...Object.values(FAIXA_DO_GRUPO).flatMap((g) => [g.pergunta, g.resultado, g.membro]),
  ];
  for (const id of citadas) assert.ok(FAIXAS[id], id);
  for (const [id, f] of Object.entries(FAIXAS)) {
    assert.match(f.spotify, /^[0-9A-Za-z]{22}$/, id);
    assert.ok(f.nome && f.traducao && [1, 2, 3].includes(f.album), id);
  }
  assert.equal(new Set(Object.values(FAIXAS).map((f) => f.spotify)).size, Object.keys(FAIXAS).length, "faixa repetida");
});

test("os personagens das regras existem na base, e cada um tem um grupo só", () => {
  const ids = new Set(personagens.map((p) => p.id));
  const doGrupo = Object.values(GRUPO_DO_PERSONAGEM).flat();
  for (const id of [...Object.keys(FAIXA_DO_PERSONAGEM), ...doGrupo]) assert.ok(ids.has(id), id);
  assert.equal(new Set(doGrupo).size, doGrupo.length);
  for (const g of Object.keys(GRUPO_DO_PERSONAGEM)) assert.ok(FAIXA_DO_GRUPO[g], g);
});

test("toda pergunta do quiz tem trilha do membro ou do grupo dele, nunca a genérica", () => {
  for (const q of ler("perguntas.json")) {
    const f = faixaDaSituacao({ tela: "quiz", versao: q.versao, momento: "pergunta", personagens: [porNome[q.membro_tema].id] });
    assert.ok(f.motivo.personagem, `${q.versao}: ${q.membro_tema}`);
  }
  const quiz = (id) => faixaDaSituacao({ tela: "quiz", versao: "trupe", momento: "pergunta", personagens: [id] }).nome;
  assert.equal(quiz("chrollo-lucilfer"), "Gyakujūji no Otoko");
  assert.equal(quiz("nobunaga-hazama"), "Iai no Kyōjin");
  assert.equal(quiz("feitan-portor"), "Genei no Banka");
  assert.equal(faixaDaSituacao({ tela: "quiz", versao: "zodiaco", personagens: ["ginta"] }).nome, "Hunter yo Eien Nare!");
});

test("licença: Zoldyck toca a mansão dos assassinos, e a Trupe nunca toca a dos Zoldyck", () => {
  for (const o of ORGANIZACOES) assert.ok(FAIXA_DO_GRUPO[o.id], o.id);
  assert.equal(faixaDaSituacao({ tela: "licenca", organizacao: "zoldyck" }).nome, "Ansatsu Ikka no Yakata");
  assert.equal(faixaDaSituacao({ tela: "licenca", organizacao: "trupe" }).nome, "Requiem Aranea");
});

test("resultado e Hatsu: personagem semelhante primeiro, depois a versão", () => {
  // Trupe, Intensificação: Nobunaga, Phinks e Uvogin; o primeiro com faixa própria é o Nobunaga
  assert.equal(faixaDaSituacao({ tela: "resultado", versao: "trupe", personagens: ["nobunaga-hazama", "phinks-magcub", "uvogin"] }).nome, "Iai no Kyōjin");
  assert.equal(faixaDaSituacao({ tela: "resultado", versao: "trupe", personagens: [] }).nome, "Requiem Aranea");
  assert.equal(faixaDaSituacao({ tela: "hatsu", versao: "trupe", personagens: ["killua-zoldyck"] }).nome, "Ginpatsu no Shōnen");
  assert.equal(faixaDaSituacao({ tela: "hatsu", versao: "zodiaco", personagens: ["ponzu"] }).nome, "Hunter yo Eien Nare!");
  assert.equal(faixaDaSituacao({ tela: "hatsu", versao: "trupe", momento: "pergunta" }).nome, "Kumo no Canzone");
});

test("Formigas Quimera: o Rei tem a sua faixa; a Guarda Real, a do palácio", () => {
  assert.equal(faixaDaSituacao({ tela: "poder", momento: "carta", personagens: ["meruem"] }).nome, "Elegy of the Dynast");
  assert.equal(faixaDaSituacao({ tela: "poder", momento: "carta", personagens: ["neferpitou"] }).id, "palacio");
  assert.equal(faixaDaSituacao({ tela: "poder", momento: "carta", personagens: ["welfin"] }).id, "soldados");
});

test("feitos: paralelo do feito marcado, espreita na caçada e uma faixa só nas perguntas de organização", () => {
  assert.equal(faixaDaSituacao({ tela: "feitos", momento: "trajetoria", personagens: ["gon-freecss"] }).nome, "Go on, Gon!");
  assert.equal(faixaDaSituacao({ tela: "feitos", momento: "trajetoria" }).id, "sonho");
  assert.equal(faixaDaSituacao({ tela: "feitos", momento: "caca" }).id, "presa");
  assert.equal(faixaDaSituacao({ tela: "feitos", momento: "organizacao" }).id, "companheiros");
});

test("poder e telas sem foco têm faixa própria; tela desconhecida cai no início", () => {
  assert.equal(faixaDaSituacao({ tela: "poder", momento: "montar" }).nome, "Latent Power");
  assert.equal(faixaDaSituacao({ tela: "poder", momento: "carta", personagens: ["ponzu"] }).nome, "Realized Capacity");
  assert.equal(faixaDaSituacao({ tela: "creditos" }).id, "baleia");
  assert.equal(faixaDaSituacao({}).id, "mundo");
  assert.equal(faixaDaSituacao({ tela: "quiz", versao: "inexistente" }).id, "mundo");
});
