# Quiz HxH — Qual é o seu tipo de Nen?

Oct 16, 2026 · @Samuel

## Visão do produto

Um site onde o fã de Hunter × Hunter responde 13 perguntas (versão Trupe Fantasma) ou 12 (versão Zodíaco) e descobre seu tipo de Nen, com personagens do mesmo tipo tirados da Hunterpedia.

O projeto também é um laboratório de ADS: cobre requisitos, modelagem de dados, ETL, regras de negócio, testes, interface e deploy num escopo pequeno o bastante para terminar.

**Objetivos de aprendizagem**

- Escrever requisitos e critérios de aceite verificáveis
- Consumir uma API pública (MediaWiki) com boas práticas
- Modelar e versionar uma base de dados própria
- Implementar e testar um algoritmo de pontuação
- Publicar um site e documentar decisões de arquitetura

## Escopo do MVP

O MVP entrega um único quiz (tipo de Nen), em português, sem login, com dados de uma única fonte: a Hunterpedia.

| Dentro do MVP | Fora do MVP (versões futuras) |
| --- | --- |
| Duas versões: 13 perguntas (Trupe Fantasma) e 12 (Zodíaco) | Quiz de feitos (licença, estrelas, organizações) |
| 6 resultados: os tipos de Nen | Outros animes e outras wikis |
| Afinidade secundária pelo hexágono | Contas de usuário e histórico |
| Personagens do tipo resultante, com link à wiki | Ranking ou estatísticas públicas |
| Página de créditos e licença CC BY-SA | Imagens oficiais da obra |
| Compartilhar o resultado por link | Versão em inglês |

## Regras de domínio

O quiz se apoia em três regras da própria obra: seis tipos de Nen, a afinidade pelo hexágono e a teoria de personalidade do Hisoka. Os textos abaixo vêm de memória e devem ser conferidos na Hunterpedia na Fase 0.

| Tipo de Nen | Sinal no Teste da Água | Personalidade (teoria do Hisoka) | Exemplos |
| --- | --- | --- | --- |
| Intensificação | O volume de água aumenta | Simples e determinado | Gon, Uvogin |
| Transformação | O sabor da água muda | Caprichoso, imprevisível | Killua, Hisoka |
| Emissão | A cor da água muda | Impaciente, explosivo | Leorio, Franklin |
| Materialização | Surgem impurezas na água | Nervoso, cauteloso | Kurapika, Kortopi |
| Manipulação | A folha se move | Lógico, defende suas ideias | Illumi, Shalnark |
| Especialização | Qualquer outra mudança | Individualista, carismático | Chrollo, Neferpitou |

**Regra do hexágono.** O usuário domina 100% do próprio tipo. Os tipos vizinhos chegam a 80%, os dois passos adiante a 60% e o oposto a 40%. A Especialização só é acessível de verdade a especialistas.

&#91;embedded content: hexágono do Nen · afinidade de um Intensificador\]

A posição no hexágono vira o campo `posicao_hexagono` (0 a 5), e a distância entre posições dá a afinidade.

**Regra de negócio derivada.** O resultado mostra o tipo principal e a afinidade com os outros cinco, calculada pela distância no hexágono, e não pela pontuação bruta.

## Requisitos funcionais

São oito requisitos, cada um com um critério de aceite que pode virar teste.

| ID | Requisito | Critério de aceite |
| --- | --- | --- |
| RF01 | Iniciar o quiz pela página inicial | Um clique leva à pergunta 1 |
| RF02 | Exibir uma pergunta por vez, com 4 a 6 opções | Não avança sem uma opção marcada |
| RF03 | Voltar à pergunta anterior | A resposta anterior continua marcada e é recalculada |
| RF04 | Calcular o tipo de Nen ao fim | Mesmas respostas geram sempre o mesmo resultado |
| RF05 | Mostrar a afinidade com os seis tipos | Os valores seguem a regra do hexágono |
| RF06 | Listar personagens do tipo resultante | Cada nome tem link para o artigo na Hunterpedia; tipo vindo de fora do mangá mostra a marca e a obra de origem |
| RF07 | Compartilhar o resultado por link | O link abre direto na tela de resultado |
| RF08 | Exibir página de créditos | Cita a Hunterpedia, a licença CC BY-SA e o autor da obra |

