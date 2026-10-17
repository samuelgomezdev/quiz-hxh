import Aranha from "../componentes/Aranha.jsx";
import CopoDagua from "../componentes/CopoDagua.jsx";
import { VERSOES } from "../lib/dados.js";
import { ir } from "../lib/rota.js";

export default function Inicio() {
  return (
    <main className="pagina inicio">
      <div className="inicio__abertura">
        <div className="inicio__copo">
          <CopoDagua />
        </div>
        <div>
          <p className="sobretitulo">Associação Hunter · Exame de Nen</p>
          <h1 className="titulo">Qual é o seu tipo de Nen?</h1>
        </div>
      </div>
      <p className="inicio__intro">
        No Teste da Água, a pessoa põe as mãos ao redor de um copo com uma folha e libera sua aura. O que acontece
        com a água revela o tipo de Nen. Aqui, suas respostas fazem o papel da aura.
      </p>

      <h2 className="subtitulo">Escolha o teste</h2>
      <ul className="versoes">
        {Object.entries(VERSOES).map(([id, v]) => (
          <li key={id}>
            <button className={`versao versao--${id}`} onClick={() => ir(`quiz/${id}`)}>
              <span className="versao__emblema" aria-hidden="true">
                {id === "trupe" ? <Aranha /> : <span className="versao__kanji">十二</span>}
              </span>
              <span className="versao__corpo">
                <span className="versao__japones" lang="ja">{v.nomeJapones}</span>
                <span className="versao__nome">{v.nome}</span>
                <span className="versao__descricao">{v.descricao}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <h2 className="subtitulo">Mais caminhos</h2>
      <ul className="caminhos">
        <li>
          <button className="caminho" onClick={() => ir("feitos")}>
            <span className="caminho__icone" aria-hidden="true">
              <svg viewBox="0 0 48 32"><rect x="1" y="1" width="46" height="30" rx="4" /><path d="M8 9h14M8 15h10M30 9l2 4 4 .5-3 3 .8 4-3.8-2-3.8 2 .8-4-3-3 4-.5z" /></svg>
            </span>
            <span className="versao__corpo">
              <span className="versao__nome">Licença Hunter</span>
              <span className="versao__descricao">Marque os feitos da sua vida e descubra sua especialidade, suas estrelas e a sua organização.</span>
            </span>
          </button>
        </li>
        <li>
          <button className="caminho" onClick={() => ir("poder")}>
            <span className="caminho__icone" aria-hidden="true">
              <svg viewBox="0 0 48 48"><polygon points="24,3 42,13.5 42,34.5 24,45 6,34.5 6,13.5" /><path d="M26 11l-9 15h8l-3 11 10-16h-8z" /></svg>
            </span>
            <span className="versao__corpo">
              <span className="versao__nome">Crie o seu poder</span>
              <span className="versao__descricao">Monte o seu Hatsu peça por peça, dê um nome a ele e veja como o Nen reage.</span>
            </span>
          </button>
        </li>
      </ul>

      <p className="aviso">
        As perguntas citam personagens e acontecimentos até o arco da Expedição ao Continente Negro, inclusive o que
        ainda não saiu no anime.
      </p>
    </main>
  );
}
