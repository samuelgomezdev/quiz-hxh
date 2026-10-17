// Trilha sonora: player do Spotify com faixas da trilha oficial do anime de 2011
// (Yoshihisa Hirano, VAP). Nenhum áudio fica no site: o Spotify toca e licencia.
// A faixa de cada situação vem das regras de motor/trilha.mjs: a rota diz a tela e a versão,
// e a tela diz o que está em foco (lib/trilha.js). O primeiro clique abre o player e já começa a tocar;
// ao trocar de tela com a música tocando, a faixa nova entra no lugar e continua tocando;
// quando a faixa acaba (sem conta do Spotify, é uma prévia de uns 30 s), ela recomeça.
// Nada é pedido ao Spotify antes do primeiro clique.
// Esconder só tira o player da vista: com display: none, o Spotify para de responder.
import { useEffect, useRef, useState } from "react";
import { faixaDaSituacao } from "../../../motor/trilha.mjs";
import { personagemPorId } from "../lib/dados.js";
import { useFocoAtual } from "../lib/trilha.js";

// "Tema do Chrollo", "Trupe Fantasma · Feitan Portor", "Família Zoldyck"...
const nomeDe = (id) => personagemPorId[id]?.nome ?? id.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join(" ");
function motivo({ personagem, grupo }) {
  if (personagem && !grupo) return `tema de ${nomeDe(personagem)}`;
  if (personagem) return `${grupo} · ${nomeDe(personagem)}`;
  return grupo ?? null;
}

const API = "https://open.spotify.com/embed/iframe-api/v1";
const PERTO_DO_FIM = 1500; // ms antes do fim em que a faixa conta como terminada

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
  const foco = useFocoAtual();
  const atual = faixaDaSituacao({ tela, versao, ...foco });
  const porque = motivo(atual.motivo);
  const [aberto, setAberto] = useState(false);
  const [carregado, setCarregado] = useState(false);
  const alvo = useRef(null);
  const controle = useRef(null);
  const tocando = useRef(false);
  const deveTocar = useRef(true); // tocar assim que a faixa carregar (evento "ready")
  const fim = useRef({ timer: null, posicao: 0, duracao: 0 });
  const uriAtual = useRef(atual.uri);

  // Recarrega a faixa da tela; o "ready" dá o play se for para continuar tocando
  function carregar(c, uri, continuar) {
    clearTimeout(fim.current.timer);
    deveTocar.current = continuar;
    c.loadUri(uri);
  }

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
        c.addListener("ready", () => {
          if (deveTocar.current) c.play();
        });
        c.addListener("playback_update", ({ data }) => {
          const f = fim.current;
          const terminou = f.duracao > 0 && f.posicao >= f.duracao - PERTO_DO_FIM;
          clearTimeout(f.timer);
          // Pausa no fim da faixa é o fim natural: recomeça. Pausa no meio é a pessoa pausando.
          if (data.isPaused && terminou) return carregar(c, uriAtual.current, true);
          tocando.current = !data.isPaused;
          Object.assign(f, { posicao: data.position, duracao: data.duration });
          // Às vezes o Spotify não avisa o fim: um relógio recomeça a faixa
          if (!data.isPaused && data.duration > 0 && data.position >= data.duration - PERTO_DO_FIM) {
            f.timer = setTimeout(() => carregar(c, uriAtual.current, true), data.duration - data.position + 800);
          }
        });
      });
    });
  }

  // Trocou de tela: troca a faixa e, se estava tocando, continua tocando
  useEffect(() => {
    if (uriAtual.current === atual.uri) return;
    uriAtual.current = atual.uri;
    const c = controle.current;
    if (!c) return;
    carregar(c, atual.uri, tocando.current);
  }, [atual.uri]);

  return (
    <aside className={`trilha ${aberto ? "trilha--aberta" : ""}`} aria-label="Trilha sonora">
      <div className={`trilha__player ${aberto ? "" : "trilha__player--fora"}`} aria-hidden={!aberto}>
        <p className="trilha__faixa">
          Tocando {atual.nome} <span className="trilha__traducao">({atual.traducao})</span>
          {porque && <> · {porque}</>}
        </p>
        <div ref={alvo} />
      </div>
      <button type="button" className="trilha__botao" onClick={alternar} aria-expanded={aberto}>
        <span aria-hidden="true">♪</span> {aberto ? "Esconder trilha" : "Trilha sonora"}
      </button>
    </aside>
  );
}
