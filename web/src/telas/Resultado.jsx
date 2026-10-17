import { useEffect, useMemo, useState } from "react";
import { calcularResultado } from "../../../motor/pontuacao.mjs";
import CopoDagua from "../componentes/CopoDagua.jsx";
import Hexagono from "../componentes/Hexagono.jsx";
import { decodificar } from "../lib/codigo.js";
import { nomesDosTipos, perguntasDa, personagensDoTipo, SINAL_DA_AGUA, tipoPorId, VERSOES } from "../lib/dados.js";
import { ir, linkAbsoluto } from "../lib/rota.js";

function Personagem({ p }) {
  return (
    <li className="personagem">
      <a href={p.url} target="_blank" rel="noreferrer">{p.nome}</a>
      {p.nota && <span className="personagem__nota"> ({p.nota})</span>}
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
          jogos ou anime. Os nomes levam ao artigo na Hunterpedia.
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
