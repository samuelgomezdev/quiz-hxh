// Trilha sonora: player do Spotify com faixas da trilha oficial do anime de 2011
// (Yoshihisa Hirano, VAP). Nenhum áudio fica no site: o Spotify toca e licencia.
// Cada tela tem a sua faixa (FAIXAS); ao trocar de tela com a música tocando,
// a faixa nova entra no lugar e continua tocando.
// Nada é pedido ao Spotify antes do primeiro clique; ao esconder, o player continua tocando.
import { useEffect, useRef, useState } from "react";

const API = "https://open.spotify.com/embed/iframe-api/v1";

const faixa = (id, nome) => ({ uri: `spotify:track:${id}`, nome });
const MUNDO = faixa("6uTTT5YZLkrI8atUK97s52", "The World of Adventurers");
export const FAIXAS = {
  inicio: MUNDO,
  creditos: faixa("3snNowHzH6pSjIR6YDZC7I", "Kujirato Yori"),
  "quiz/trupe": faixa("4iiKpjOElvpQbuvMnHh9MA", "Riot"),
  "resultado/trupe": faixa("7uhZ0Irxe4uUk3R2MweOip", "Genei no Banka"),
  "quiz/zodiaco": faixa("2bMkC9ceeNHgh1wDcXDq3A", "Mystic Land"),
  "resultado/zodiaco": faixa("5ICyB3Khaha87FG9w6rMZx", "Hunter yo Eien Nare!"),
  feitos: faixa("5CwpBSpgpHoRwu8AXNpJQu", "Hunter ☆ March"),
  licenca: faixa("7fP6ovFqDOrvrFsjQTrRwN", "Yume wo Oikakete"),
  poder: faixa("5wkv6oyZ60NGHLPGCm79eE", "Ikkiuchi!"),
};

// Hatsu segue o resultado da versão; telas sem faixa própria ficam com a do início
export function faixaDaTela(tela, versao) {
  const t = tela === "hatsu" ? "resultado" : tela;
  return FAIXAS[`${t}/${versao}`] ?? FAIXAS[t] ?? MUNDO;
}

// Carrega a iFrame API do Spotify uma vez só
let apiPronta;
function carregarApi() {
  apiPronta ??= new Promise((resolve) => {
    window.onSpotifyIframeApiReady = resolve;
    const script = document.createElement("script");
    script.src = API;
    script.async = true;
    document.body.appendChild(script);
  });
  return apiPronta;
}

export default function Trilha({ tela, versao }) {
  const atual = faixaDaTela(tela, versao);
  const [aberto, setAberto] = useState(false);
  const [carregado, setCarregado] = useState(false);
  const alvo = useRef(null);
  const controle = useRef(null);
  const tocando = useRef(false);
  const uriAtual = useRef(atual.uri);

  function alternar() {
    setAberto((a) => !a);
    if (carregado) return;
    setCarregado(true);
    carregarApi().then((IFrameAPI) => {
      // a API troca o elemento pelo iframe; por isso ele é criado fora do React
      const el = document.createElement("div");
      alvo.current.appendChild(el);
      IFrameAPI.createController(el, { uri: uriAtual.current, width: "100%", height: 80 }, (c) => {
        controle.current = c;
        c.addListener("playback_update", (e) => { tocando.current = !e.data.isPaused; });
      });
    });
  }

  // Trocou de tela: troca a faixa e, se estava tocando, continua tocando
  useEffect(() => {
    if (uriAtual.current === atual.uri) return;
    uriAtual.current = atual.uri;
    const c = controle.current;
    if (!c) return;
    const continuar = tocando.current;
    c.loadUri(atual.uri);
    if (continuar) c.play();
  }, [atual.uri]);

  return (
    <aside className={`trilha ${aberto ? "trilha--aberta" : ""}`} aria-label="Trilha sonora">
      <div className="trilha__player" hidden={!aberto}>
        <p className="trilha__faixa">Nesta tela: {atual.nome}</p>
        <div ref={alvo} />
      </div>
      <button type="button" className="trilha__botao" onClick={alternar} aria-expanded={aberto}>
        <span aria-hidden="true">♪</span> {aberto ? "Esconder trilha" : "Trilha sonora"}
      </button>
    </aside>
  );
}
