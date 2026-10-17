import { test } from "node:test";
import assert from "node:assert/strict";
import { lerInfobox, numeroDoCapitulo, textoLimpo } from "../etl/wikitext.mjs";
import { criarId, transformarPagina } from "../etl/transformar.mjs";
import { validar } from "../etl/index.mjs";

const PAGINA = `{{Hunterpedia:Character
|name = Gon Freecss
|manga debut = [[Chapter 1]]
|affiliation = [[Hunter Association]] <br /> [[Extermination Team]]
|status = Alive
|type = [[Nen#Enhancement|Enhancement]]<ref name="chap60">Hunter × Hunter - Volume 7, Chapter 60</ref>}}
'''Gon Freecss''' is a Rookie Hunter.`;

test("lerInfobox: lê campos e ignora o }} que fecha a infobox", () => {
  const c = lerInfobox(PAGINA);
  assert.equal(c.name, "Gon Freecss");
  assert.ok(!c.type.endsWith("}}"));
});

test("textoLimpo: remove links, refs e negrito", () => {
  assert.equal(textoLimpo(`[[Hunter Association#Types|Rookie Hunter]]<ref>x</ref>`), "Rookie Hunter");
});

test("numeroDoCapitulo", () => {
  assert.equal(numeroDoCapitulo("[[Chapter 1]]"), 1);
  assert.equal(numeroDoCapitulo(""), null);
});

test("criarId gera slug estável", () => {
  assert.equal(criarId("Gon Freecss"), "gon-freecss");
  assert.equal(criarId("Rōmaji Test"), "romaji-test");
});

test("transformarPagina monta Personagem e Fonte ligados pelo id", () => {
  const { personagem, fonte } = transformarPagina({ titulo: "Gon Freecss", revisao: 123, wikitext: PAGINA }, "2026-10-16");
  assert.equal(personagem.tipo_nen_id, "intensificacao");
  assert.deepEqual(personagem.afiliacao, ["Hunter Association", "Extermination Team"]);
  assert.equal(personagem.capitulo_estreia, 1);
  assert.equal(personagem.fonte_id, fonte.id);
  assert.equal(fonte.url_artigo, "https://hunterxhunter.fandom.com/wiki/Gon_Freecss");
  assert.match(fonte.licenca, /CC BY-SA/);
});

test("validar acusa id repetido e tipo inválido", () => {
  const erros = validar(
    [
      { id: "a", tipo_nen_id: "intensificacao", fonte_tipo: "manga" },
      { id: "a", tipo_nen_id: "voar", fonte_tipo: "manga" },
    ],
    new Set(["intensificacao"]),
  );
  assert.equal(erros.length, 2);
});

// Casos achados na conferência contra as categorias da wiki
test("Sabaki: personagem só de jogo tem tipo marcado como fora do mangá", () => {
  const wt = `{{Hunterpedia:Character\n|name = Sabaki\n|type = [[Nen#Enhancement|Enhancement]]}}\n[[Category:Game-only characters]]`;
  const { personagem } = transformarPagina({ titulo: "Sabaki", revisao: 1, wikitext: wt }, "2026-10-16");
  assert.equal(personagem.origem_personagem, "jogo");
  assert.equal(personagem.fonte_tipo, "fora_do_manga");
  assert.match(personagem.fonte_tipo_detalhe, /exclusivo de jogo/);
});

test("Riehlvelt: tipo vindo de nota (ref group) e categoria 'Unknown' vira fora do mangá", () => {
  const wt = `{{Hunterpedia:Character\n|type = [[Emission]]<ref group="note">Classified as Emitter in [[Hunter × Hunter Battle Collection]]</ref>}}\n[[Category:Unknown Nen type users]]`;
  const { personagem } = transformarPagina({ titulo: "Riehlvelt", revisao: 1, wikitext: wt }, "2026-10-16");
  assert.equal(personagem.tipo_nen_id, "emissao");
  assert.equal(personagem.origem_personagem, "manga");
  assert.equal(personagem.fonte_tipo, "fora_do_manga");
  assert.match(personagem.fonte_tipo_detalhe, /Battle Collection/);
});
