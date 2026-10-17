import { useEffect, useMemo, useState } from "react";
import { calcularResultado } from "../../../motor/pontuacao.mjs";
import CopoDagua from "../componentes/CopoDagua.jsx";
import Aranha from "../componentes/Aranha.jsx";
import Hexagono from "../componentes/Hexagono.jsx";
import Retrato from "../componentes/Retrato.jsx";
import { decodificar } from "../lib/codigo.js";
import {
  KANJI_DO_SIGNO, membrosDoTipo, nomesDosTipos, perguntasDa, personagensDoTipo, SINAL_DA_AGUA, tipoPorId, VERSOES,
} from "../lib/dados.js";
import { useFocoDaTrilha } from "../lib/trilha.js";
import { ir, linkAbsoluto } from "../lib/rota.js";

function Personagem({ p }) {
  return (
    <li className="personagem">
      <a className="personagem__cartao" href={p.url} target="_blank" rel="noreferrer">
        <Retrato src={p.imagem} nome={p.nome} className="personagem__retrato" />
        <span className="personagem__nome">{p.nome}</span>
      </a>
      {p.nota && <span className="personagem__nota">{p.nota}</span>}
      {p.foraDoManga && (
        <details className="personagem__fonte">
          <summary>fonte fora do mangá</summary>
          <p>{p.fonte ?? "Tipo não confirmado no mangá."}</p>
        </details>
      )}
    </li>
  );
}

export default function Resultado({ versao, codigo }) {
  const perguntas = useMemo(() => perguntasDa(versao), [versao]);
  const respostas = useMemo(() => decodificar(perguntas, codigo), [perguntas, codigo]);
  const [revelado, setRevelado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [mostrarLink, setMostrarLink] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevelado(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Trilha: os membros da versão com o mesmo tipo de Nen (o primeiro com faixa própria)
  const tipoDaTrilha = respostas ? calcularResultado(perguntas, respostas).principal : null;
  useFocoDaTrilha({ momento: "resultado", personagens: tipoDaTrilha ? membrosDoTipo(versao, tipoDaTrilha).map((m) => m.id) : [] });

  if (!respostas) {
    return (
      <main className="pagina">
        <h1 className="titulo">Este link de resultado está incompleto</h1>
        <p>Faça o teste para descobrir seu tipo de Nen.</p>
        <button className="botao" onClick={() => ir("")}>Começar o teste</button>
      </main>
    );
  }

  const { principal, afinidade } = calcularResultado(perguntas, respostas);
  const tipo = tipoPorId[principal];
  const grupo = personagensDoTipo(principal);
  const parceiros = membrosDoTipo(versao, principal);

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(linkAbsoluto(`resultado/${versao}/${codigo}`));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Sem acesso à área de transferência: mostra o link para copiar à mão
      setMostrarLink(true);
    }
  }

  return (
    <main className="pagina resultado">
      <div className="resultado__revelacao">
        <div className="resultado__copo">
          <CopoDagua tipo={principal} revelado={revelado} titulo={`Teste da Água: ${SINAL_DA_AGUA[principal]}`} />
        </div>
        <div className="resultado__texto">
          <p className={`resultado__sinal ${revelado ? "resultado__sinal--visivel" : ""}`}>{SINAL_DA_AGUA[principal]}</p>
          <h1 className="titulo titulo--resultado">Você é de {tipo.nome}</h1>
          <p className="resultado__personalidade">
            Pela teoria do Hisoka, quem é de {tipo.nome} costuma ser: {tipo.personalidade.toLowerCase()}.
          </p>
        </div>
      </div>

      <section className="chamada-hatsu">
        <p className="sobretitulo">Próximo passo</p>
        <h2 className="subtitulo">Desenvolva o seu Hatsu</h2>
        <p>
          O tipo diz o que a sua aura faz; o Hatsu nasce do que você viveu. Responda quatro perguntas sobre a sua vida e
          descubra a sua habilidade, com Voto e Limitação.
        </p>
        <button className="botao" onClick={() => ir(`hatsu/${versao}/${codigo}`)}>Criar meu Hatsu</button>
      </section>

      {parceiros.length > 0 && (
        <section className="secao parceiros">
          <h2 className="subtitulo">{VERSOES[versao].grupo}, sua aura é a de</h2>
          <ul className="parceiros__lista">
            {parceiros.map((m) => (
              <li key={m.nome}>
                <a className="parceiro" href={m.url} target="_blank" rel="noreferrer">
                  <Retrato src={m.imagem} nome={m.nome} className="parceiro__retrato" />
                  <span className="parceiro__emblema" aria-hidden="true">
                    {versao === "trupe" ? <Aranha numero={m.posicao.replace("#", "")} /> : <span lang="ja">{KANJI_DO_SIGNO[m.posicao]}</span>}
                  </span>
                  <span className="parceiro__nome">{m.nome}</span>
                  <span className="parceiro__posicao">{versao === "trupe" ? `Aranha ${m.posicao}` : `Signo do ${m.posicao}`}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="secao">
        <h2 className="subtitulo">Sua afinidade com cada tipo</h2>
        <p className="secao__intro">
          Você domina 100% do seu tipo. Cada passo no hexágono custa 20%. Especialização fica fora do alcance de quem
          não nasceu especialista.
        </p>
        <Hexagono afinidade={afinidade} principal={principal} nomes={nomesDosTipos} />
      </section>

      <section className="secao">
        <h2 className="subtitulo">Quem também é de {tipo.nome}</h2>
        <ul className="personagens">
          {grupo.manga.map((p) => <Personagem key={p.id} p={p} />)}
          {grupo.foraDoManga.map((p) => <Personagem key={p.id} p={p} />)}
        </ul>
        {grupo.secundario.length > 0 && (
          <>
            <h3 className="subtitulo subtitulo--menor">Usam {tipo.nome} como segundo tipo</h3>
            <ul className="personagens">
              {grupo.secundario.map((p) => <Personagem key={p.id} p={{ ...p, nota: p.nota }} />)}
            </ul>
          </>
        )}
        <p className="secao__rodape">
          {grupo.manga.length} com o tipo confirmado no mangá e {grupo.foraDoManga.length} com o tipo vindo de livros,
          jogos ou anime. Cada cartão leva ao artigo na Hunterpedia, de onde vem a imagem.
        </p>
      </section>

      <div className="resultado__acoes">
        <button className="botao" onClick={copiarLink} aria-live="polite">
          {copiado ? "Link copiado" : "Copiar link do resultado"}
        </button>
        <button className="botao botao--secundario" onClick={() => ir(`quiz/${versao}`)}>Refazer o teste</button>
        <button
          className="botao botao--secundario"
          onClick={() => ir(`quiz/${versao === "trupe" ? "zodiaco" : "trupe"}`)}
        >
          Fazer o teste {VERSOES[versao === "trupe" ? "zodiaco" : "trupe"].nome}
        </button>
      </div>
      {mostrarLink && (
        <label className="link-manual" htmlFor="link-resultado">
          Copie o link do resultado:
          <input id="link-resultado" readOnly value={linkAbsoluto(`resultado/${versao}/${codigo}`)} onFocus={(e) => e.target.select()} autoFocus />
        </label>
      )}
    </main>
  );
}
