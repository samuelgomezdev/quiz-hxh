// Cliente da API MediaWiki da Hunterpedia.
// Responsabilidades: montar a URL, respeitar o limite de taxa (RNF04),
// identificar o cliente (User-Agent) e guardar respostas em cache local.

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const API_URL = "https://hunterxhunter.fandom.com/api.php";
export const WIKI_URL = "https://hunterxhunter.fandom.com/wiki/";
const USER_AGENT = "QuizHxH-ETL/0.1 (https://github.com/samuelgomezdev)";

export function criarCliente({ pausaMs = 1000, pastaCache = ".cache", usarCache = true } = {}) {
  let ultimaChamada = 0;

  async function esperarVez() {
    const falta = ultimaChamada + pausaMs - Date.now();
    if (falta > 0) await new Promise((r) => setTimeout(r, falta));
    ultimaChamada = Date.now();
  }

  function arquivoDeCache(params) {
    const chave = createHash("sha1").update(JSON.stringify(params)).digest("hex");
    return path.join(pastaCache, `${chave}.json`);
  }

  async function chamar(params) {
    const completos = { ...params, format: "json", formatversion: "2" };
    const arquivo = arquivoDeCache(completos);

    if (usarCache) {
      try {
        return JSON.parse(await readFile(arquivo, "utf8"));
      } catch {
        // sem cache: segue para a rede
      }
    }

    const url = new URL(API_URL);
    for (const [k, v] of Object.entries(completos)) url.searchParams.set(k, v);

    for (let tentativa = 1; ; tentativa++) {
      await esperarVez();
      const resp = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
      if (resp.ok) {
        const json = await resp.json();
        if (json.error) throw new Error(`API: ${json.error.code} — ${json.error.info}`);
        await mkdir(pastaCache, { recursive: true });
        await writeFile(arquivo, JSON.stringify(json), "utf8");
        return json;
      }
      // 429/5xx: espera mais e tenta de novo, até 3 vezes
      if (tentativa < 3 && (resp.status === 429 || resp.status >= 500)) {
        await new Promise((r) => setTimeout(r, pausaMs * 5 * tentativa));
        continue;
      }
      throw new Error(`HTTP ${resp.status} em ${url}`);
    }
  }

  // Percorre todas as páginas de um resultado com "continue"
  async function chamarTudo(params, extrair) {
    const itens = [];
    let continuar = {};
    do {
      const r = await chamar({ ...params, ...continuar });
      itens.push(...extrair(r));
      continuar = r.continue ?? null;
    } while (continuar);
    return itens;
  }

  return { chamar, chamarTudo };
}

export function urlDoArtigo(titulo) {
  return WIKI_URL + encodeURIComponent(titulo.replaceAll(" ", "_")).replaceAll("%2F", "/");
}
