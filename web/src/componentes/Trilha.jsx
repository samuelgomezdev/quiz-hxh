// Trilha sonora: player do Spotify com faixas da trilha oficial do anime de 2011
// (Yoshihisa Hirano, VAP). Nenhum áudio fica no site: o Spotify toca e licencia.
// A faixa de cada situação vem das regras de motor/trilha.mjs: a rota diz a tela e a versão,
// e a tela diz o que está em foco (lib/trilha.js).
//
// O som toca dentro do player do Spotify (um iframe), e a maioria dos navegadores só deixa
// um iframe começar o som depois de um toque dentro dele. Trocar de faixa recarrega o player
// e perde esse toque. Por isso o player se adapta:
//   - onde o navegador deixa (o play pedido pelo site começa a tocar), ele começa e troca sozinho
//   - onde não deixa, ele avisa para tocar ▶ no player e, dali em diante, não interrompe a
//     música ao trocar de tela: mostra a faixa da tela nova com um botão para trocar
// Quando a faixa acaba (sem conta do Spotify, é uma prévia de uns 30 s), ela volta ao início
// sem recarregar o player, o que funciona nos dois casos.
// Nenhum navegador deixa o som começar antes do primeiro toque na página. Por isso a música
// começa no primeiro clique ou tecla em qualquer lugar do site. O play precisa sair durante o
// clique: um play que chega segundos depois (o tempo de carregar o player) já não conta como
// pedido pela pessoa, e o navegador bloqueia. Por isso o player é carregado em silêncio assim
// que o site abre, e o primeiro clique só dá o play.
// O botão de silenciar fica sempre à vista, e a escolha fica guardada no aparelho; silenciado,
// o player nem é carregado.
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
const ESPERA_DO_PLAY = 6000; // ms para o play pedido pelo site começar; depois disso, o navegador bloqueou
const CHAVE_SILENCIO = "trilha-silenciada";

