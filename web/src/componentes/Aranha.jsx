// A tatuagem da Trupe Fantasma: aranha de doze patas com o número do membro no abdômen.
const CX = 60;

// Seis patas de cada lado, da frente para trás; cada uma com joelho dobrado para cima
function patas(lado) {
  return Array.from({ length: 6 }, (_, i) => {
    const y = 40 + i * 5.5;
    const angulo = (-50 + i * 22) * (Math.PI / 180);
    const ox = CX + lado * 9;
    const jx = ox + lado * 26 * Math.cos(angulo - 0.5);
    const jy = y + 26 * Math.sin(angulo - 0.5);
    const px = jx + lado * 24 * Math.cos(angulo + 0.7);
    const py = jy + 24 * Math.sin(angulo + 0.7);
    return `M${ox} ${y} L${jx.toFixed(1)} ${jy.toFixed(1)} L${px.toFixed(1)} ${py.toFixed(1)}`;
  });
}

export default function Aranha({ numero, className = "" }) {
  const rotulo = numero == null ? "Aranha da Trupe Fantasma" : `Tatuagem da Aranha com o número ${numero}`;
  return (
    <svg className={`aranha ${className}`} viewBox="0 0 120 120" role="img" aria-label={rotulo}>
      <g className="aranha__patas">
        {[...patas(-1), ...patas(1)].map((d) => <path key={d} d={d} />)}
      </g>
      <circle className="aranha__corpo" cx={CX} cy="34" r="9" />
      <ellipse className="aranha__corpo" cx={CX} cy="72" rx="19" ry="25" />
      {numero != null && (
        <text className="aranha__numero" x={CX} y="80" textAnchor="middle">{numero}</text>
      )}
    </svg>
  );
}
