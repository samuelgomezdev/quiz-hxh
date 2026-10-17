import { useMemo, useRef, useEffect, useState } from "react";
import Aranha from "../componentes/Aranha.jsx";
import Retrato from "../componentes/Retrato.jsx";
import { codificar } from "../lib/codigo.js";
import { KANJI_DO_SIGNO, membroPorNome, perguntasDa, VERSOES } from "../lib/dados.js";
import { embaralhar } from "../lib/embaralhar.js";
import { ir } from "../lib/rota.js";

// Quem inspira a pergunta: retrato + tatuagem da Aranha (Trupe) ou ideograma do signo (Zodíaco)
function Membro({ versao, nome, posicao }) {
  const membro = membroPorNome[nome];
  return (
    <div className="membro">
      <Retrato src={membro?.imagem} nome={nome} className="membro__retrato" />
      <span className="membro__emblema" aria-hidden="true">
        {versao === "trupe" ? <Aranha numero={posicao.replace("#", "")} /> : <span lang="ja">{KANJI_DO_SIGNO[posicao]}</span>}
      </span>
      <span className="membro__texto">
        <span className="membro__rotulo">Inspirada em</span>
        <span className="membro__nome">{nome}</span>
        <span className="membro__posicao">{versao === "trupe" ? `Aranha ${posicao}` : `Signo do ${posicao}`}</span>
      </span>
    </div>
  );
}

export default function Quiz({ versao }) {
  const perguntas = useMemo(() => perguntasDa(versao), [versao]);
  // A ordem das opções é sorteada uma vez e mantida ao voltar (RF03)
  const ordens = useMemo(() => Object.fromEntries(perguntas.map((p) => [p.id, embaralhar(p.opcoes)])), [perguntas]);
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState({});
  const tituloRef = useRef(null);

  useEffect(() => {
    tituloRef.current?.focus();
  }, [indice]);

  if (!perguntas.length) {
    return (
      <main className="pagina">
        <p>Esse teste não existe.</p>
        <button className="botao" onClick={() => ir("")}>Voltar ao início</button>
      </main>
    );
  }

  const pergunta = perguntas[indice];
  const escolhida = respostas[pergunta.id];
  const ultima = indice === perguntas.length - 1;

  function escolher(opcaoId) {
    setRespostas((r) => ({ ...r, [pergunta.id]: opcaoId }));
  }

  function avancar(evento) {
    evento.preventDefault();
    if (!escolhida) return;
    if (ultima) ir(`resultado/${versao}/${codificar(perguntas, respostas)}`);
    else setIndice((i) => i + 1);
  }

  return (
    <main className="pagina quiz">
      <div className="progresso" aria-hidden="true">
        <div className="progresso__barra" style={{ width: `${((indice + 1) / perguntas.length) * 100}%` }} />
      </div>
      <p className="quiz__contagem">
        Teste {VERSOES[versao].nome}: pergunta {indice + 1} de {perguntas.length}
      </p>

      <form onSubmit={avancar}>
        <fieldset className="quiz__pergunta">
          <legend>
            <Membro versao={versao} nome={pergunta.membro_tema} posicao={pergunta.membro_posicao} />
            <span className="quiz__texto" tabIndex={-1} ref={tituloRef}>{pergunta.texto}</span>
          </legend>

          <div className="opcoes">
            {ordens[pergunta.id].map((o) => (
              <label key={o.id} className={`opcao ${escolhida === o.id ? "opcao--marcada" : ""}`}>
                <input
                  type="radio"
                  name={pergunta.id}
                  value={o.id}
                  checked={escolhida === o.id}
                  onChange={() => escolher(o.id)}
                />
                <span>{o.texto}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="quiz__acoes">
          <button
            type="button"
            className="botao botao--secundario"
            onClick={() => (indice === 0 ? ir("") : setIndice((i) => i - 1))}
          >
            {indice === 0 ? "Sair" : "Voltar"}
          </button>
          <button type="submit" className="botao" disabled={!escolhida}>
            {ultima ? "Ver meu tipo" : "Próxima"}
          </button>
        </div>
      </form>
    </main>
  );
}