function lerSilencio() {
  try {
    return localStorage.getItem(CHAVE_SILENCIO) === "1";
  } catch {
    return false;
  }
}
function guardarSilencio(mudo) {
  try {
    localStorage.setItem(CHAVE_SILENCIO, mudo ? "1" : "0");
  } catch {
    // sem armazenamento (aba anônima, por exemplo): a escolha vale só nesta visita
  }
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
  const foco = useFocoAtual();
  const atual = faixaDaSituacao({ tela, versao, ...foco });
  const [aberto, setAberto] = useState(false);
  const [carregado, setCarregado] = useState(false);
  const [noPlayer, setNoPlayer] = useState(atual); // a faixa que está no player
  const [pedirToque, setPedirToque] = useState(false); // "toque ▶ no player"
  const [mudo, setMudo] = useState(lerSilencio);

  const alvo = useRef(null);
  const controle = useRef(null);
  const tocando = useRef(false);
  const deveTocar = useRef(false); // dar o play quando a faixa carregar (evento "ready")
  const espera = useRef({ timer: null, tocou: false, aguardando: false }); // aguardando: play pedido, ainda não confirmado
  const fim = useRef({ timer: null, posicao: 0, duracao: 0 });
  const uriAtual = useRef(atual.uri);
  const podeSozinho = useRef(null); // null: ainda não se sabe; true; false
  const uriNoPlayer = useRef(atual.uri); // para ignorar avisos atrasados da faixa anterior
  const caixa = useRef(null);
  const iniciado = useRef(false); // o player já foi pedido ao Spotify
  const pronto = useRef(false); // o player terminou de carregar e aceita o play
  const comecou = useRef(false); // o primeiro play já foi pedido
  const silenciado = useRef(mudo);
  const faixaAtual = useRef(atual);
  faixaAtual.current = atual;

  // Pede o play e confere se começou; se não começar, o navegador bloqueou o play do site
  function tentarTocar(c) {
    c.play();
    clearTimeout(espera.current.timer);
    espera.current.tocou = false;
    espera.current.aguardando = true;
    espera.current.timer = setTimeout(() => {
      espera.current.aguardando = false;
      if (espera.current.tocou) {
        podeSozinho.current ??= true;
        return;
      }
      podeSozinho.current = false;
      setPedirToque(true);
    }, ESPERA_DO_PLAY);
  }

  // Põe uma faixa no player; o "ready" dá o play se for para tocar
  function carregar(c, faixa, tocar) {
    clearTimeout(fim.current.timer);
    deveTocar.current = tocar;
    setNoPlayer(faixa);
    uriNoPlayer.current = faixa.uri;
    c.loadUri(faixa.uri);
    if (tocar && podeSozinho.current === false) setPedirToque(true);
  }

  // Fim da faixa: volta ao início sem recarregar o player (assim o toque dado continua valendo)
  function recomecar(c) {
    clearTimeout(fim.current.timer);
    if (silenciado.current) return;
    c.seek(0);
    c.resume();
  }

  // Carrega o player em silêncio (uma vez só); o play vem de pedirPlay
  function preparar() {
    if (iniciado.current) return;
    iniciado.current = true;
    setCarregado(true);
    carregarApi().then((IFrameAPI) => {
      // a API troca o elemento pelo iframe; por isso ele é criado fora do React
      const el = document.createElement("div");
      alvo.current.appendChild(el);
      setNoPlayer(faixaAtual.current);
      uriNoPlayer.current = uriAtual.current;
      IFrameAPI.createController(el, { uri: uriAtual.current, width: "100%", height: 80 }, (c) => {
        controle.current = c;
        // o controle já aceita o play; o "ready" do Spotify só chega depois de um play ou de uma troca
        pronto.current = true;
        if (deveTocar.current && !silenciado.current) tentarTocar(c);
        c.addListener("ready", () => {
          pronto.current = true;
          if (deveTocar.current && !silenciado.current) tentarTocar(c);
        });
        c.addListener("playback_update", ({ data }) => {
          if (data.playingURI && data.playingURI !== uriNoPlayer.current) return;
          if (!data.isPaused && data.position > 0) {
            espera.current.tocou = true;
            espera.current.aguardando = false;
            setPedirToque(false);
          }
          const f = fim.current;
          const terminou = f.duracao > 0 && f.posicao >= f.duracao - PERTO_DO_FIM;
          clearTimeout(f.timer);
          // Pausa no fim da faixa é o fim natural: recomeça. Pausa no meio é a pessoa pausando.
          if (data.isPaused && terminou) {
            Object.assign(f, { posicao: 0 });
            return recomecar(c);
          }
          tocando.current = !data.isPaused;
          Object.assign(f, { posicao: data.position, duracao: data.duration });
          // Às vezes o Spotify não avisa o fim: um relógio recomeça a faixa
          if (!data.isPaused && data.duration > 0 && data.position >= data.duration - PERTO_DO_FIM) {
            f.timer = setTimeout(() => recomecar(c), data.duration - data.position + 800);
          }
        });
      });
    });
  }

  // Play pedido por um clique: com o player pronto, sai na hora, ainda dentro do clique;
  // senão, sai quando o player terminar de carregar
  function pedirPlay() {
    comecou.current = true;
    const c = controle.current;
    if (c && pronto.current) return tentarTocar(c);
    deveTocar.current = true;
    preparar();
  }

  function alternar() {
    setAberto((a) => !a);
    if (!comecou.current && !silenciado.current) pedirPlay();
    else preparar();
  }

  function alternarSom() {
    const novo = !silenciado.current;
    silenciado.current = novo;
    setMudo(novo);
    guardarSilencio(novo);
    const c = controle.current;
    if (novo) {
      clearTimeout(espera.current.timer);
      clearTimeout(fim.current.timer);
      deveTocar.current = false;
      setPedirToque(false);
      c?.pause();
    } else {
      pedirPlay();
    }
  }

  // O player carrega em silêncio quando o site abre (menos com o som silenciado), e a música
  // começa no primeiro clique ou tecla em qualquer lugar (menos nos botões da trilha, que cuidam de si)
  useEffect(() => {
    if (mudo) return;
    preparar();
    function primeiroToque(evento) {
      if (comecou.current || caixa.current?.contains(evento.target)) return;
      pedirPlay();
    }
    const opcoes = { capture: true };
    document.addEventListener("pointerdown", primeiroToque, opcoes);
    document.addEventListener("keydown", primeiroToque, opcoes);
    return () => {
      document.removeEventListener("pointerdown", primeiroToque, opcoes);
      document.removeEventListener("keydown", primeiroToque, opcoes);
    };
  }, [mudo]); // eslint-disable-line react-hooks/exhaustive-deps

  // Trocou de tela: se o navegador deixa (ou a música está parada), troca a faixa;
  // se não deixa e está tocando, mantém a música e oferece a troca com um toque
  useEffect(() => {
    if (uriAtual.current === atual.uri) return;
    uriAtual.current = atual.uri;
    const c = controle.current;
    if (!c) {
      uriNoPlayer.current = atual.uri;
      return setNoPlayer(atual);
    }
    // "tocando" inclui o play recém-pedido: o primeiro clique costuma pedir o play e trocar de tela juntos
    const tocandoOuPedido = tocando.current || espera.current.aguardando || deveTocar.current;
    if (podeSozinho.current === false && tocandoOuPedido) return;
    carregar(c, atual, tocandoOuPedido && !silenciado.current);
  }, [atual.uri]); // eslint-disable-line react-hooks/exhaustive-deps

  const outraFaixa = carregado && noPlayer.uri !== atual.uri;
  const porque = motivo(atual.motivo);

  return (
    <aside ref={caixa} className={`trilha ${aberto ? "trilha--aberta" : ""}`} aria-label="Trilha sonora">
      <div className={`trilha__player ${aberto ? "" : "trilha__player--fora"}`} aria-hidden={!aberto}>
        {outraFaixa ? (
          <div className="trilha__troca">
            <p className="trilha__faixa">
              Faixa desta tela: <strong>{atual.nome}</strong> <span className="trilha__traducao">({atual.traducao})</span>
              {porque && <> · {porque}</>}
            </p>
            <button type="button" className="trilha__tocar" onClick={() => controle.current && carregar(controle.current, atual, true)}>
              Tocar esta
            </button>
          </div>
        ) : (
          <p className="trilha__faixa">
            Tocando {noPlayer.nome} <span className="trilha__traducao">({noPlayer.traducao})</span>
            {porque && <> · {porque}</>}
          </p>
        )}
        {pedirToque && (
          <p className="trilha__aviso" role="status">
            Seu navegador só deixa o som começar com um toque: aperte ▶ no player.
          </p>
        )}
        <div ref={alvo} />
      </div>
      <div className="trilha__botoes">
        <button type="button" className="trilha__som" onClick={alternarSom} aria-pressed={mudo}
          aria-label={mudo ? "Ligar o som da trilha" : "Silenciar a trilha"} title={mudo ? "Ligar o som" : "Silenciar"}>
          <span aria-hidden="true">{mudo ? "🔇" : "🔊"}</span>
        </button>
        <button type="button" className="trilha__botao" onClick={alternar} aria-expanded={aberto}>
          <span aria-hidden="true">♪</span>{" "}
          {aberto ? "Esconder trilha" : pedirToque ? "Toque para ouvir" : "Trilha sonora"}
        </button>
      </div>
    </aside>
  );
}
