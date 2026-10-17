// Funções puras para ler o wikitext da Hunterpedia.
// Puras = não acessam rede nem disco; por isso são fáceis de testar.

// Lê os campos "| nome = valor" da infobox Hunterpedia:Character.
// Um "}}" no fim do valor fecha a infobox e não faz parte do campo.
export function lerInfobox(wikitext) {
  const campos = {};
  for (const linha of wikitext.split("\n")) {
    const m = linha.match(/^\s*\|\s*([^=|{}[\]]+?)\s*=(.*)$/);
    if (!m) continue;
    const nome = m[1].trim().toLowerCase();
    if (nome in campos) continue; // fica a primeira ocorrência (a da infobox)
    campos[nome] = m[2].replace(/\}\}\s*$/, "").trim();
  }
  return campos;
}

// Mapeia <ref name="x">texto</ref> definidos em qualquer parte da página.
export function lerReferenciasNomeadas(wikitext) {
  const refs = {};
  for (const m of wikitext.matchAll(/<ref\s+name\s*=\s*"?([^">/]+?)"?\s*>([\s\S]*?)<\/ref>/g)) {
    if (!(m[1] in refs)) refs[m[1]] = m[2].trim();
  }
  return refs;
}

// Remove marcação wiki e deixa só o texto legível.
export function textoLimpo(wiki) {
  return wiki
    .replace(/<ref[^>]*\/>/g, "")
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, "")
    .replace(/\[\[(?:File|Image|Arquivo):[^\]]*\]\]/gi, "")
    .replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1")
    .replace(/\[\[([^\]]*)\]\]/g, "$1")
    .replace(/'''?/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+\)/g, ")")
    .trim();
}

// Divide um campo com vários valores separados por <br />.
export function dividirValores(valor) {
  return valor
    .split(/<br\s*\/?>/i)
    .map((v) => v.trim())
    .filter(Boolean);
}

// Lista o texto de todas as referências citadas num trecho,
// resolvendo <ref name="x" /> pelas definições da página.
export function referenciasDoTrecho(trecho, refsNomeadas) {
  const textos = [];
  // Aceita atributos em qualquer ordem: <ref name="x">, <ref group="note">, <ref name="x" />
  for (const m of trecho.matchAll(/<ref((?:\s+\w+\s*=\s*"[^"]*"|\s+\w+\s*=\s*[^\s>/]+)*)\s*(\/>|>([\s\S]*?)<\/ref>)/g)) {
    const nome = m[1].match(/name\s*=\s*"?([^"\s>/]+)"?/)?.[1];
    const texto = m[3] ?? refsNomeadas[nome];
    if (texto) textos.push(textoLimpo(texto));
  }
  return [...new Set(textos)];
}

// "[[Category:Game-only characters]]" → "Game-only characters"
export function categoriasDoTexto(wikitext) {
  return [...wikitext.matchAll(/\[\[Category:([^\]|]+)/gi)].map((m) => m[1].trim());
}

// "[[Chapter 12]]" → 12
export function numeroDoCapitulo(valor = "") {
  const m = valor.match(/Chapter\s+(\d+)/i);
  return m ? Number(m[1]) : null;
}