## Requisitos não funcionais e restrições

A restrição que mais pesa é a licença: todo texto vindo da Hunterpedia exige atribuição e compartilhamento pela mesma licença.

| ID | Tipo | Requisito |
| --- | --- | --- |
| RNF01 | Licença | Texto da wiki sob [CC BY-SA](https://community.fandom.com/wiki/Help:Licensing), com atribuição e link de origem por registro |
| RNF02 | Licença | Sem imagens oficiais da obra; visual próprio (ícones dos tipos de Nen) |
| RNF03 | Coleta | Dados obtidos só pela API MediaWiki (`api.php`), nunca por scraping de HTML |
| RNF04 | Coleta | Cliente da API com limite de taxa, cache local e User-Agent identificado |
| RNF05 | Arquitetura | O site nunca consulta a wiki em tempo real; lê só a base gerada |
| RNF06 | Conteúdo | Conteúdo até o arco atual (Continente Negro), com aviso de spoiler na página inicial |
| RNF07 | Desempenho | Resultado exibido em menos de 1 s após a última resposta |
| RNF08 | Usabilidade | Funciona em celular, com largura mínima de 360 px |
| RNF09 | Manutenção | Código e base no GitHub (samuelgomezdev); site publicado no GitHub Pages |

[Licenciamento na Fandom](https://www.fandom.com/Licensing)

## Modelo de dados inicial

O modelo separa o que vem da wiki (Personagem, Fonte) do que é autoral (Pergunta, Opção, Peso). Assim a coleta pode rodar de novo sem apagar o quiz.

| Entidade | Origem | Campos principais |
| --- | --- | --- |
| TipoNen | Autoral | id, nome, posicao\_hexagono (0 a 5), descricao, personalidade |
| Personagem | Wiki (ETL) | id, nome, tipo\_nen\_id (pode ser vazio), tipo\_nen\_secundario\_id, fonte\_tipo (manga ou fora\_do\_manga), fonte\_tipo\_detalhe, nota\_tipo, origem\_personagem, afiliacao, capitulo\_estreia, status, fonte\_id |
| Fonte | Wiki (ETL) | id, titulo\_wiki, url\_artigo, revisao\_wiki, data\_coleta, licenca |
| Pergunta | Autoral | id, versao (trupe ou zodiaco), ordem, membro\_tema, texto |
| Opcao | Autoral | id, pergunta\_id, texto |
| Peso | Autoral | opcao\_id, tipo\_nen\_id, valor (0 a 3) |
| Resultado | Calculado | tipo\_principal, afinidades\[6\], respostas\[\] |

Relações: uma Pergunta tem várias Opções; cada Opção tem um Peso para cada TipoNen; cada Personagem tem um TipoNen e uma Fonte.

Formato do MVP: arquivos JSON versionados no repositório. Um banco (SQLite ou Postgres) entra só se surgir um requisito que peça.

## Algoritmo de pontuação

O tipo principal é o de maior soma de pesos; a afinidade com os demais vem só da distância no hexágono.

1. Para cada tipo t, somar os pesos das opções escolhidas:

```latex
S_t = \sum_{i=1}^{n} \text{peso}(o_i, t)
```

2. Tipo principal p = o tipo com maior S\_t.
3. Desempate, nesta ordem: maior peso na última pergunta (pergunta de desempate) e, persistindo, a ordem fixa do hexágono.
4. Afinidade de cada tipo, com d = passos entre t e p no hexágono (0 a 3):

```latex
A_t = 100 - 20 \cdot d(t, p)
```

5. Exceção: se p não for Especialização, a afinidade com Especialização é 0%.

**Casos de teste mínimos**

- [ ] Todas as respostas com peso em Intensificação → resultado Intensificação, Emissão e Transformação a 80%
- [ ] Empate entre dois tipos → aplica a regra de desempate e o resultado é sempre o mesmo
- [ ] Resultado Especialização → os outros cinco seguem a fórmula normalmente
- [ ] Pesos somados nunca negativos; opção sem peso conta 0

## Arquitetura e fases de entrega

A coleta e o site são independentes: o ETL gera a base, e o site só lê arquivos estáticos.

&#91;embedded content: arquitetura do MVP · coleta offline e site\]

O motor é a única parte com regra de negócio, por isso é o foco dos testes unitários.

**Fases**

1. **Descoberta:** mapear categorias e infoboxes de Nen na Hunterpedia e confirmar o endereço da API.
2. **Requisitos:** fechar as decisões em aberto e revisar este documento.
3. **ETL:** script JavaScript (Node.js) que lê a API e grava `personagens.json` e `fontes.json`.
4. **Conteúdo:** escrever as perguntas, opções e pesos.
5. **Motor:** implementar o algoritmo e os casos de teste.
6. **Interface:** app em React (Vite), com protótipo opcional como Artifact do Claude.
7. **Deploy:** publicar no GitHub Pages e registrar as decisões de arquitetura (ADRs) no repositório.

## Decisões em aberto

As sete decisões estão fechadas.

| Decisão | Escolha |
| --- | --- |
| Endereço da Hunterpedia | [hunterxhunter.fandom.com](https://hunterxhunter.fandom.com/wiki/Hunterpedia) |
| Limite de spoiler | Até o arco atual (Expedição ao Continente Negro) |
| Quantidade de perguntas | Duas versões: 13 (Trupe Fantasma) e 12 (Zodíaco) |
| Stack do front | React |
| Linguagem do ETL | JavaScript (Node.js) |
| Publicação | GitHub Pages |

**Personagens sem tipo confirmado.** Ficam na base com `tipo_nen_id` vazio e não aparecem no resultado; continuam disponíveis para o futuro quiz de feitos.

**Personagens com dois tipos.** Usam `tipo_nen_secundario_id` (ex.: Kurapika, Materialização e Especialização). O resultado lista o personagem pelo tipo principal.

## Fase 0: descoberta na API

A API da Hunterpedia responde sem login e traz o tipo de Nen de forma estruturada: há 610 páginas de personagem, e 111 delas têm tipo de Nen confirmado. Consulta feita em 16/10/2026 com o script `fase0-explorar.mjs`.

| Achado | Detalhe | Impacto no ETL |
| --- | --- | --- |
| Licença do site | CC-BY-SA, informada pela própria API | Confirma o RNF01 |
| Infobox de personagem | Template `Hunterpedia:Character`, usado em 610 páginas | Lista de personagens = páginas que usam esse template |
| Campo do tipo | `type`, com link e referência: \`\[\[Nen#Enhancement | Enhancement\]\]\<ref>…Chapter 60\</ref>\` |
| Dois tipos | Kurapika: Conjuration `<br />` Specialization (olhos escarlates) | Separar por `<br />`: o primeiro é o principal, o segundo o secundário |
| Categorias por tipo | Enhancers 21, Emitters 21, Conjurers 20, Manipulators 20, Specialists 16, Transmuters 13 | Servem para conferir o campo `type` |
| Tipo desconhecido | `Unknown Nen type users`: 249 páginas | Ficam com `tipo_nen_id` vazio (decisão já tomada) |
| Tipo fora do mangá | `Nen type attributed outside manga canon`: 18 páginas (ex.: Feitan, Phinks, Shoot) | Nova decisão: entram ou não no resultado? |
| Fonte do tipo | A `<ref>` diz de onde veio: capítulo do mangá ou exposição do Togashi (caso do Illumi) | Gravar a fonte do tipo junto do personagem |
| Título das páginas | Grafia da wiki difere da usual (ex.: `Leorio Paradinight`) | Buscar personagens pela API, nunca por nome digitado |

**Mapa de nomes (wiki em inglês → quiz em português):** Enhancement → Intensificação, Transmutation → Transformação, Emission → Emissão, Conjuration → Materialização, Manipulation → Manipulação, Specialization → Especialização.

- [x] Personagens com tipo atribuído fora do mangá aparecem no resultado, com a marca "fonte fora do mangá" e o nome da obra de origem
- [x] Adicionar `fonte_tipo` e `fonte_tipo_detalhe` ao modelo de dados
- [ ] Fase 3: transformar o script de exploração no ETL completo

### Tipos de Nen vindos de fora do mangá

São 17 personagens (a categoria tem 18 entradas, mas uma é post de blog). A wiki marca a origem com um template em volta do tipo, então o ETL identifica a fonte sem ler o texto da referência.

| Template na wiki | Obra de origem |
| --- | --- |
| `dtb` | Hunter's Guide: Character & World Official Databook (Associação Hunter, livro oficial) |
| `mnls` | Seção "Hunter × Hunter Manual" do Yu Yu Hakusho Official Characters Book Reikaishinshiroku |
| `gdb` | Hunter × Hunter Characters Book: World × Character × Blessing (2001) |
| `trsv` | Omnibus Hunter × Hunter Treasure 9, p. 410 |
| Sem template (`[[Nen#…]]`) | Mangá: tipo canônico |

| Personagem | Tipo | Onde apareceu |
| --- | --- | --- |
| Feitan Portor | Transformação | Databook, p. 129; anime 2011, ep. 55 |
| Phinks Magcub | Intensificação | Databook, p. 128; anime 2011, ep. 51 |
| Shoot McMahon | Manipulação | Databook, p. 78 |
| Kikyo Zoldyck | Manipulação | Databook, p. 141 |
| Maha Zoldyck | Intensificação | Databook, p. 143 |
| Sadaso | Transformação | Databook, p. 204 |
| Rabid Dog | Intensificação | Databook, p. 179; Characters Book (2001) |
| Meleoron | Especialização | Hunter × Hunter Manual |
| Welfin | Materialização | Hunter × Hunter Manual |
| Zazan | Manipulação | Hunter × Hunter Manual |
| Leol | Especialização | Hunter × Hunter Manual |
| Cheetu | Materialização | Hunter × Hunter Manual |
| Bloster | Emissão | Hunter × Hunter Manual; Treasure 9, p. 410 |
| Hina | Especialização | Treasure 9, p. 410 |
| Leech | Manipulação | Characters Book (2001); jogo Battle Collection |
| Porcupine | Transformação | Characters Book (2001); jogo Battle Collection |
| Worm | Transformação | Characters Book (2001); jogo Battle Collection |

Na tela de resultado, esses nomes aparecem com a marca "fonte fora do mangá" e, ao passar o dedo ou o mouse, a obra de origem.

Fontes: [Hunterpedia](https://hunterxhunter.fandom.com/wiki/Hunterpedia), [Gon Freecss](https://hunterxhunter.fandom.com/wiki/Gon_Freecss)

## Fase 3: ETL

O ETL roda em Node.js sem dependências e gera a base em cerca de 15 requisições: 610 personagens, 111 com tipo de Nen. Executado em 16/10/2026, com 17 testes passando.

| Métrica | Valor |
| --- | --- |
| Personagens na base | 610 |
| Com tipo de Nen | 111 |
| Tipo confirmado no mangá | 84 |
| Tipo fora do mangá | 27 |
| Com tipo secundário | 1 (Kurapika) |
| Intensificação · Transformação · Materialização | 22 · 13 · 19 |
| Especialização · Manipulação · Emissão | 15 · 20 · 22 |

**Conferência contra as categorias da wiki.** Cruzar o campo `type` com as categorias revelou que o campo sozinho engana. Dez personagens apareciam como "tipo do mangá" sem ser:

- 9 nem existem no mangá: 6 de jogos (Sabaki, Tron, Rorgo, Sansho, Aruto, Amane), 2 de spin-off (Abaki, Moritonio) e 1 de filme (Omokage)
- 1 é do mangá, mas o tipo veio de um jogo: Riehlvelt, registrado numa nota de rodapé e na categoria de tipo desconhecido

Correção: as categorias da página agora ajustam `fonte_tipo`, e um campo novo, `origem_personagem`, guarda de onde o personagem vem (mangá, jogo, spin-off, anime ou filme). Os dois casos viraram testes de regressão.

**Campos novos no modelo:** `origem_personagem`, `nota_tipo` (ex.: "quando os olhos estão escarlates") e `capitulo_estreia`, que substitui `arco_estreia` porque a wiki traz o capítulo, não o arco.

- [ ] Personagens só de jogo, spin-off e filme seguem a regra "fora do mangá" e aparecem no resultado com marca. Confirmar ou excluir.
- [ ] Fase 4: escrever as perguntas das versões Trupe (13) e Zodíaco (12)

## Fase 4: perguntas

As 25 perguntas estão escritas e equilibradas; o texto completo, com os pesos de cada opção, está na aba Perguntas.

| Versão | Perguntas | Vezes por tipo | Peso total por tipo | Resultado com respostas aleatórias |
| --- | --- | --- | --- | --- |
| Trupe Fantasma (#0 a #12) | 13 (a última com 6 opções) | 9 | 36 | 16,0% a 17,4% por tipo |
| Zodíaco (Rato a Javali) | 12 | 8 | 32 | 15,8% a 17,1% por tipo |

A Trupe usa os 13 números históricos com a formação de Yorknew, porque hoje só 10 posições estão ocupadas na wiki. O Zodíaco usa os 12 signos atuais.

**Como o equilíbrio é garantido.** As perguntas ficam em `conteudo/perguntas.mjs`, só com texto e tipo. O script `npm run perguntas` gera os pesos, valida a estrutura e simula 200 mil quizzes com respostas aleatórias. O ideal é 16,7% por tipo; a pequena vantagem da Intensificação na Trupe vem da regra de desempate pela ordem do hexágono.

**Motor adiantado.** O algoritmo de pontuação (`motor/pontuacao.mjs`) foi implementado para rodar a simulação, com os casos de teste do documento. São 24 testes no total.

- [ ] Revisar o texto das perguntas na aba Perguntas (editar ou comentar direto)
- [ ] Fase 5/6: interface em React com o motor já pronto

## Fase 6: interface

O site em React (Vite) está pronto e passa em todos os requisitos funcionais; a publicação no GitHub Pages sai automaticamente a cada push, depois dos 26 testes.

| Requisito | Como foi atendido |
| --- | --- |
| RF01 | Página inicial com a escolha entre os testes Trupe e Zodíaco |
| RF02 | Uma pergunta por vez, opções como botões de rádio; "Próxima" só libera com uma opção marcada |
| RF03 | "Voltar" mantém a resposta e a ordem das opções, sorteada uma vez por teste |
| RF04 | O motor é o mesmo dos testes (`motor/pontuacao.mjs`) |
| RF05 | Hexágono com a afinidade de cada tipo |
| RF06 | Personagens do tipo com link para a Hunterpedia; os de fonte fora do mangá abrem a origem |
| RF07 | O link guarda as respostas (uma letra por pergunta) e recalcula o resultado |
| RF08 | Página de créditos com Togashi, Hunterpedia e CC BY-SA |
| RNF05 | O site só lê arquivos estáticos gerados por `scripts/preparar-web.mjs` |
| RNF08 | Testado a 400 px, sem rolagem lateral, nos temas claro e escuro |

**Teste da Água no resultado.** O copo da página inicial reage ao tipo: a água transborda, muda de cor, ganha impurezas, a folha se move, surgem bolhas (sabor) ou uma aura dourada. Quem prefere menos movimento vê o estado final direto.

**Decisões técnicas.** Rotas por `#` porque o GitHub Pages não reescreve URLs. Sem biblioteca de rotas nem de estado: o app é pequeno e cada tela recebe o que precisa por parâmetro. O bundle final tem 59 KB comprimido.

**Prévia jogável.** Há uma cópia do site publicada como artifact do Claude para testar agora. Nela, os links de resultado não abrem direto no resultado; no GitHub Pages abrem.

- [x] Repositório [samuelgomezdev/quiz-hxh](https://github.com/samuelgomezdev/quiz-hxh) criado, GitHub Pages ativo e primeira publicação feita em 16/10/2026
- [ ] Revisar o texto das perguntas jogando o site

**No ar:** [samuelgomezdev.github.io/quiz-hxh](https://samuelgomezdev.github.io/quiz-hxh/). Cada push na `main` roda os testes e só publica se todos passarem.
