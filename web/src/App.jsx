import { useEffect } from "react";
import Fundo from "./componentes/Fundo.jsx";
import { VERSOES } from "./lib/dados.js";
import { useRota } from "./lib/rota.js";
import Creditos from "./telas/Creditos.jsx";
import Hatsu from "./telas/Hatsu.jsx";
import Inicio from "./telas/Inicio.jsx";
import Quiz from "./telas/Quiz.jsx";
import Resultado from "./telas/Resultado.jsx";

export default function App() {
  const [tela, versao, codigo, codigoHatsu] = useRota();
  // Quiz, resultado e Hatsu usam a identidade da versão; o resto fica no tema neutro da Associação Hunter
  const tema = ["quiz", "resultado", "hatsu"].includes(tela) && VERSOES[versao] ? versao : "hunter";

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
  }, [tema]);

  let conteudo;
  if (tela === "quiz") conteudo = <Quiz key={versao} versao={versao} />;
  else if (tela === "resultado") conteudo = <Resultado key={`${versao}/${codigo}`} versao={versao} codigo={codigo} />;
  else if (tela === "hatsu") conteudo = <Hatsu key={`${versao}/${codigo}/${codigoHatsu}`} versao={versao} codigo={codigo} codigoHatsu={codigoHatsu} />;
  else if (tela === "creditos") conteudo = <Creditos />;
  else conteudo = <Inicio />;

  return (
    <>
      <Fundo tema={tema} />
      <header className="topo">
        <a href="#/" className="topo__marca" aria-label="Início: Teste da Água de Hunter × Hunter">
          <span className="topo__logo">Hunter<span className="topo__x">×</span>Hunter</span>
          <span className="topo__sub">
            {tema === "hunter" ? "Teste da Água" : `${VERSOES[tema].nomeJapones} · ${VERSOES[tema].nome}`}
          </span>
        </a>
      </header>
      {conteudo}
      <footer className="rodape">
        <a href="#/creditos">Créditos e licença</a>
        <span>Dados e imagens da Hunterpedia</span>
      </footer>
    </>
  );
}
