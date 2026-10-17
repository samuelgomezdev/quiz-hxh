import { ir } from "../lib/rota.js";

export default function Creditos() {
  return (
    <main className="pagina texto-corrido">
      <h1 className="titulo">Créditos e licença</h1>
      <p>
        Hunter × Hunter é uma obra de Yoshihiro Togashi, publicada pela Shueisha. Este quiz é um projeto de fã, sem fins
        lucrativos e sem ligação com os detentores dos direitos.
      </p>
      <h2 className="subtitulo">Dados dos personagens</h2>
      <p>
        Os nomes, tipos de Nen e fontes vêm da{" "}
        <a href="https://hunterxhunter.fandom.com/wiki/Hunterpedia" target="_blank" rel="noreferrer">Hunterpedia</a>, a
        wiki de Hunter × Hunter na Fandom. O texto da wiki está sob a licença{" "}
        <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.pt-br" target="_blank" rel="noreferrer">
          Creative Commons Atribuição-CompartilhaIgual 3.0
        </a>
        , e os dados derivados deste site seguem a mesma licença. Cada personagem leva ao artigo de onde veio.
      </p>
      <p>
        Quando o tipo de Nen não aparece no mangá, o site mostra a fonte usada pela wiki: databooks oficiais, o livro de
        personagens de Yu Yu Hakusho (do mesmo autor), jogos ou o anime.
      </p>
      <h2 className="subtitulo">Perguntas e personalidades</h2>
      <p>
        As perguntas são autorais. A ligação entre personalidade e tipo de Nen segue a teoria que o Hisoka explica ao Gon
        na luta da Arena Celestial. Nenhuma imagem da obra é usada: o copo e o hexágono foram desenhados para este site.
      </p>
      <button className="botao botao--secundario" onClick={() => ir("")}>Voltar ao início</button>
    </main>
  );
}
