// Retrato do personagem, vindo do CDN da Hunterpedia (só o endereço fica no site).
// A Fandom às vezes recusa um pedido (403); por isso o retrato tenta de novo uma vez
// antes de mostrar as iniciais. A falha vale só para aquele endereço: quando o
// componente é reaproveitado com outro personagem (a próxima pergunta), tenta outra vez.
import { useState } from "react";

const MAX_TENTATIVAS = 2;

// Uma nova tentativa usa outro endereço, para o navegador não reaproveitar o erro guardado
const comTentativa = (src, n) => (n === 0 ? src : `${src}${src.includes("?") ? "&" : "?"}tentativa=${n}`);

export function preCarregar(srcs) {
  for (const src of srcs) if (src) new Image().src = src;
}

export default function Retrato({ src, nome, className = "", prioridade = false }) {
  const [erros, setErros] = useState({ src, n: 0 });
  const falhas = erros.src === src ? erros.n : 0;
  const iniciais = nome.split(" ").map((parte) => parte[0]).slice(0, 2).join("");

  return (
    <span className={`retrato ${className}`}>
      {src && falhas < MAX_TENTATIVAS ? (
        <img
          key={`${src}#${falhas}`}
          src={comTentativa(src, falhas)}
          alt=""
          loading={prioridade ? "eager" : "lazy"}
          fetchpriority={prioridade ? "high" : "auto"}
          decoding="async"
          onError={() => setErros({ src, n: falhas + 1 })}
        />
      ) : (
        <span className="retrato__iniciais" aria-hidden="true">{iniciais}</span>
      )}
    </span>
  );
}
