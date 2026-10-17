// Pipeline completo: Extrair → Transformar → Carregar (gravar JSON).
// Uso: npm run etl            (usa o cache local em .cache/)
//      npm run etl:limpo      (ignora o cache e consulta a wiki de novo)

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { criarCliente } from "./api.mjs";
import { buscarWikitext, listarPersonagens } from "./extrair.mjs";
import { transformarPagina } from "./transformar.mjs";

const PASTA_DADOS = "data";

async function gravar(nome, dados) {
  await writeFile(`${PASTA_DADOS}/${nome}`, JSON.stringify(dados, null, 2) + "\n", "utf8");
}

// Confere a base contra as regras do modelo antes de gravar
export function validar(personagens, tiposValidos) {
  const erros = [];
  const ids = new Set();
  for (const p of personagens) {
    if (ids.has(p.id)) erros.push(`id repetido: ${p.id}`);
    ids.add(p.id);
    for (const campo of ["tipo_nen_id", "tipo_nen_secundario_id"]) {
      if (p[campo] && !tiposValidos.has(p[campo])) erros.push(`${p.id}: ${campo} inválido (${p[campo]})`);
    }
    if (p.tipo_nen_id && !p.fonte_tipo) erros.push(`${p.id}: tipo sem fonte_tipo`);
    if (!p.tipo_nen_id && p.fonte_tipo) erros.push(`${p.id}: fonte_tipo sem tipo`);
  }
  return erros;
}

async function main() {
  const usarCache = !process.argv.includes("--sem-cache");
  const cliente = criarCliente({ usarCache });
  const dataColeta = new Date().toISOString().slice(0, 10);

  console.log("Extrair: listando páginas de personagem...");
  const titulos = await listarPersonagens(cliente);
  console.log(`  ${titulos.length} páginas`);

  const paginas = await buscarWikitext(cliente, titulos, (feitas, total) =>
    process.stdout.write(`\r  wikitext ${feitas}/${total}`),
  );
  console.log();

  console.log("Transformar...");
  const registros = paginas.map((p) => transformarPagina(p, dataColeta));
  const personagens = registros.map((r) => r.personagem);
  const fontes = registros.map((r) => r.fonte);

  const tipos = JSON.parse(await readFile(`${PASTA_DADOS}/tipos-nen.json`, "utf8"));
  const erros = validar(personagens, new Set(tipos.map((t) => t.id)));
  if (erros.length) {
    console.error("Validação falhou:\n  " + erros.join("\n  "));
    process.exit(1);
  }

  console.log("Carregar: gravando JSON...");
  await mkdir(PASTA_DADOS, { recursive: true });
  await gravar("personagens.json", personagens);
  await gravar("fontes.json", fontes);

  // Resumo para conferência
  const comTipo = personagens.filter((p) => p.tipo_nen_id);
  const porTipo = Object.fromEntries(tipos.map((t) => [t.nome, comTipo.filter((p) => p.tipo_nen_id === t.id).length]));
  console.log(`\n${personagens.length} personagens · ${comTipo.length} com tipo de Nen`);
  console.log(`  mangá: ${comTipo.filter((p) => p.fonte_tipo === "manga").length} · fora do mangá: ${comTipo.filter((p) => p.fonte_tipo === "fora_do_manga").length}`);
  console.log(`  com tipo secundário: ${personagens.filter((p) => p.tipo_nen_secundario_id).length}`);
  for (const [nome, n] of Object.entries(porTipo)) console.log(`  ${nome}: ${n}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((erro) => {
    console.error("ETL falhou:", erro.message);
    process.exit(1);
  });
}
