// "Crie o seu poder": a pessoa monta o Hatsu peça por peça e dá nome a ele.
// O site avalia a construção pela teoria do Nen (hexágono, forma, votos).
//   #/poder                               → construtor vazio
//   #/poder/novo/<codigo>[/<nome>[/<desc>]] → construtor preenchido (vindo do Hatsu ou da licença)
//   #/poder/<codigo>/<nome>[/<desc>]        → carta do poder
import { useState } from "react";
import { VIVENCIAS, VOTOS } from "../../../conteudo/hatsu.mjs";
import { FORMAS, GATILHOS } from "../../../conteudo/poder.mjs";
import {
  avaliarPoder, codificarPoder, decodificarPoder, descreverPoder, eficiencia, MAX_DESCRICAO, MAX_NOME, MAX_VOTOS,
} from "../../../motor/poder.mjs";
import { HEXAGONO } from "../../../motor/pontuacao.mjs";
import { nomesDosTipos } from "../lib/dados.js";
import { ir, linkAbsoluto } from "../lib/rota.js";

const PADRAO = { tipo: "intensificacao", categoria: "intensificacao", forma: "corpo", gatilho: "toque", vivencia: null, votos: [] };
const FORMA_DO_ALCANCE = { perto: "corpo", longe: "disparo", armadilha: "regra", apoio: "criatura" };

// Ponto de partida a partir do tipo do quiz e, se houver, do Hatsu gerado: "<codigo>[/<nome>]"
export function prefillDoHatsu(tipo, hatsu) {
  if (!hatsu) return codificarPoder({ ...PADRAO, tipo, categoria: tipo });
  const escolhas = {
    tipo,
    categoria: tipo,
    forma: FORMA_DO_ALCANCE[hatsu.alcanceId] ?? FORMAS.find((f) => f.naturais.includes(tipo)).id,
    gatilho: hatsu.voto.id === "nome" ? "nome" : "toque",
    vivencia: hatsu.vivencia.id,
    votos: [hatsu.voto.id],
  };
  return `${codificarPoder(escolhas)}/${encodeURIComponent(hatsu.nome)}`;
}

const caminhoDoPoder = (base, escolhas, nome, descricao) =>
  [base, codificarPoder(escolhas), encodeURIComponent(nome.trim() || "-"), descricao.trim() && encodeURIComponent(descricao.trim())]
    .filter(Boolean).join("/");

