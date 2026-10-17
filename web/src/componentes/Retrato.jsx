// Retrato do personagem, vindo do CDN da Hunterpedia (só o endereço fica no site).
// Se a imagem não carregar, mostra as iniciais no lugar.
import { useState } from "react";

export default function Retrato({ src, nome, className = "" }) {
  const [falhou, setFalhou] = useState(false);
  const iniciais = nome.split(" ").map((parte) => parte[0]).slice(0, 2).join("");

  return (
    <span className={`retrato ${className}`}>
      {src && !falhou ? (
        <img src={src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFalhou(true)} />
      ) : (
        <span className="retrato__iniciais" aria-hidden="true">{iniciais}</span>
      )}
    </span>
  );
}
