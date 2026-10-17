// E do ETL: busca na API as páginas de personagem e o wikitext de cada uma.

export const TEMPLATE_PERSONAGEM = "Hunterpedia:Character";
const LOTE = 50; // máximo de títulos por requisição permitido pela API

export async function listarPersonagens(cliente) {
  const titulos = await cliente.chamarTudo(
    { action: "query", list: "embeddedin", eititle: TEMPLATE_PERSONAGEM, einamespace: "0", eilimit: "500" },
    (r) => r.query.embeddedin.map((p) => p.title),
  );
  return [...new Set(titulos)].sort((a, b) => a.localeCompare(b));
}

// Retorna [{ titulo, revisao, wikitext }]
export async function buscarWikitext(cliente, titulos, aoProgredir = () => {}) {
  const paginas = [];
  for (let i = 0; i < titulos.length; i += LOTE) {
    const lote = titulos.slice(i, i + LOTE);
    const r = await cliente.chamar({
      action: "query",
      prop: "revisions",
      rvprop: "ids|content",
      rvslots: "main",
      titles: lote.join("|"),
    });
    for (const p of r.query.pages) {
      const rev = p.revisions?.[0];
      if (!rev) continue;
      paginas.push({ titulo: p.title, revisao: rev.revid, wikitext: rev.slots.main.content });
    }
    aoProgredir(Math.min(i + LOTE, titulos.length), titulos.length);
  }
  return paginas.sort((a, b) => a.titulo.localeCompare(b.titulo));
}
