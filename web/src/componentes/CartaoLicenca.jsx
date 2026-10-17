// O cartão da Licença Hunter: preto, com emblema próprio (não o logotipo oficial),
// estrelas, especialidade e organização. Quem veio pela jornada vê também o tipo e o Hatsu.
export function Estrelas({ quantidade, className = "" }) {
  return (
    <span className={`estrelas ${className}`} role="img" aria-label={`${quantidade} de 3 estrelas`}>
      {[1, 2, 3].map((n) => (
        <svg key={n} viewBox="0 0 24 24" className={n <= quantidade ? "estrela estrela--cheia" : "estrela"} aria-hidden="true">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

function Emblema() {
  // Hexágono do Nen com um "H" cortado por um "×"
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 3;
    return `${(50 + 44 * Math.cos(a)).toFixed(1)},${(50 + 44 * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <svg className="cartao__emblema" viewBox="0 0 100 100" aria-hidden="true">
      <polygon points={hex} />
      <path className="cartao__h" d="M34 28v44M66 28v44M34 50h32" />
      <path className="cartao__xis" d="M40 38l20 24M60 38L40 62" />
    </svg>
  );
}

export default function CartaoLicenca({ nome, licenca, numero, jornada, nomesDosTipos }) {
  const aspirante = !licenca.licenciado;
  return (
    <div className={`cartao ${aspirante ? "cartao--aspirante" : ""}`}>
      <div className="cartao__topo">
        <Emblema />
        <div>
          <p className="cartao__titulo">{aspirante ? "Aspirante a Hunter" : "Licença Hunter"}</p>
          <p className="cartao__numero">Nº {numero}</p>
        </div>
        <Estrelas quantidade={licenca.estrelas} className="cartao__estrelas" />
      </div>
      <p className="cartao__nome">{nome}</p>
      <dl className="cartao__dados">
        <div>
          <dt>Especialidade</dt>
          <dd>{licenca.especialidade.nome}{aspirante ? " (em formação)" : ""}</dd>
        </div>
        <div>
          <dt>Organização</dt>
          <dd>{licenca.organizacao.nome}</dd>
        </div>
        {jornada && (
          <div>
            <dt>Nen</dt>
            <dd>{nomesDosTipos[jornada.tipo]}{jornada.hatsu ? ` · Hatsu: ${jornada.hatsu.nome}` : ""}</dd>
          </div>
        )}
      </dl>
      <span className="cartao__faixa" aria-hidden="true">{licenca.especialidade.sigla}</span>
    </div>
  );
}
