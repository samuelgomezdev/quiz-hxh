// Desenvolvimento do Hatsu: depois de descobrir o tipo, a pessoa conta o que viveu
// e recebe a habilidade pessoal. O link guarda as respostas do quiz e do Hatsu:
//   #/hatsu/<versao>/<codigoDoQuiz>              → perguntas
//   #/hatsu/<versao>/<codigoDoQuiz>/<codigoHatsu> → resultado
import { useEffect, useMemo, useRef, useState } from "react";
import { codificarHatsu, decodificarHatsu, gerarHatsu, PERGUNTAS_HATSU } from "../../../motor/hatsu.mjs";
import { calcularResultado } from "../../../motor/pontuacao.mjs";
import Retrato from "../componentes/Retrato.jsx";
import { decodificar } from "../lib/codigo.js";
import { nomesDosTipos, perguntasDa, personagemPorId } from "../lib/dados.js";
import { ir, linkAbsoluto } from "../lib/rota.js";
import { prefillDoHatsu } from "./CriarPoder.jsx";

function Perguntas({ versao, codigo, tipo }) {
  const [indice, setIndice] = useState(0);
  const [escolhas, setEscolhas] = useState({});
  const tituloRef = useRef(null);
  useEffect(() => tituloRef.current?.focus(), [indice]);

  const pergunta = PERGUNTAS_HATSU[indice];
  const escolhida = escolhas[pergunta.id];
  const ultima = indice === PERGUNTAS_HATSU.length - 1;

  function avancar(evento) {
    evento.preventDefault();
    if (!escolhida) return;
    if (ultima) ir(`hatsu/${versao}/${codigo}/${codificarHatsu(escolhas)}`);
    else setIndice((i) => i + 1);
  }

  return (
    <main className="pagina quiz">
      <div className="progresso" aria-hidden="true">
        <div className="progresso__barra" style={{ width: `${((indice + 1) / PERGUNTAS_HATSU.length) * 100}%` }} />
      </div>
      <p className="quiz__contagem">
        Hatsu de {nomesDosTipos[tipo]}: pergunta {indice + 1} de {PERGUNTAS_HATSU.length}
      </p>
      {indice === 0 && (
        <p className="hatsu__intro">
          O tipo de Nen diz o que a sua aura faz. O Hatsu nasce do que você viveu: o Killua é de Transformação e cresceu
          levando choques, por isso a aura dele virou eletricidade.
        </p>
      )}

      <form onSubmit={avancar}>
        <fieldset className="quiz__pergunta">
          <legend>
            <span className="quiz__texto" tabIndex={-1} ref={tituloRef}>{pergunta.texto}</span>
          </legend>
          <div className={`opcoes ${pergunta.id === "vivencia" ? "opcoes--grade" : ""}`}>
            {pergunta.opcoes.map((o) => (
              <label key={o.id} className={`opcao ${escolhida === o.id ? "opcao--marcada" : ""}`}>
                <input
                  type="radio"
                  name={pergunta.id}
                  value={o.id}
                  checked={escolhida === o.id}
                  onChange={() => setEscolhas((e) => ({ ...e, [pergunta.id]: o.id }))}
                />
                <span>
                  {o.nome && <strong className="opcao__titulo">{o.nome}</strong>}
                  {o.texto}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="quiz__acoes">
          <button
            type="button"
            className="botao botao--secundario"
            onClick={() => (indice === 0 ? ir(`resultado/${versao}/${codigo}`) : setIndice((i) => i - 1))}
          >
            {indice === 0 ? "Voltar ao resultado" : "Voltar"}
          </button>
          <button type="submit" className="botao" disabled={!escolhida}>
            {ultima ? "Revelar meu Hatsu" : "Próxima"}
          </button>
        </div>
      </form>
    </main>
  );
}

const RELACAO = {
  mesmo: (p, h) => `Mesmo caminho de ${p}: ${nomesDosTipos[h.tipo]} a partir de ${h.vivencia.nome.toLowerCase()}.`,
  vivencia: (p, h, r) =>
    `Mesmo ponto de partida de ${p}, que é de ${nomesDosTipos[r.tipo]}. Você seguiu pelo caminho da ${nomesDosTipos[h.tipo]}.`,
  tipo: (p, h) => `Outro usuário de ${nomesDosTipos[h.tipo]}, com uma vivência diferente da sua.`,
};

function Carta({ versao, codigo, codigoHatsu, hatsu }) {
  const [copiado, setCopiado] = useState(false);
  const [mostrarLink, setMostrarLink] = useState(false);
  const ref = hatsu.referencia;
  const personagem = ref && personagemPorId[ref.id];
  const link = linkAbsoluto(`hatsu/${versao}/${codigo}/${codigoHatsu}`);

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(link);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setMostrarLink(true);
    }
  }

  return (
    <main className="pagina hatsu">
      <p className="sobretitulo">Seu Hatsu · {nomesDosTipos[hatsu.tipo]}</p>
      <article className="carta" aria-labelledby="nome-hatsu">
        <h1 id="nome-hatsu" className="carta__nome">{hatsu.nome}</h1>
        <p className="carta__etiquetas">
          <span>{nomesDosTipos[hatsu.tipo]}</span>
          <span>{hatsu.vivencia.nome}</span>
        </p>
        <p className="carta__efeito">{hatsu.efeito}</p>
        <dl className="carta__detalhes">
          <div>
            <dt>Rende mais</dt>
            <dd>{hatsu.motivacao}</dd>
          </div>
          <div>
            <dt>Alcance</dt>
            <dd>{hatsu.alcance}</dd>
          </div>
          <div className="carta__voto">
            <dt>
              Voto e Limitação
              <span className="carta__peso" aria-label={`Peso ${hatsu.voto.peso} de 3`}>
                {[1, 2, 3].map((n) => <span key={n} className={n <= hatsu.voto.peso ? "cheio" : ""} />)}
              </span>
            </dt>
            <dd>
              {hatsu.voto.regra}
              <span className="carta__ganho">{hatsu.voto.ganho}</span>
            </dd>
          </div>
          <div>
            <dt>Nasceu de</dt>
            <dd>“{hatsu.vivencia.texto}”</dd>
          </div>
        </dl>
      </article>

      {personagem && (
        <section className="secao">
          <h2 className="subtitulo">Quem trilhou um caminho parecido</h2>
          <a className="referencia" href={personagem.url} target="_blank" rel="noreferrer">
            <Retrato src={personagem.imagem} nome={personagem.nome} className="referencia__retrato" />
            <span className="referencia__texto">
              <span className="referencia__relacao">{RELACAO[ref.relacao](personagem.nome, hatsu, ref)}</span>
              <span className="referencia__nome">{personagem.nome} · {ref.habilidade}</span>
              <span>{ref.historia}</span>
            </span>
          </a>
        </section>
      )}

      <section className="chamada-hatsu">
        <p className="sobretitulo">Continue a jornada</p>
        <h2 className="subtitulo">Licença Hunter ou um poder só seu</h2>
        <p>
          Tire a sua licença com os feitos da sua vida (o tipo e o Hatsu vão no cartão) ou use este Hatsu como ponto
          de partida para montar o seu próprio poder.
        </p>
        <div className="resultado__acoes resultado__acoes--junto">
          <button className="botao" onClick={() => ir(`feitos/${versao}/${codigo}/${codigoHatsu}`)}>Tirar minha Licença Hunter</button>
          <button className="botao botao--secundario" onClick={() => ir(`poder/novo/${prefillDoHatsu(hatsu.tipo, hatsu)}`)}>
            Personalizar este poder
          </button>
        </div>
      </section>

      <div className="resultado__acoes">
        <button className="botao" onClick={copiarLink} aria-live="polite">
          {copiado ? "Link copiado" : "Copiar link do Hatsu"}
        </button>
        <button className="botao botao--secundario" onClick={() => ir(`hatsu/${versao}/${codigo}`)}>Criar outro Hatsu</button>
        <button className="botao botao--secundario" onClick={() => ir(`resultado/${versao}/${codigo}`)}>Voltar ao resultado</button>
      </div>
      {mostrarLink && (
        <label className="link-manual" htmlFor="link-hatsu">
          Copie o link do Hatsu:
          <input id="link-hatsu" readOnly value={link} onFocus={(e) => e.target.select()} autoFocus />
        </label>
      )}
    </main>
  );
}

export default function Hatsu({ versao, codigo, codigoHatsu }) {
  const perguntas = useMemo(() => perguntasDa(versao), [versao]);
  const respostas = useMemo(() => decodificar(perguntas, codigo), [perguntas, codigo]);

  if (!respostas) {
    return (
      <main className="pagina">
        <h1 className="titulo">Primeiro, descubra o seu tipo</h1>
        <p>O Hatsu depende do tipo de Nen. Faça o teste e volte por aqui.</p>
        <button className="botao" onClick={() => ir("")}>Começar o teste</button>
      </main>
    );
  }

  const { principal } = calcularResultado(perguntas, respostas);
  if (!codigoHatsu) return <Perguntas versao={versao} codigo={codigo} tipo={principal} />;

  const escolhas = decodificarHatsu(codigoHatsu);
  const hatsu = escolhas && gerarHatsu(principal, escolhas);
  if (!hatsu) {
    return (
      <main className="pagina">
        <h1 className="titulo">Este link de Hatsu está incompleto</h1>
        <button className="botao" onClick={() => ir(`hatsu/${versao}/${codigo}`)}>Criar meu Hatsu</button>
      </main>
    );
  }
  return <Carta versao={versao} codigo={codigo} codigoHatsu={codigoHatsu} hatsu={hatsu} />;
}