function Chips({ legenda, ajuda, nome, opcoes, valor, aoEscolher, multiplo = false }) {
  return (
    <fieldset className="chips">
      <legend className="chips__legenda">{legenda}</legend>
      {ajuda && <p className="chips__ajuda">{ajuda}</p>}
      <div className="chips__lista">
        {opcoes.map((o) => {
          const marcado = multiplo ? valor.includes(o.id) : valor === o.id;
          return (
            <label key={o.id ?? "nenhum"} className={`chip ${marcado ? "chip--marcado" : ""} ${o.desligado ? "chip--desligado" : ""}`}>
              <input
                type={multiplo ? "checkbox" : "radio"}
                name={nome}
                checked={marcado}
                disabled={o.desligado}
                onChange={() => aoEscolher(o.id)}
              />
              <span>{o.rotulo}</span>
              {o.extra && <span className="chip__extra">{o.extra}</span>}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Medidor({ rotulo, valor, sufixo = "%" }) {
  return (
    <div className="medidor">
      <span className="medidor__rotulo">{rotulo}</span>
      <span className="medidor__barra" aria-hidden="true"><span style={{ width: `${valor}%` }} /></span>
      <span className="medidor__valor">{valor}{sufixo}</span>
    </div>
  );
}

function Construtor({ inicial, nomeInicial, descricaoInicial }) {
  const [e, setE] = useState(inicial);
  const [nome, setNome] = useState(nomeInicial);
  const [descricao, setDescricao] = useState(descricaoInicial);
  const avaliacao = avaliarPoder(e);
  const mudar = (campo) => (valor) => setE((atual) => ({ ...atual, [campo]: valor }));

  function alternarVoto(id) {
    setE((atual) => {
      if (atual.votos.includes(id)) return { ...atual, votos: atual.votos.filter((v) => v !== id) };
      return atual.votos.length < MAX_VOTOS ? { ...atual, votos: [...atual.votos, id] } : atual;
    });
  }

  function gerar(evento) {
    evento.preventDefault();
    if (!nome.trim() || !avaliacao.possivel) return;
    ir(caminhoDoPoder("poder", e, nome, descricao));
  }

  return (
    <main className="pagina criar">
      <p className="sobretitulo">Hatsu · Crie o seu poder</p>
      <h1 className="titulo">Monte a sua habilidade</h1>
      <p className="inicio__intro">
        Escolha cada peça e dê um nome ao seu poder. A ficha ao fim mostra como o Nen reage: quanto da aura você
        aproveita, quanto a forma combina e o que os votos acrescentam.
      </p>

      <form onSubmit={gerar} className="criar__form">
        <Chips
          legenda="1. Seu tipo de Nen"
          nome="tipo"
          valor={e.tipo}
          aoEscolher={mudar("tipo")}
          opcoes={HEXAGONO.map((t) => ({ id: t, rotulo: nomesDosTipos[t] }))}
        />
        <Chips
          legenda="2. Categoria do poder"
          ajuda="O número é a eficiência: quanto da aura você aproveita nessa categoria, pelo hexágono."
          nome="categoria"
          valor={e.categoria}
          aoEscolher={mudar("categoria")}
          opcoes={HEXAGONO.map((t) => {
            const ef = eficiencia(e.tipo, t);
            return { id: t, rotulo: nomesDosTipos[t], extra: `${ef}%`, desligado: ef === 0 };
          })}
        />
        <Chips
          legenda="3. Forma"
          nome="forma"
          valor={e.forma}
          aoEscolher={mudar("forma")}
          opcoes={FORMAS.map((f) => ({ id: f.id, rotulo: f.nome, extra: f.naturais.includes(e.categoria) ? "natural" : null }))}
        />
        <Chips
          legenda="4. De onde ele nasce"
          ajuda="Opcional: a vivência que dá matéria ao poder."
          nome="vivencia"
          valor={e.vivencia}
          aoEscolher={mudar("vivencia")}
          opcoes={[{ id: null, rotulo: "Nenhuma em especial" }, ...VIVENCIAS.map((v) => ({ id: v.id, rotulo: v.nome }))]}
        />
        <Chips legenda="5. Gatilho" nome="gatilho" valor={e.gatilho} aoEscolher={mudar("gatilho")}
          opcoes={GATILHOS.map((g) => ({ id: g.id, rotulo: g.nome }))} />
        <Chips
          legenda={`6. Votos e Limitações (até ${MAX_VOTOS})`}
          ajuda="Cada regra que você se impõe deixa o poder mais forte. As pontinhas mostram o peso."
          nome="votos"
          multiplo
          valor={e.votos}
          aoEscolher={alternarVoto}
          opcoes={VOTOS.map((v) => ({
            id: v.id, rotulo: v.texto, extra: "●".repeat(v.peso),
            desligado: !e.votos.includes(v.id) && e.votos.length >= MAX_VOTOS,
          }))}
        />

        <div className="chips">
          <label className="campo" htmlFor="nome-poder">
            <span className="chips__legenda">7. Nome do poder</span>
            <input id="nome-poder" className="campo__entrada" value={nome} maxLength={MAX_NOME} required autoComplete="off"
              placeholder="Ex.: Kintsugi, Gleipnir, Smoke on the Water" onChange={(ev) => setNome(ev.target.value)} />
          </label>
          <label className="campo" htmlFor="descricao-poder">
            <span className="chips__ajuda">Descrição, opcional. Sem ela, o site escreve uma a partir das peças.</span>
            <textarea id="descricao-poder" className="campo__entrada" rows={3} value={descricao} maxLength={MAX_DESCRICAO}
              placeholder={avaliacao ? descreverPoder(e, avaliacao, nomesDosTipos) : ""} onChange={(ev) => setDescricao(ev.target.value)} />
          </label>
        </div>

        <section className="ficha" aria-live="polite">
          <h2 className="subtitulo subtitulo--menor">Ficha do poder</h2>
          <Medidor rotulo="Eficiência" valor={avaliacao.eficiencia} />
          <Medidor rotulo="Potência" valor={avaliacao.potencia} />
          <p className="ficha__risco">Risco dos votos: <strong>{avaliacao.risco}</strong></p>
          <ul className="ficha__comentarios">
            {avaliacao.comentarios.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>

        <div className="quiz__acoes">
          <button type="button" className="botao botao--secundario" onClick={() => ir("")}>Sair</button>
          <button type="submit" className="botao" disabled={!nome.trim() || !avaliacao.possivel}>Gerar a carta do poder</button>
        </div>
      </form>
    </main>
  );
}

function Carta({ escolhas, nome, descricao }) {
  const [copiado, setCopiado] = useState(false);
  const avaliacao = avaliarPoder(escolhas);
  const caminho = caminhoDoPoder("poder", escolhas, nome, descricao);

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(linkAbsoluto(caminho));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      window.prompt("Copie o link do poder:", linkAbsoluto(caminho));
    }
  }

  return (
    <main className="pagina hatsu">
      <p className="sobretitulo">Poder criado · {nomesDosTipos[escolhas.categoria]}</p>
      <article className="carta" aria-labelledby="nome-poder">
        <h1 id="nome-poder" className="carta__nome">{nome}</h1>
        <p className="carta__etiquetas">
          <span>{nomesDosTipos[escolhas.categoria]}</span>
          <span>{avaliacao.forma.nome}</span>
          {avaliacao.vivencia && <span>{avaliacao.vivencia.nome}</span>}
        </p>
        <p className="carta__efeito">{descricao || descreverPoder(escolhas, avaliacao, nomesDosTipos)}</p>
        <div className="carta__medidores">
          <Medidor rotulo="Eficiência" valor={avaliacao.eficiencia} />
          <Medidor rotulo="Potência" valor={avaliacao.potencia} />
        </div>
        <dl className="carta__detalhes">
          <div>
            <dt>Usuário</dt>
            <dd>{nomesDosTipos[escolhas.tipo]}</dd>
          </div>
          <div>
            <dt>Gatilho</dt>
            <dd>{avaliacao.gatilho.nome}</dd>
          </div>
          <div className="carta__voto">
            <dt>Votos e Limitações · risco {avaliacao.risco}</dt>
            <dd>
              {avaliacao.votos.length === 0 ? "Nenhum voto." : (
                <ul className="carta__votos">{avaliacao.votos.map((v) => <li key={v.id}>{v.texto}</li>)}</ul>
              )}
            </dd>
          </div>
        </dl>
      </article>

      <section className="secao">
        <h2 className="subtitulo">O que o Nen diz</h2>
        <ul className="ficha__comentarios">
          {avaliacao.comentarios.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </section>

      <div className="resultado__acoes">
        <button className="botao" onClick={copiarLink} aria-live="polite">{copiado ? "Link copiado" : "Copiar link do poder"}</button>
        <button className="botao botao--secundario" onClick={() => ir(caminhoDoPoder("poder/novo", escolhas, nome, descricao))}>
          Editar
        </button>
        <button className="botao botao--secundario" onClick={() => ir("feitos")}>Tirar a Licença Hunter</button>
      </div>
    </main>
  );
}

export default function CriarPoder({ partes }) {
  const novo = partes[0] === "novo" || partes.length === 0;
  const [codigo, nome = "", descricao = ""] = partes[0] === "novo" ? partes.slice(1) : partes;
  const escolhas = codigo ? decodificarPoder(codigo) : PADRAO;
  const nomeLimpo = nome === "-" ? "" : nome.slice(0, MAX_NOME);
  const descricaoLimpa = descricao.slice(0, MAX_DESCRICAO);

  if (!escolhas || (!novo && (!nomeLimpo || !avaliarPoder(escolhas)?.possivel))) {
    return (
      <main className="pagina">
        <h1 className="titulo">Este link de poder está incompleto</h1>
        <button className="botao" onClick={() => ir("poder")}>Criar um poder</button>
      </main>
    );
  }
  if (novo) return <Construtor key={codigo ?? "vazio"} inicial={escolhas} nomeInicial={nomeLimpo} descricaoInicial={descricaoLimpa} />;
  return <Carta escolhas={escolhas} nome={nomeLimpo} descricao={descricaoLimpa} />;
}
