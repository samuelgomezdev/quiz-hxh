# Quiz HxH — Qual é o seu tipo de Nen?

**[▶ Jogar agora: samuelgomezdev.github.io/quiz-hxh](https://samuelgomezdev.github.io/quiz-hxh/)**

Um quiz de Hunter × Hunter que faz o papel do Teste da Água: suas respostas revelam o seu tipo de Nen, a afinidade com os outros cinco tipos e os personagens que compartilham a sua aura. Depois, você pode desenvolver o seu próprio Hatsu a partir do que viveu.

| Início | Teste Trupe Fantasma | Teste Zodíaco |
| --- | --- | --- |
| [![Tela inicial com o copo do Teste da Água e a escolha entre os testes](docs/inicio.png)](https://samuelgomezdev.github.io/quiz-hxh/) | [![Pergunta inspirada em Chrollo Lucilfer, no tema preto e carmesim da Trupe](docs/quiz-trupe.png)](https://samuelgomezdev.github.io/quiz-hxh/#/quiz/trupe) | [![Pergunta inspirada em Kurapika, no tema azul-noite e dourado do Zodíaco](docs/quiz-zodiaco.png)](https://samuelgomezdev.github.io/quiz-hxh/#/quiz/zodiaco) |

- **Dois testes:** 13 perguntas inspiradas nos membros da Trupe Fantasma ou 12 nos signos do Zodíaco, cada um com identidade visual própria.
- **Resultado com base na obra:** o copo reage como no Teste da Água, o hexágono mostra a afinidade e a lista traz os personagens do mesmo tipo, com link para a Hunterpedia e a fonte de cada tipo.
- **Resultado compartilhável:** o link guarda as respostas e recalcula o resultado ao abrir.

Projeto de estudo de Análise e Desenvolvimento de Sistemas: requisitos, ETL a partir da API da [Hunterpedia](https://hunterxhunter.fandom.com/wiki/Hunterpedia), modelagem de dados, motor de pontuação testado, interface em React e publicação automática com GitHub Actions.

## Estrutura

```
etl/
  api.mjs          cliente da API MediaWiki: limite de 1 req/s, User-Agent, cache em .cache/
  extrair.mjs      E: lista as páginas com a infobox Hunterpedia:Character e baixa o wikitext
  wikitext.mjs     funções puras para ler infobox, referências e categorias
  tipo-nen.mjs     regra de negócio: interpreta o campo "type"
  imagens.mjs      busca o retrato principal de cada página (PageImages)
  transformar.mjs  T: monta Personagem e Fonte; corrige a fonte do tipo pelas categorias
  index.mjs        pipeline completo, validação e gravação (L)
conteudo/
  perguntas.mjs    autoral: 25 perguntas (Trupe e Zodíaco), só texto e tipo
  hatsu.mjs        autoral: vivências × tipos (72 Hatsus), motivações, alcances, votos e referências da obra
motor/
  pontuacao.mjs    algoritmo de pontuação e afinidade pelo hexágono
  hatsu.mjs        monta o Hatsu a partir do tipo e das respostas sobre a vida
scripts/
  gerar-perguntas.mjs  gera pesos, valida equilíbrio e simula 200 mil quizzes
data/
  perguntas.json   gerado por npm run perguntas
  tipos-nen.json   autoral: os 6 tipos, posição no hexágono, Teste da Água
  personagens.json gerado pelo ETL
  fontes.json      gerado pelo ETL (URL, revisão da wiki, data da coleta, licença)
  imagens.json     gerado por npm run imagens: id do personagem → miniatura no CDN da Fandom
web/               site em React (Vite)
  src/telas/       Início, Quiz, Resultado, Hatsu e Créditos
  src/componentes/ CopoDagua (Teste da Água), Hexagono (afinidade), Aranha, Fundo (decoração por tema) e Retrato
  src/lib/         rota por hash, código do link de resultado, embaralhamento
docs/              capturas de tela do README
scripts/preparar-web.mjs  copia para web/src/dados só o que o site usa
.github/workflows/pages.yml  testes + build + publicação no GitHub Pages
test/              testes com node:test, a partir de casos reais da wiki
```

## Como rodar

Requer Node.js 18 ou superior. Não há dependências externas.

```bash
npm test          # 32 testes: parser, transformação, motor, Hatsu, equilíbrio e links
npm run perguntas # gera data/perguntas.json e mostra o relatório de equilíbrio
npm run etl       # gera data/personagens.json e data/fontes.json (usa cache)
npm run etl:limpo # ignora o cache e consulta a wiki de novo
npm run imagens   # gera data/imagens.json (rodar depois do ETL)

cd web && npm install && cd ..
npm run site:dev   # site em http://localhost:5173
npm run site:build # gera web/dist
```

## Publicar no GitHub Pages

1. Crie o repositório no GitHub e envie o projeto para a branch `main`.
2. No repositório, abra Settings → Pages e escolha **GitHub Actions** como fonte.
3. A cada push na `main`, o workflow roda os testes, gera o site e publica em `https://<usuario>.github.io/<repositorio>/`.

O site usa rotas com `#` (ex.: `#/resultado/trupe/abcd...`) porque o GitHub Pages só serve arquivos estáticos. O link de resultado guarda as respostas, uma letra por pergunta, e o resultado é recalculado ao abrir.

A primeira execução faz cerca de 15 requisições, uma por segundo.

## Regras do campo `fonte_tipo`

| Situação na wiki | `fonte_tipo` |
| --- | --- |
| `[[Nen#X|X]]` com referência de capítulo | `manga` |
| `{{dtb||Nen#X|X}}`, `mnls`, `gdb`, `trsv` | `fora_do_manga` (livro, databook, omnibus) |
| Personagem em categoria de jogo, spin-off, anime ou filme | `fora_do_manga` |
| Página na categoria "Unknown Nen type users" com tipo preenchido | `fora_do_manga` (tipo veio de nota) |
| `Unknown`, vazio ou sem campo | `null` (personagem fica na base, fora do resultado) |

## Hatsu: o poder que nasce do que você viveu

Depois do resultado, a pessoa pode desenvolver o seu Hatsu. O tipo de Nen diz o que a aura faz; a vivência diz com o quê. Ex.: o Killua é de Transformação e cresceu levando choques, por isso a aura dele virou eletricidade.

| Pergunta | Papel no Hatsu |
| --- | --- |
| Experiência que mais marcou (12 opções) | matéria-prima: com o tipo, define o nome e o efeito |
| Por que quer ficar mais forte | quando o poder rende mais e contra quem age o voto |
| Onde prefere estar num confronto | alcance |
| Que preço aceitaria pagar | Voto e Limitação, de peso 1 a 3: quanto mais pesado, mais forte |

O resultado mostra o personagem da obra com o caminho mais parecido: mesma vivência e mesmo tipo; senão, mesma vivência por outro tipo; senão, alguém do mesmo tipo. O link `#/hatsu/<versao>/<respostas do quiz>/<respostas do Hatsu>` recria tudo.

## Identidade visual

O tema muda conforme a tela (atributo `data-tema` no `<html>`):

| Tema | Onde | Paleta |
| --- | --- | --- |
| `hunter` | início e créditos | pergaminho, tinta preta e o vermelho da licença Hunter; modo escuro automático |
| `trupe` | quiz e resultado da Trupe Fantasma | preto, carmesim e teia de aranha; tatuagem da Aranha com o número do membro |
| `zodiaco` | quiz e resultado do Zodíaco | azul-noite, dourado, céu estrelado e a roda dos doze signos |

## Licença dos dados

Os textos vindos da Hunterpedia estão sob [CC BY-SA 3.0](https://www.fandom.com/licensing). Cada personagem aponta para o artigo de origem em `fontes.json`. Os retratos não são copiados para o repositório: o site carrega a miniatura direto do CDN da Fandom, e os direitos das imagens são dos autores da obra.
