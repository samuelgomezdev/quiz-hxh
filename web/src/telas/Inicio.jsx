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

      <p className="aviso">
        As perguntas citam personagens e acontecimentos até o arco da Expedição ao Continente Negro, inclusive o que
        ainda não saiu no anime.
      </p>
    </main>
  );
}
