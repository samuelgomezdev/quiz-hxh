// Roteamento por hash (#/quiz/trupe). O GitHub Pages só serve arquivos
// estáticos, então o hash evita erro 404 ao recarregar uma página interna.
import { useEffect, useState } from "react";

// Cada parte vem decodificada: nomes digitados (ex.: o nome no cartão) vão com encodeURIComponent
function lerHash() {
  return window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map((parte) => {
    try {
      return decodeURIComponent(parte);
    } catch {
      return parte;
    }
  });
}

export function useRota() {
  const [partes, setPartes] = useState(lerHash);
  useEffect(() => {
    const aoMudar = () => {
      setPartes(lerHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", aoMudar);
    return () => window.removeEventListener("hashchange", aoMudar);
  }, []);
  return partes;
}

export function ir(caminho) {
  window.location.hash = `#/${caminho}`;
}

export function linkAbsoluto(caminho) {
  return `${window.location.origin}${window.location.pathname}#/${caminho}`;
}
