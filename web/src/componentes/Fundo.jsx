// Decoração de fundo de cada tema, atrás do conteúdo e sem interação:
//   hunter  → o hexágono do Nen, discreto
//   trupe   → teia de aranha no canto
//   zodiaco → céu estrelado e a roda dos doze signos
const SIGNOS = "子丑寅卯辰巳午未申酉戌亥";

function Hexagonos() {
  const hex = (r) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 3;
      return `${(200 + r * Math.cos(a)).toFixed(1)},${(200 + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  return (
    <svg className="fundo__desenho fundo__desenho--hunter" viewBox="0 0 400 400">
      {[180, 130, 80].map((r) => <polygon key={r} points={hex(r)} />)}
    </svg>
  );
}

function Teia() {
  // Raios saindo do canto superior direito e fios que os ligam em arcos
  const raios = Array.from({ length: 9 }, (_, i) => (90 + i * 11.25) * (Math.PI / 180));
  const ponto = (a, r) => [400 + r * Math.cos(a), r * Math.sin(a)];
  const fios = [60, 110, 165, 225, 290, 360].map((r) =>
    raios.map((a, i) => {
      const [x, y] = ponto(a, r);
      if (i === 0) return `M${x.toFixed(1)} ${y.toFixed(1)}`;
      const [cx, cy] = ponto((a + raios[i - 1]) / 2, r * 0.9);
      return `Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" "),
  );
  return (
    <svg className="fundo__desenho fundo__desenho--trupe" viewBox="0 0 400 400">
      {raios.map((a) => {
        const [x, y] = ponto(a, 420);
        return <line key={a} x1="400" y1="0" x2={x.toFixed(1)} y2={y.toFixed(1)} />;
      })}
      {fios.map((d) => <path key={d} d={d} />)}
      <line className="fundo__fio" x1="330" y1="0" x2="330" y2="150" />
      <circle className="fundo__aranhinha" cx="330" cy="154" r="5" />
    </svg>
  );
}

function Ceu() {
  // Estrelas em posições fixas (pseudoaleatórias) para não mudar a cada visita
  let semente = 7;
  const aleatorio = () => ((semente = (semente * 9301 + 49297) % 233280) / 233280);
  const estrelas = Array.from({ length: 70 }, () => [aleatorio() * 400, aleatorio() * 400, 0.4 + aleatorio() * 1.2]);
  return (
    <>
      <svg className="fundo__desenho fundo__desenho--ceu" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        {estrelas.map(([x, y, r], i) => <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={r.toFixed(2)} />)}
      </svg>
      <svg className="fundo__desenho fundo__desenho--roda" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="180" />
        <circle cx="200" cy="200" r="130" />
        {[...SIGNOS].map((s, i) => {
          const a = -Math.PI / 2 + (i * Math.PI) / 6;
          return (
            <text key={s} x={200 + 155 * Math.cos(a)} y={200 + 155 * Math.sin(a)} textAnchor="middle" dominantBaseline="central">
              {s}
            </text>
          );
        })}
      </svg>
    </>
  );
}

export default function Fundo({ tema }) {
  return (
    <div className="fundo" aria-hidden="true">
      {tema === "trupe" ? <Teia /> : tema === "zodiaco" ? <Ceu /> : <Hexagonos />}
    </div>
  );
}
