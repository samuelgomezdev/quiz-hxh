// Resultado do processo de feitos: o cartão, as estrelas, os troféus e os
// Hunters reais da mesma especialidade e da mesma organização.
//   #/licenca/<codigo>/<nome>[/<versao>/<quiz>/<hatsu>]
import { useMemo, useState } from "react";
import { calcularLicenca, decodificarLicenca, numeroDaLicenca } from "../../../motor/licenca.mjs";
import CartaoLicenca, { Estrelas } from "../componentes/CartaoLicenca.jsx";
import Retrato from "../componentes/Retrato.jsx";
import { huntersDaEspecialidade, membrosDaOrganizacao, nomesDosTipos, personagemPorId } from "../lib/dados.js";
import { caminhoDaJornada, lerJornada } from "../lib/jornada.js";
import { useFocoDaTrilha } from "../lib/trilha.js";
import { ir, linkAbsoluto } from "../lib/rota.js";
import { prefillDoHatsu } from "./CriarPoder.jsx";

const NIVEL = [
  "Sem estrelas ainda: toda licença começa assim.",
  "Uma estrela: conquista de peso na sua especialidade.",
  "Duas estrelas: além da conquista, você lidera e formou alguém que se destacou.",
  "Três estrelas: tudo isso em mais de uma área. Poucos chegam aqui, como Morel e Cheadle.",
];

function Ficha({ p, children }) {
  return (
    <li className="personagem">
      <a className="personagem__cartao" href={p.url} target="_blank" rel="noreferrer">
        <Retrato src={p.imagem} nome={p.nome} className="personagem__retrato" />
        <span className="personagem__nome">{p.nome}</span>
      </a>
      {children}
    </li>
  );
}

export default function Licenca({ codigo, nome, versao, codigoQuiz, codigoHatsu }) {
  const respostas = useMemo(() => decodificarLicenca(codigo), [codigo]);
  const jornada = useMemo(() => lerJornada(versao, codigoQuiz, codigoHatsu), [versao, codigoQuiz, codigoHatsu]);
  const [copiado, setCopiado] = useState(false);
  const [mostrarLink, setMostrarLink] = useState(false);
  // Trilha: a faixa da organização do cartão
  useFocoDaTrilha({ organizacao: respostas ? calcularLicenca(respostas).organizacao.id : undefined });

  if (!respostas) {
    return (
      <main className="pagina">
        <h1 className="titulo">Este link de licença está incompleto</h1>
        <button className="botao" onClick={() => ir("feitos")}>Tirar minha licença</button>
      </main>
    );
  }

  const licenca = calcularLicenca(respostas);
  const nomeNoCartao = nome && nome !== "-" ? nome : "Hunter sem nome";
  const caminho = ["licenca", codigo, encodeURIComponent(nome || "-"), caminhoDaJornada(jornada)].filter(Boolean).join("/");
  const hunters = huntersDaEspecialidade(licenca.especialidade.id);
  const membros = membrosDaOrganizacao(licenca.organizacao.id);
  const poder = jornada?.hatsu
    ? `poder/novo/${prefillDoHatsu(jornada.tipo, jornada.hatsu)}`
    : jornada ? `poder/novo/${prefillDoHatsu(jornada.tipo)}` : "poder";

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(linkAbsoluto(caminho));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setMostrarLink(true);
    }
  }

  return (
    <main className="pagina licenca">
      <p className="sobretitulo">Associação Hunter · Emissão de licença</p>
      <h1 className="titulo">{licenca.licenciado ? licenca.especialidade.nome : "Aspirante a Hunter"}</h1>
      <CartaoLicenca nome={nomeNoCartao} licenca={licenca} numero={numeroDaLicenca(codigo)} jornada={jornada} nomesDosTipos={nomesDosTipos} />

      <section className="secao">
        <h2 className="subtitulo">
          Suas estrelas <Estrelas quantidade={licenca.estrelas} className="estrelas--titulo" />
        </h2>
        <p>{licenca.licenciado ? NIVEL[licenca.estrelas] : "Sem o Exame Hunter, a licença ainda não sai: você é aspirante, como os Hunters amadores."}</p>
        {licenca.faltam.length > 0 && (
          <div className="faltam">
            <p className="faltam__titulo">{licenca.licenciado ? "Para a próxima estrela, falta:" : "Para tirar a licença com uma estrela, falta:"}</p>
            <ul>
              {licenca.faltam.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        )}
      </section>

      <section className="secao">
        <h2 className="subtitulo">Seus troféus</h2>
        {licenca.trofeus.length === 0 ? (
          <p className="secao__intro">Nenhum feito marcado ainda. Toda lenda começa no primeiro.</p>
        ) : (
          <ul className="trofeus">
            {licenca.trofeus.map((t) => {
              const p = personagemPorId[t.paralelo.id];
              return (
                <li key={t.id} className="trofeu">
                  <Retrato src={p?.imagem} nome={p?.nome ?? t.trofeu} className="trofeu__retrato" />
                  <span className="trofeu__texto">
                    <strong>{t.trofeu}</strong>
                    <span>{t.paralelo.texto}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="secao">
        <h2 className="subtitulo">{licenca.especialidade.nome}</h2>
        <p className="secao__intro">{licenca.especialidade.descricao}</p>
        {hunters.length > 0 && (
          <ul className="personagens">
            {hunters.map((h) => (
              <Ficha key={h.id} p={h}>
                {h.estrelas ? <Estrelas quantidade={h.estrelas} className="estrelas--ficha" /> : null}
              </Ficha>
            ))}
          </ul>
        )}
      </section>

      <section className="secao">
        <h2 className="subtitulo">Sua organização: {licenca.organizacao.nome}</h2>
        <p className="secao__intro">{licenca.organizacao.descricao}</p>
        <ul className="personagens">
          {membros.map((m) => <Ficha key={m.id} p={m} />)}
        </ul>
      </section>

      <div className="resultado__acoes">
        <button className="botao" onClick={copiarLink} aria-live="polite">
          {copiado ? "Link copiado" : "Copiar link da licença"}
        </button>
        <button className="botao botao--secundario" onClick={() => ir(poder)}>Criar o meu poder</button>
        <button className="botao botao--secundario" onClick={() => ir(["feitos", caminhoDaJornada(jornada)].filter(Boolean).join("/"))}>
          Refazer
        </button>
      </div>
      {mostrarLink && (
        <label className="link-manual" htmlFor="link-licenca">
          Copie o link da licença:
          <input id="link-licenca" readOnly value={linkAbsoluto(caminho)} onFocus={(e) => e.target.select()} autoFocus />
        </label>
      )}
    </main>
  );
}
