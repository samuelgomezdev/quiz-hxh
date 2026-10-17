// Busca na API o retrato principal de cada página (extensão PageImages).
// O site não copia as imagens: guarda só o endereço da miniatura no CDN da Fandom.

const LOTE = 50; // máximo de títulos por requisição permitido pela API
export const LARGURA_MINIATURA = 240;

// Retorna { titulo: urlDaMiniatura } só para as páginas que têm imagem
export async function buscarImagens(cliente, titulos, aoProgredir = () => {}) {
  const imagens = {};
  for (let i = 0; i < titulos.length; i += LOTE) {
    const lote = titulos.slice(i, i + LOTE);
    const r = await cliente.chamar({
      action: "query",
      prop: "pageimages",
      piprop: "thumbnail",
      pithumbsize: String(LARGURA_MINIATURA),
      pilimit: String(LOTE),
      titles: lote.join("|"),
    });
    for (const p of r.query.pages) {
      if (p.thumbnail?.source) imagens[p.title] = p.thumbnail.source;
    }
    aoProgredir(Math.min(i + LOTE, titulos.length), titulos.length);
  }
  return imagens;
}
