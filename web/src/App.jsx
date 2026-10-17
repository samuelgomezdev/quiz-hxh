import { useRota } from "./lib/rota.js";
import Creditos from "./telas/Creditos.jsx";
import Inicio from "./telas/Inicio.jsx";
import Quiz from "./telas/Quiz.jsx";
import Resultado from "./telas/Resultado.jsx";

export default function App() {
  const [tela, versao, codigo] = useRota();

  let conteudo;
  if (tela === "quiz") conteudo = <Quiz key={versao} versao={versao} />;
  else if (tela === "resultado") conteudo = <Resultado key={`${versao}/${codigo}`} versao={versao} codigo={codigo} />;
  else if (tela === "creditos") conteudo = <Creditos />;
  else conteudo = <Inicio />;

  return (
    <>
      <header className="topo">
        <a href="#/" className="topo__marca">Teste da Água</a>
      </header>
      {conteudo}
      <footer className="rodape">
        <a href="#/creditos">Créditos e licença</a>
        <span>Dados da Hunterpedia, sob CC BY-SA</span>
      </footer>
    </>
  );
}
