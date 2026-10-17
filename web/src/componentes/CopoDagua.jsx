// O Teste da Água (Divinação pela Água): um copo cheio d'água com uma folha.
// Ao "revelar", o copo reage do jeito do tipo de Nen:
//   Intensificação → a água sobe e transborda
//   Transformação  → o sabor muda (bolhas sutis; a legenda explica)
//   Emissão        → a água muda de cor
//   Materialização → surgem impurezas
//   Manipulação    → a folha se move
//   Especialização → qualquer outra mudança (aqui: uma aura envolve o copo)
import { useId } from "react";

const NIVEL_NORMAL = 92;
const NIVEL_CHEIO = 34;

export default function CopoDagua({ tipo = null, revelado = false, titulo }) {
  const id = useId().replace(/:/g, "");
  const ativo = revelado ? tipo : null;
  const nivel = ativo === "intensificacao" ? NIVEL_CHEIO : NIVEL_NORMAL;
  const corAgua = ativo === "emissao" ? "var(--agua-emissao)" : "var(--agua)";

  return (
    <svg
      className={`copo ${ativo ? `copo--${ativo}` : ""}`}
      viewBox="0 0 200 250"
      role="img"
      aria-label={titulo ?? "Um copo d'água com uma folha boiando, como no Teste da Água"}
    >
      <defs>
        <clipPath id={`interior-${id}`}>
          <path d="M44 34 L156 34 L142 226 L58 226 Z" />
        </clipPath>
        <filter id={`aura-${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* aura (Especialização) */}
      <path className="copo__aura" d="M40 30 L160 30 L145 230 L55 230 Z" filter={`url(#aura-${id})`} />

      {/* água: um retângulo recortado pelo formato do copo */}
      <g clipPath={`url(#interior-${id})`}>
        <rect className="copo__agua" x="30" y="0" width="140" height="240"
          style={{ transform: `translateY(${nivel}px)`, fill: corAgua }} />
        <g className="copo__impurezas">
          <circle cx="78" cy="150" r="2.6" /><circle cx="112" cy="132" r="2" />
          <circle cx="96" cy="182" r="3" /><circle cx="124" cy="196" r="2.2" />
          <circle cx="70" cy="204" r="1.8" /><circle cx="104" cy="160" r="1.6" />
          <circle cx="88" cy="118" r="2.1" />
        </g>
        <g className="copo__bolhas">
          <circle cx="82" cy="200" r="2.4" /><circle cx="118" cy="214" r="1.8" /><circle cx="100" cy="190" r="1.5" />
        </g>
      </g>

      {/* transbordo (Intensificação) */}
      <g className="copo__gotas">
        <path d="M42 34 q-6 14 -2 22 q4 6 6 -2 q1 -10 -4 -20z" />
        <path d="M158 34 q6 18 2 26 q-4 6 -6 -2 q-1 -12 4 -24z" />
      </g>

      {/* folha boiando na superfície */}
      <g className="copo__folha-pos" style={{ transform: `translateY(${nivel - 6}px)` }}>
        <g className="copo__folha">
          <path d="M84 0 C 94 -10, 116 -10, 124 0 C 116 8, 94 8, 84 0 Z" />
          <path className="copo__nervura" d="M84 0 L124 0" />
        </g>
      </g>

      {/* o vidro, por cima de tudo */}
      <path className="copo__vidro" d="M40 30 L160 30 L145 230 L55 230 Z" />
      <path className="copo__brilho" d="M58 46 L52 196" />
    </svg>
  );
}
