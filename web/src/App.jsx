import { useEffect } from "react";
import Fundo from "./componentes/Fundo.jsx";
import Trilha from "./componentes/Trilha.jsx";
import { VERSOES } from "./lib/dados.js";
import { useRota } from "./lib/rota.js";
import Creditos from "./telas/Creditos.jsx";
import CriarPoder from "./telas/CriarPoder.jsx";
import Feitos from "./telas/Feitos.jsx";
import Hatsu from "./telas/Hatsu.jsx";
import Inicio from "./telas/Inicio.jsx";
import Licenca from "./telas/Licenca.jsx";
import Quiz from "./telas/Quiz.jsx";
import Resultado from "./telas/Resultado.jsx";

export default function App() {
  const partes = useRota();
  const [tela, versao, codigo, codigoHatsu] = partes;
  // Quiz, resultado e Hatsu usam a identidade da versão; licença, poder e o resto ficam no tema da Associação Hunter
  const tema = ["quiz", "resultado", "hatsu"].includes(tela) && VERSOES[versao] ? versao : "hunter";

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
  }, [tema]);

  let conteudo;
  if (tela === "quiz") conteudo = <Quiz key={versao} versao={versao} />;
  else if (tela === "resultado") conteudo = <Resultado key={`${versao}/${codigo}`} versao={versao} codigo={codigo} />;
  else if (tela === "hatsu") conteudo = <Hatsu key={`${versao}/${codigo}/${codigoHatsu}`} versao={versao} codigo={codigo} codigoHatsu={codigoHatsu} />;
  else if (tela === "feitos") conteudo = <Feitos key={partes.join("/")} versao={versao} codigo={codigo} codigoHatsu={codigoHatsu} />;
  else if (tela === "licenca") {
    const [, codigoLicenca, nome, ...jornada] = partes;
    conteudo = <Licenca key={partes.join("/")} codigo={codigoLicenca} nome={nome} versao={jornada[0]} codigoQuiz={jornada[1]} codigoHatsu={jornada[2]} />;
  } else if (tela === "poder") conteudo = <CriarPoder key={partes.join("/")} partes={partes.slice(1)} />;
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
        <span>Trilha sonora oficial via Spotify</span>
      </footer>
      <Trilha tela={tela || "inicio"} versao={versao} />
    </>
  );
}
