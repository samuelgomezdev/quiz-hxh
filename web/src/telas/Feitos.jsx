// Processo de feitos: a pessoa marca o que já fez na vida, escolhe a caçada
// que mais a atrai, responde três perguntas de organização e põe o nome no cartão.
//   #/feitos                          → sozinho, pela página inicial
//   #/feitos/<versao>/<quiz>/<hatsu>  → continuando a jornada do quiz e do Hatsu
import { useEffect, useMemo, useRef, useState } from "react";
import { ESPECIALIDADES, FEITOS, ORGANIZACOES, PERGUNTAS_ORGANIZACAO } from "../../../conteudo/feitos.mjs";
import { codificarLicenca } from "../../../motor/licenca.mjs";
import { embaralhar } from "../lib/embaralhar.js";
import { caminhoDaJornada, lerJornada } from "../lib/jornada.js";
import { ir } from "../lib/rota.js";

const GERAIS = FEITOS.filter((f) => !f.especialidade);
const DA_AREA = FEITOS.filter((f) => f.especialidade);
const NOME_MAXIMO = 30;

function Opcao({ id, marcada, aoMarcar, texto, tipo = "radio", nomeGrupo }) {
  return (
    <label className={`opcao ${marcada ? "opcao--marcada" : ""}`}>
      <input type={tipo} name={nomeGrupo} value={id} checked={marcada} onChange={aoMarcar} />
      <span>{texto}</span>
    </label>
  );
}

export default function Feitos({ versao, codigo, codigoHatsu }) {
  const jornada = useMemo(() => lerJornada(versao, codigo, codigoHatsu), [versao, codigo, codigoHatsu]);
  // Feitos da área embaralhados uma vez, para a ordem não denunciar a especialidade
  const area = useMemo(() => embaralhar(DA_AREA), []);
  const orgs = useMemo(() => Object.fromEntries(PERGUNTAS_ORGANIZACAO.map((p) => [p.id, embaralhar(ORGANIZACOES)])), []);
  const cacas = useMemo(() => embaralhar(ESPECIALIDADES), []);

  const [passo, setPasso] = useState(0);
  const [feitos, setFeitos] = useState([]);
  const [caca, setCaca] = useState(null);
  const [org, setOrg] = useState({});
  const [nome, setNome] = useState("");
  const tituloRef = useRef(null);
  useEffect(() => {
    tituloRef.current?.focus();
  }, [passo]);

  const total = 2 + PERGUNTAS_ORGANIZACAO.length + 1;
  const perguntaOrg = PERGUNTAS_ORGANIZACAO[passo - 2];
  const ultimo = passo === total - 1;
  const podeAvancar = passo === 0 || (passo === 1 && caca) || (perguntaOrg && org[perguntaOrg.id]) || ultimo;

  function alternar(id) {
    setFeitos((atual) => (atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id]));
  }

  function avancar(evento) {
    evento.preventDefault();
    if (!podeAvancar) return;
    if (!ultimo) return setPasso((p) => p + 1);
    const codigoLicenca = codificarLicenca({ feitos, caca, org });
    const nomeNoCartao = encodeURIComponent(nome.trim() || "-");
    ir(["licenca", codigoLicenca, nomeNoCartao, caminhoDaJornada(jornada)].filter(Boolean).join("/"));
  }

  function voltar() {
    if (passo > 0) return setPasso((p) => p - 1);
    ir(jornada?.codigoHatsu ? `hatsu/${caminhoDaJornada(jornada)}` : "");
  }

  return (
    <main className="pagina quiz">
      <div className="progresso" aria-hidden="true">
        <div className="progresso__barra" style={{ width: `${((passo + 1) / total) * 100}%` }} />
      </div>
      <p className="quiz__contagem">Licença Hunter: passo {passo + 1} de {total}</p>

      <form onSubmit={avancar}>
        {passo === 0 && (
          <fieldset className="quiz__pergunta">
            <legend>
              <span className="quiz__texto" tabIndex={-1} ref={tituloRef}>Quais destes feitos você já tem na sua história?</span>
            </legend>
            <p className="hatsu__intro">
              Marque tudo o que for verdade, sem modéstia e sem exagero. Cada feito vira um troféu, e eles decidem a sua
              especialidade e as suas estrelas.
            </p>
            <h2 className="subtitulo subtitulo--menor">Sua trajetória</h2>
            <div className="opcoes opcoes--grade">
              {GERAIS.map((f) => (
                <Opcao key={f.id} id={f.id} tipo="checkbox" texto={f.texto} marcada={feitos.includes(f.id)} aoMarcar={() => alternar(f.id)} />
              ))}
            </div>
            <h2 className="subtitulo subtitulo--menor">O que você já fez</h2>
            <div className="opcoes opcoes--grade">
              {area.map((f) => (
                <Opcao key={f.id} id={f.id} tipo="checkbox" texto={f.texto} marcada={feitos.includes(f.id)} aoMarcar={() => alternar(f.id)} />
              ))}
            </div>
            <p className="aviso" aria-live="polite">{feitos.length} {feitos.length === 1 ? "feito marcado" : "feitos marcados"}</p>
          </fieldset>
        )}

        {passo === 1 && (
          <fieldset className="quiz__pergunta">
            <legend>
              <span className="quiz__texto" tabIndex={-1} ref={tituloRef}>Se pudesse dedicar a vida a uma caçada, qual seria?</span>
            </legend>
            <div className="opcoes">
              {cacas.map((e) => (
                <Opcao key={e.id} id={e.id} nomeGrupo="caca" texto={e.caca} marcada={caca === e.id} aoMarcar={() => setCaca(e.id)} />
              ))}
            </div>
          </fieldset>
        )}

        {perguntaOrg && (
          <fieldset className="quiz__pergunta">
            <legend>
              <span className="quiz__texto" tabIndex={-1} ref={tituloRef}>{perguntaOrg.texto}</span>
            </legend>
            <div className="opcoes">
              {orgs[perguntaOrg.id].map((o) => (
                <Opcao
                  key={o.id}
                  id={o.id}
                  nomeGrupo={perguntaOrg.id}
                  texto={perguntaOrg.opcoes[o.id]}
                  marcada={org[perguntaOrg.id] === o.id}
                  aoMarcar={() => setOrg((atual) => ({ ...atual, [perguntaOrg.id]: o.id }))}
                />
              ))}
            </div>
          </fieldset>
        )}

        {ultimo && (
          <div className="quiz__pergunta">
            <label className="campo" htmlFor="nome-cartao">
              <span className="quiz__texto" tabIndex={-1} ref={tituloRef}>Que nome vai no seu cartão?</span>
              <span className="campo__ajuda">Opcional. Fica só no link do seu cartão; o site não guarda nada.</span>
              <input
                id="nome-cartao"
                className="campo__entrada"
                value={nome}
                maxLength={NOME_MAXIMO}
                autoComplete="off"
                placeholder="Ex.: Gon Freecss"
                onChange={(e) => setNome(e.target.value)}
              />
            </label>
          </div>
        )}

        <div className="quiz__acoes">
          <button type="button" className="botao botao--secundario" onClick={voltar}>
            {passo === 0 ? "Sair" : "Voltar"}
          </button>
          <button type="submit" className="botao" disabled={!podeAvancar}>
            {ultimo ? "Emitir minha licença" : "Próximo"}
          </button>
        </div>
      </form>
    </main>
  );
}
