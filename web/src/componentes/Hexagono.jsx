// O hexágono do Nen com a afinidade de cada tipo (0 a 100%).
// Vértices na ordem da obra: Intensificação no topo, seguindo no sentido horário.
import { HEXAGONO } from "../../../motor/pontuacao.mjs";

const CX = 210, CY = 150, R = 104;

function ponto(i, escala = 1) {
  const angulo = -Math.PI / 2 + (i * Math.PI) / 3;
  return [CX + R * escala * Math.cos(angulo), CY + R * escala * Math.sin(angulo)];
}

export default function Hexagono({ afinidade, principal, nomes }) {
  const contorno = HEXAGONO.map((_, i) => ponto(i).join(",")).join(" ");
  const forma = HEXAGONO.map((t, i) => ponto(i, Math.max(afinidade[t], 4) / 100).join(",")).join(" ");
  const descricao = HEXAGONO.map((t) => `${nomes[t]} ${afinidade[t]}%`).join(", ");

  return (
    <svg className="hexagono" viewBox="0 0 420 300" role="img" aria-label={`Afinidade com cada tipo: ${descricao}`}>
      {[0.4, 0.6, 0.8].map((e) => (
        <polygon key={e} className="hexagono__grade" points={HEXAGONO.map((_, i) => ponto(i, e).join(",")).join(" ")} />
      ))}
      <polygon className="hexagono__contorno" points={contorno} />
      <polygon className="hexagono__forma" points={forma} />
      {HEXAGONO.map((t, i) => {
        const [x, y] = ponto(i, 1.2);
        const ancora = Math.abs(x - CX) < 4 ? "middle" : x > CX ? "start" : "end";
        const destaque = t === principal;
        return (
          <g key={t} className={destaque ? "hexagono__rotulo hexagono__rotulo--principal" : "hexagono__rotulo"}>
            <text x={x} y={y - 2} textAnchor={ancora}>{nomes[t]}</text>
            <text x={x} y={y + 15} textAnchor={ancora} className="hexagono__valor">{afinidade[t]}%</text>
          </g>
        );
      })}
    </svg>
  );
}
