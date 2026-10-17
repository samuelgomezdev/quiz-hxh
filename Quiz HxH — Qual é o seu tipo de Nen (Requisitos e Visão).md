# Quiz HxH — Qual é o seu tipo de Nen?

Oct 16, 2026 · @Samuel

## Visão do produto

Um site onde o fã de Hunter × Hunter responde 13 perguntas (versão Trupe Fantasma) ou 12 (versão Zodíaco) e descobre seu tipo de Nen, com personagens do mesmo tipo tirados da Hunterpedia. Depois, pode desenvolver o seu Hatsu (uma habilidade pessoal que nasce do tipo de Nen combinado com o que a pessoa viveu), montar um poder próprio peça por peça e tirar a sua Licença Hunter a partir dos feitos da sua vida.

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
| Duas versões: 13 perguntas (Trupe Fantasma) e 12 (Zodíaco) | Salvar licenças e poderes numa conta |
| 6 resultados: os tipos de Nen | Outros animes e outras wikis |
| Afinidade secundária pelo hexágono | Contas de usuário e histórico |
| Personagens do tipo resultante, com link à wiki | Ranking ou estatísticas públicas |
| Página de créditos e licença CC BY-SA | Hatsu escrito livremente pelo usuário (exigiria servidor) |
| Compartilhar o resultado por link | Versão em inglês |
| Retratos dos personagens, carregados do CDN da Hunterpedia (pós-MVP) | |
| Identidade visual por teste (pós-MVP) | |
| Hatsu a partir do tipo e da vivência (pós-MVP) | |
| Crie o seu poder: construtor com nome e descrição livres (pós-MVP) | |
| Licença Hunter: feitos, especialidade, estrelas e organização (pós-MVP) | |

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

São oito requisitos do MVP e onze adicionados depois (RF09 a RF19), cada um com um critério de aceite que pode virar teste.

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
| RF09 | Mostrar o retrato de cada personagem no resultado | Cada cartão tem a imagem da Hunterpedia; se ela falhar, aparecem as iniciais |
| RF10 | Dar a cada teste a sua identidade visual | Início e créditos no tema neutro (Associação Hunter); quiz, resultado e Hatsu no tema da versão |
| RF11 | Gerar o Hatsu a partir do tipo e de quatro perguntas sobre a vida | Mesmo tipo e mesmas respostas geram sempre o mesmo Hatsu; os 72 pares vivência × tipo têm nome e efeito |
| RF12 | Mostrar o personagem da obra com o caminho mais parecido e compartilhar o Hatsu por link | Transformação + eletricidade leva ao Killua; o link abre direto na carta do Hatsu |
| RF13 | Montar um poder peça por peça e, se quiser, dar nome a ele | Categoria, forma, origem, gatilho, até 3 votos, nome e descrição opcionais (até 40 e 200 caracteres); sem nome, o poder recebe um nome sugerido com a origem explicada; o link abre a carta com o mesmo nome |
| RF14 | Avaliar o poder pela teoria do Nen | Eficiência segue o hexágono; Especialização fica bloqueada para quem não é especialista; votos e forma natural aumentam a potência |
| RF15 | Marcar feitos e gerar a Licença Hunter | Especialidade, estrelas e organização são sempre as mesmas para as mesmas respostas; o cartão mostra o que falta para a próxima estrela |
| RF16 | Mostrar Hunters reais da especialidade e membros da organização | Os Hunters vêm do campo `occupation` da Hunterpedia, com retrato e estrelas |
| RF17 | Ligar as etapas numa jornada | A licença tem cartão próprio na página inicial e também abre depois do Hatsu; vinda do Hatsu, o cartão mostra o tipo e o nome do Hatsu |
| RF18 | Mostrar na carta do poder quem tem um estilo parecido na obra | Materialização + objeto + votos de alvo e de vida leva ao Kurapika (Chain Jail); a carta mostra o retrato, o que há em comum e onde o poder se afasta, mais dois parecidos, sem repetir personagem |
| RF19 | Tocar a trilha sonora oficial, com a faixa escolhida por regra para cada situação do site | A faixa segue, nesta ordem, o personagem em foco, o grupo dele, a organização ou versão e o momento da tela; a licença da Família Zoldyck toca “Ansatsu Ikka no Yakata” e a da Trupe toca “Requiem Aranea”; toda pergunta do quiz tem a faixa do membro ou do grupo dele; nada é pedido ao Spotify antes do primeiro clique; ao trocar de tela com a música tocando, entra a faixa da nova tela; aberto, o player não cobre os botões a 375 px |

## Requisitos não funcionais e restrições

A restrição que mais pesa é a licença: todo texto vindo da Hunterpedia exige atribuição e compartilhamento pela mesma licença.

| ID | Tipo | Requisito |
| --- | --- | --- |
| RNF01 | Licença | Texto da wiki sob [CC BY-SA](https://community.fandom.com/wiki/Help:Licensing), com atribuição e link de origem por registro |
| RNF02 | Licença | Revisado: os retratos da obra não são copiados para o repositório; o site guarda só o endereço da miniatura no CDN da Fandom e credita os direitos na página de créditos. Copo, hexágono, aranha e roda do Zodíaco são desenhos próprios |
| RNF03 | Coleta | Dados obtidos só pela API MediaWiki (`api.php`), nunca por scraping de HTML |
| RNF04 | Coleta | Cliente da API com limite de taxa, cache local e User-Agent identificado |
| RNF05 | Arquitetura | O site nunca consulta a wiki em tempo real; lê só a base gerada |
| RNF06 | Conteúdo | Conteúdo até o arco atual (Continente Negro), com aviso de spoiler na página inicial |
| RNF07 | Desempenho | Resultado exibido em menos de 1 s após a última resposta |
| RNF08 | Usabilidade | Funciona em celular, com largura mínima de 360 px |
| RNF09 | Manutenção | Código e base no GitHub (samuelgomezdev); site publicado no GitHub Pages |
| RNF10 | Licença | A trilha sonora toca pelo player oficial do Spotify; nenhum arquivo de áudio fica no repositório, e a página de créditos cita compositor e gravadora |

[Licenciamento na Fandom](https://www.fandom.com/Licensing)

## Modelo de dados inicial

O modelo separa o que vem da wiki (Personagem, Fonte) do que é autoral (Pergunta, Opção, Peso). Assim a coleta pode rodar de novo sem apagar o quiz.

| Entidade | Origem | Campos principais |
| --- | --- | --- |
| TipoNen | Autoral | id, nome, posicao\_hexagono (0 a 5), descricao, personalidade |
| Personagem | Wiki (ETL) | id, nome, tipo\_nen\_id (pode ser vazio), tipo\_nen\_secundario\_id, fonte\_tipo (manga ou fora\_do\_manga), fonte\_tipo\_detalhe, nota\_tipo, origem\_personagem, hunter, especialidades\[\], estrelas (1 a 3 ou vazio), afiliacao, capitulo\_estreia, status, fonte\_id |
| Fonte | Wiki (ETL) | id, titulo\_wiki, url\_artigo, revisao\_wiki, data\_coleta, licenca |
| Pergunta | Autoral | id, versao (trupe ou zodiaco), ordem, membro\_tema, texto |
| Opcao | Autoral | id, pergunta\_id, texto |
| Peso | Autoral | opcao\_id, tipo\_nen\_id, valor (0 a 3) |
| Resultado | Calculado | tipo\_principal, afinidades\[6\], respostas\[\] |
| Imagem | Wiki (`npm run imagens`) | personagem\_id → url da miniatura (`data/imagens.json`) |
| Vivencia | Autoral | id, nome, texto, hatsu\[tipo\] = (nome, efeito, origem do nome) |
| Motivacao · Alcance · Voto | Autoral | id, texto, efeito; Voto também tem regra e peso (1 a 3) |
| Referencia | Autoral | personagem\_id, vivencia\_id, tipo\_nen\_id, habilidade, historia |
| Estilo | Autoral | personagem\_id, tipo\_nen\_id, habilidade, categoria, forma, gatilho (ou à vontade), votos\[\], resumo: um Hatsu da obra descrito com as peças do construtor |
| Faixa | Autoral | id, id no Spotify, nome, volume da trilha (1 a 3), tradução do título; ligada a um personagem, a um grupo (faixas de pergunta, resultado e membro) ou a um momento de tela |
| Hatsu | Calculado | nome, tipo, efeito, vivência, motivação, alcance, voto, referência |
| Forma · Gatilho | Autoral | id, nome, frase; Forma também tem as categorias em que é natural |
| Poder | Calculado + nome e descrição do usuário | tipo, categoria, forma, gatilho, vivência, votos (até 3), eficiência, potência, risco, comentários |
| Especialidade | Autoral | id, nome, sigla, descrição, caçada; agrupa as especialidades da wiki |
| Feito | Autoral | id, texto, troféu, especialidade (opcional), conquista, papel (licença, mentor, cargo, várias áreas), paralelo na obra |
| Organizacao | Autoral | id, nome, descrição, afiliações da wiki que a representam |
| Licenca | Calculado | especialidade, licenciado, estrelas, faltam\[\], organização, troféus |

Relações: uma Pergunta tem várias Opções; cada Opção tem um Peso para cada TipoNen; cada Personagem tem um TipoNen e uma Fonte. Um Hatsu combina um TipoNen com uma Vivencia, uma Motivacao, um Alcance e um Voto. Um Poder combina dois TipoNen (o do usuário e a categoria) com uma Forma, um Gatilho, uma Vivencia opcional e até três Votos, e é comparado com os Estilos da obra. Uma Licenca combina Feitos com uma Especialidade e uma Organizacao; Personagens com a mesma especialidade ou afiliação aparecem no cartão.

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

## Fase 7: identidade visual e retratos

Cada parte do site ganhou uma identidade própria, e o resultado passou a mostrar o rosto dos personagens. Feito em 17/10/2026.

| Tema | Onde | Paleta e elementos |
| --- | --- | --- |
| Associação Hunter (neutro) | Início e créditos | Pergaminho, tinta preta e vermelho da licença Hunter; logo "HUNTER×HUNTER"; hexágono discreto ao fundo; segue o modo claro ou escuro do aparelho |
| Trupe Fantasma | Quiz, resultado e Hatsu da Trupe | Preto e carmesim, títulos em Cinzel, teia no canto e a tatuagem da Aranha com o número de cada membro |
| Zodíaco | Quiz, resultado e Hatsu do Zodíaco | Azul-noite e dourado, céu estrelado e a roda dos doze signos (子 丑 寅 卯 辰 巳 午 未 申 酉 戌 亥) |

O tema é escolhido pela rota e aplicado com `data-tema` no `<html>`; cada tema só redefine as cores, então os componentes são os mesmos.

**Retratos.** A extensão PageImages da API devolve a imagem principal de cada artigo. O script `npm run imagens` busca as 122 páginas necessárias (personagens com tipo e membros que inspiram as perguntas) e todas têm imagem. Os retratos aparecem:

- nos cartões dos personagens do mesmo tipo, no resultado
- no membro que inspira cada pergunta do quiz
- numa seção nova, "Na Trupe Fantasma, sua aura é a de…", com os membros da versão que têm o mesmo tipo (no Zodíaco, só Kurapika e Leorio têm tipo conhecido)

- [x] Testado no navegador nos três temas, inclusive a 375 px, sem rolagem lateral

## Fase 8: Hatsu

O tipo de Nen diz o que a aura faz; o Hatsu nasce do que a pessoa viveu. É a lógica do Killua: ele é de Transformação e cresceu levando choques, por isso a aura dele virou eletricidade. Feito em 17/10/2026.

**Fluxo.** No resultado, a chamada "Desenvolva o seu Hatsu" leva a quatro perguntas. A resposta vira uma carta com nome, efeito, condições e o personagem da obra mais parecido.

| Pergunta | Opções | Papel no Hatsu |
| --- | --- | --- |
| Qual experiência mais marcou a sua vida? | 12 vivências: eletricidade, corpo e treino, jogos, tecnologia, livros e estudo, música, cuidado e saúde, trabalho manual, perda e injustiça, trabalho e contas, natureza e bichos, fogo e cozinha | Matéria-prima. Com o tipo, define o nome e o efeito |
| Por que você quer ficar mais forte? | 6 motivações | Quando o poder rende mais e contra quem age o voto |
| Num confronto, onde você prefere estar? | 4 alcances | Onde o poder age |
| Que preço aceitaria pagar? | 6 votos, de peso 1 a 3 | Voto e Limitação: quanto mais pesada a regra, mais forte o Hatsu |

**Regra de negócio.** Cada vivência tem um Hatsu escrito para cada tipo, seguindo o que o tipo faz com a aura: Intensificação reforça, Transformação dá outras propriedades, Emissão envia longe, Materialização cria objetos, Manipulação controla e Especialização faz algo único. São 72 combinações autorais em `conteudo/hatsu.mjs`.

**Personagem de referência**, em ordem de prioridade:

1. Mesma vivência e mesmo tipo (ex.: Transformação + eletricidade → Killua, Godspeed)
2. Mesma vivência por outro tipo (ex.: Intensificação + eletricidade → "mesmo ponto de partida do Killua")
3. Alguém do mesmo tipo

São 20 referências; o tipo de cada uma é conferido por teste contra a base da Hunterpedia.

**Link.** `#/hatsu/<versao>/<respostas do quiz>/<respostas do Hatsu>`, com uma letra por resposta. O tipo é recalculado a partir das respostas do quiz.

**Testes.** O motor (`motor/hatsu.mjs`) tem 6 testes novos: as 72 combinações, o caso do Killua, o voto ligado à motivação, as referências contra a base e o código do link. Total: 32 testes.

- [x] Testado no navegador do resultado até a carta, nos temas Trupe e Zodíaco e a 375 px
- [x] Textos dos 72 Hatsus revisados (ver fase 10)
- [ ] Decidir se a vivência pode ter mais de uma escolha (ex.: eletricidade + música)

## Apresentação do repositório (16/10/2026)

O README abre com o link do site e três capturas de tela, e o "About" do GitHub ganhou descrição, site e tópicos, para quem chega ao repositório jogar com um clique.

- Capturas em `docs/` (início, Trupe e Zodíaco), feitas no site publicado com as imagens da Fandom bloqueadas: os retratos continuam fora do repositório, como diz a seção de licença
- Nenhuma mudança de comportamento no sistema; testes seguem em 32

- [ ] Atualizar as capturas quando o visual mudar

## Fase 9: Crie o seu poder e Licença Hunter

Duas entregas pedidas juntas: um construtor para o Hatsu e o processo de feitos, que estava fora do MVP. Feito em 17/10/2026.

### Crie o seu poder

O Hatsu gerado é um ponto de partida; agora a pessoa também pode montar o próprio poder e dar nome a ele. O construtor abre pela página inicial ou pelo botão "Personalizar este poder" na carta do Hatsu, que já preenche as peças.

| Peça | Opções | Efeito na avaliação |
| --- | --- | --- |
| Seu tipo | 6 tipos (vem do quiz quando há jornada) | base da eficiência |
| Categoria | 6 tipos | eficiência = afinidade pelo hexágono (100, 80, 60, 40%); Especialização só para especialistas |
| Forma | arma ou objeto, criatura, corpo, disparo, campo, regra | +15 de potência quando é natural para a categoria |
| Origem | 12 vivências do Hatsu, opcional | só descrição |
| Gatilho | tocar, dizer o nome, olhar nos olhos, ferido, ritual, sempre ativo | "sempre ativo" gera um aviso de gasto de aura |
| Votos | os 6 votos do Hatsu, até 3 | +6 de potência por ponto de peso; risco baixo, médio (3+) ou alto (5+) |
| Nome e descrição | texto livre e opcional (40 e 200 caracteres) | sem nome, recebe um nome sugerido; sem descrição, o site escreve uma a partir das peças |

O nome e a descrição vão no próprio link (`#/poder/<código>/<nome>/<descrição>`); o site não guarda nada.

### Licença Hunter

**Dados novos no ETL.** O campo `occupation` da infobox diz se o personagem é Hunter, qual a especialidade e quantas estrelas tem (ex.: Ging, "Ruins Hunter (Double-Star)"). A regra está em `etl/hunter.mjs`, com testes a partir de casos reais. Resultado: 89 Hunters, 30 com especialidade e 14 com estrelas. As dezenas de especialidades da wiki, quase todas com um ou dois membros, viraram 7 grupos:

| Especialidade no quiz | Especialidades da wiki |
| --- | --- |
| Lista Negra | Blacklist, Crime, Terrorist, Poacher, Problem |
| Gourmet | Gourmet |
| Tesouros e Ruínas | Ruins, Treasure, Stone, Paleograph, Jackpot, Card |
| Bestas e Mares | Beast, Unidentified Beast, Dino, Cute, Botanical, Sea |
| Doenças | Disease, Virus, Poison |
| Informação | Hacker, Lost |
| Música | Music |

O ETL também passou a rodar no Windows: a checagem de "arquivo principal" comparava com `file://` + caminho, o que não bate com barras invertidas. Os retratos agora cobrem os 610 personagens (574 têm imagem), para incluir Hunters e membros de organizações.

**Fluxo.** Seis passos: marcar os feitos (21, em "Sua trajetória" e "O que você já fez"), escolher a caçada que mais atrai, três perguntas de organização e o nome no cartão (opcional, só no link). Os feitos da área e as opções aparecem embaralhados, para a ordem não denunciar a especialidade.

**Regras.** Especialidade pela soma dos feitos de cada área (conquista vale 2) mais 2 para a caçada escolhida, que também desempata. Estrelas pela regra da Associação, simplificada:

| Nível | Exige |
| --- | --- |
| Licença | uma prova difícil, o Exame Hunter; sem ela, "Aspirante a Hunter" |
| 1 estrela | licença + uma conquista de peso na especialidade ou um prêmio |
| 2 estrelas | 1 estrela + liderou algo + formou alguém que se destacou |
| 3 estrelas | 2 estrelas + conquistas em mais de uma área |

Organização: a mais escolhida entre Associação Hunter, Zodíaco, Expedição de Beyond Netero, Guarda Real de Kakin, Família Zoldyck e Trupe Fantasma.

**Resultado.** Um cartão de licença com emblema próprio (hexágono, H e ×), as estrelas e o que falta para a próxima, um troféu por feito com o paralelo na obra (ex.: "Como o Gon, que passou no Exame Hunter aos 12 anos"), os Hunters reais da especialidade e até 8 membros da organização. Vindo do Hatsu, o cartão mostra também o tipo e o nome do Hatsu.

**Jornada.** Quiz → Hatsu → licença ou poder. Cada link carrega as respostas anteriores (`#/licenca/<código>/<nome>/<versão>/<quiz>/<Hatsu>`), e as telas recalculam o tipo e o Hatsu a partir delas.

**Testes.** 11 novos (7 da licença, 4 do poder): leitura da ocupação, aspirante, cada nível de estrela, especialidade e desempate, organização, códigos dos links, personagens citados existem na base, eficiência, bloqueio da Especialização e potência. Total: 43 testes.

- [x] Testado no navegador: feitos pela jornada do Killua até o cartão (2 estrelas, Informação, Associação Hunter), construtor preenchido pelo Hatsu e carta do poder, inclusive a 375 px
- [x] Textos dos 21 feitos e dos paralelos revisados pelo Samuel (17/10/2026)
- [x] Decidido: o nome no cartão continua indo no link
- [x] Capturas da licença e do construtor no README (`docs/licenca.png` e `docs/criar-poder.png`), feitas no site publicado com as imagens da Fandom bloqueadas, como as anteriores

## Fase 10: nomes dos Hatsus

Os 72 nomes em português soavam como tradução literal ("Corrente Viva", "Fio Condutor"). Na obra, os Hatsus têm nomes em inglês, japonês e referências à cultura pop: Bungee Gum, Chain Jail, Hakoware, Deep Purple (a banda), Doctor Blythe (a boneca), Godspeed. Os nomes novos seguem esse estilo, com várias línguas e referências. Feito em 17/10/2026.

| Língua ou fonte | Exemplos |
| --- | --- |
| Japonês | Raijin, Kongōshin, Kintsugi, Bunraku, Raku, Tatara, Takagari, Butsudan, Chokin, Hanabi |
| Latim | Plus Ultra, Alea Iacta Est, Deus ex Machina, Ex Cathedra, Compassio, Scientia Potentia Est |
| Alemão | Kugelblitz, Zugzwang, Leitmotiv |
| Francês e italiano | Mise en Scène, Déjà Vu, Triage, Fortissimo, Quattro Stagioni |
| Mitologia | Argus, Atlas, Hephaestus, Asclepius (grega), Agni (védica) |
| Música, livros e cinema | Eye of the Tiger, Ace of Spades, Poppy Field (O Mágico de Oz), Babette's Feast |
| Outras | Royal Flush, Skrik (norueguês), Ofrenda (“oferenda” em espanhol), Pranayama (sânscrito), sudo e Ctrl+Z (computação) |

Cada Hatsu agora tem três campos: nome, efeito e a origem do nome, que aparece em itálico logo abaixo do nome na carta (ex.: "Kintsugi: a arte japonesa de consertar cerâmica quebrada com ouro"). Um teste novo garante que os 72 nomes são diferentes entre si. Total: 44 testes.

**Revisão do Samuel (17/10/2026).** 22 Hatsus mudaram:

- Parecidos demais com poderes da obra ganharam efeito próprio: os fios da Machi (agora Raku, argila), a antena do Shalnark (sudo agora comanda só máquinas), a roleta do Kite (Royal Flush), o livro do Chrollo (Mise en Scène), as correntes e o juramento do Kurapika (Butsudan e Déjà Vu), o Hakoware do Knuckle (Chokin), as cópias do Kortopi (Dōgu), a massagem da Biscuit (Plaster of Paris), o portal do Leorio (Triage), o Doctor Blythe da Neferpitou (Compassio), a fumaça do Morel (Tatara), a dor que vira calor do Feitan (Salamander), as abelhas da Ponzu (Takagari), o coração da Melody (Leitmotiv e Fortissimo), o Bungee Gum do Hisoka (Wild Card) e o Godspeed do Killua (Raijin agora salta de alvo em alvo).
- Referências trocadas por outras mais concretas, da cultura e da história reais: Dolittle virou Takagari (falcoaria japonesa), Akashic Notes virou Atlas.
- Quattro Stagioni ganhou a quarta estação (outono); Stradivarius ganhou um efeito mais claro; a origem de Ofrenda agora explica que é “oferenda” em espanhol.

- [x] Nomes e origens revisados em `conteudo/hatsu.mjs`

## Correção: retratos no quiz (17/10/2026)

**Problema relatado.** No celular, a imagem do membro que inspira a pergunta não aparecia; no computador, demorava a aparecer.

**Causas.**

1. Bug no componente `Retrato`: depois de uma falha, ele guardava "falhou" e não tentava mais. Como o mesmo componente é reaproveitado de uma pergunta para a outra, todas as perguntas seguintes ficavam com as iniciais.
2. A Fandom às vezes responde 403 a pedidos de imagem sem a origem do site, e o site pedia as imagens sem ela (`referrerPolicy="no-referrer"`). Nos testes com curl, o mesmo endereço deu 403 sem origem e 200 com a origem do GitHub Pages.
3. Cada imagem só começava a baixar quando a pergunta aparecia (carregamento preguiçoso), daí a demora.

**Correção.**

- A falha vale só para aquele endereço; com outro personagem, o retrato tenta de novo.
- Na primeira falha, uma nova tentativa com outro endereço (`&tentativa=1`); as iniciais só aparecem se falhar duas vezes.
- O site volta a mandar a origem (padrão do navegador), e o `index.html` abre a conexão com o CDN da Fandom antes (`preconnect`).
- Ao abrir o quiz, os retratos das 13 ou 12 perguntas são baixados de uma vez, e o da pergunta atual tem prioridade alta.

- [x] Testado a 375 px: as 13 imagens da Trupe baixam na primeira pergunta; uma falha simulada tenta de novo e carrega; com duas falhas aparecem as iniciais, e a pergunta seguinte volta a mostrar a imagem
- [x] Confirmado pelo Samuel no celular, no site publicado (17/10/2026)

## Fase 11: nome do poder opcional (17/10/2026)

No "Crie o seu poder", o nome deixou de ser obrigatório. Sem nome, o poder recebe o nome do Hatsu da vivência escolhida na categoria do poder (ex.: trabalho manual + Especialização = Kintsugi), e a carta mostra a origem do nome logo abaixo, como no Hatsu. Sem vivência, as peças escolhem uma, sempre a mesma para as mesmas peças. O campo mostra antes qual será o nome sugerido.

Regra em `motor/poder.mjs` (`nomeSugerido`), com 1 teste novo. Total: 45 testes.

- [x] Testado no navegador: carta gerada sem nome sai como "Raiken", com a origem

## Fase 12: estilo parecido e trilha sonora (17/10/2026)

**Quem tem um estilo parecido.** A carta do poder criado mostra o Hatsu da obra mais parecido, com o retrato do personagem. Mostra também o que os dois têm em comum, onde o poder se afasta e mais dois parecidos. Os Hatsus da obra estão em `conteudo/estilos.mjs`, descritos com as mesmas peças do construtor: categoria, forma, gatilho e votos. São 39 Hatsus de 36 personagens, com todos os tipos representados. O gatilho fica vazio ("à vontade") quando o Hatsu não depende de um.

Regra em `motor/poder.mjs` (`estilosParecidos`):

| Em comum | Pontos |
| --- | --- |
| Categoria | 3 |
| Forma | 2 |
| Gatilho | 1 |
| Cada voto | 1 |
| O tipo do usuário é o do personagem | 1 |

Empate fica com a ordem do arquivo. Um personagem com vários Hatsus (Kurapika, Genthru) aparece uma vez só, pelo mais parecido.

**Trilha sonora.** Um botão fixo no canto abre o player do Spotify com faixas da trilha oficial do anime de 2011 (Yoshihisa Hirano, VAP). Cada situação tem a sua faixa:

| Tela | Faixa |
| --- | --- |
| Início e telas sem faixa própria | The World of Adventurers |
| Créditos | Kujirato Yori |
| Quiz da Trupe | Riot |
| Resultado e Hatsu da Trupe | Genei no Banka |
| Quiz do Zodíaco | Mystic Land |
| Resultado e Hatsu do Zodíaco | Hunter yo Eien Nare! |
| Feitos | Hunter ☆ March |
| Licença | Yume wo Oikakete |
| Crie o seu poder | Ikkiuchi! |

O player usa a iFrame API do Spotify. Quando a pessoa troca de tela com a música tocando, a faixa nova entra no lugar sem recarregar o player. A API só é carregada no primeiro clique, e esconder o player não para a música. Sem conta do Spotify conectada, o player toca uma prévia de cada faixa. Os créditos ganharam uma seção sobre a trilha.

**Testes.** 4 novos: os estilos existem na base com o mesmo tipo e peças válidas, o caso do Kurapika, o caso do Kastro (clone fora do próprio tipo) e todas as categorias com alguém, sem repetir personagem. Total: 49 testes.

- [x] Testado no navegador: carta com Materialização + objeto + votos de alvo e vida mostra Kurapika (Chain Jail), Shizuku e Kortopi
- [x] Testado no navegador: o player abre com a faixa da tela, troca para Riot ao entrar no quiz da Trupe e, aberto, não cobre os botões a 375 px
- [x] 39 Hatsus de `conteudo/estilos.mjs` revisados pelo Samuel (17/10/2026)
- [x] Faixas de cada tela revisadas pelo Samuel (17/10/2026); trocadas por regras na fase 13

## Correção: trilha que parava (17/10/2026)

**Problema relatado.** Era preciso clicar para o som começar, e a faixa não mudava sozinha: a cada tela era preciso clicar de novo.

**Causas.**

1. Abrir a trilha só carregava o player; o play ficava por conta da pessoa.
2. "Esconder trilha" usava `display: none`. Escondido assim, o player do Spotify parava de responder depois da troca de faixa e ficava mudo.
3. O play era pedido logo depois de trocar a faixa, antes de a faixa nova terminar de carregar.
4. Sem conta do Spotify conectada, cada faixa é uma prévia de uns 25 s. Quando acabava, o player parava.

**Correção.**

- O clique que abre a trilha já começa a tocar.
- Escondido, o player só sai da vista e continua renderizado.
- A troca de faixa espera o aviso "ready" do Spotify e só então dá o play, se a música estava tocando.
- Quando a faixa termina, ela recomeça. Uma pausa feita pela pessoa no meio da faixa é respeitada.

- [x] Testado no navegador: abrir a trilha toca sem outro clique; com o player escondido, a troca para o quiz do Zodíaco carregou Mystic Land e continuou tocando; no fim da prévia, a faixa recomeçou sozinha
- [ ] Confirmar no celular, no site publicado

## Fase 13: regras da trilha sonora (17/10/2026)

**Pedido.** A faixa não pode parecer aleatória. Quem é da Família Zoldyck não deve ouvir uma música alegre, e quem é da Trupe não deve ouvir a música dos Zoldyck. A faixa tem que seguir os personagens semelhantes e o Nen de cada momento, inclusive nos feitos.

**Regra.** Cada tela diz ao player o que está em foco, e o motor escolhe a faixa do mais específico para o mais geral:

1. **Personagem com faixa própria:** o primeiro dos personagens em foco cujo nome ou marca está no título de uma faixa.
2. **Grupo do personagem:** se nenhum tem faixa própria, a faixa do grupo do primeiro que tem grupo.
3. **Organização ou versão:** a da licença, ou a versão do quiz (Trupe ou Zodíaco).
4. **Momento da tela:** sem personagem nem grupo, a faixa do momento; por fim, a do início.

| Tela | O que está em foco |
| --- | --- |
| Quiz | o membro que inspira a pergunta: a faixa muda a cada pergunta |
| Resultado | os membros da versão com o mesmo tipo de Nen |
| Perguntas do Hatsu | a versão (faixa de pergunta) |
| Carta do Hatsu | o personagem de referência |
| Feitos, trajetória | o paralelo na obra do último feito marcado (ex.: prova difícil → Gon) |
| Feitos, caçada | a espreita da presa |
| Feitos, organização | uma faixa só, “Nakama to Iu Koto.”; reagir a cada opção denunciaria a organização dela, que a pergunta esconde de propósito |
| Licença | a organização do cartão |
| Crie o seu poder | montar: poder latente; carta: o personagem de estilo mais parecido |

**Faixas.** Todas foram escolhidas pelo título, com a tradução da Hunterpedia, nos três volumes da trilha oficial.

| Nível | Quem ou o quê | Faixa | Título |
| --- | --- | --- | --- |
| Personagem | Killua | Ginpatsu no Shōnen | “O garoto de cabelo prateado” |
| Personagem | Kurapika | Hiiro no Hitomi no Aika | “O lamento dos olhos escarlates” |
| Personagem | Leorio | All I Need Is MONEY! | o motivo que ele dá no Exame |
| Personagem | Gon | Go on, Gon! | “Vai em frente, Gon!” |
| Personagem | Hisoka | Kijutsushi no Baire | “A dança do mágico” |
| Personagem | Chrollo | Gyakujūji no Otoko | “O homem da cruz invertida” |
| Personagem | Nobunaga | Iai no Kyōjin | “O louco do iaidō” |
| Personagem | Uvogin | Sono Kyōkan, Ryoryoku Zetsurin | “Esse bandido, de força sem igual” |
| Personagem | Ging | Chichi no Senaka | “As costas do meu pai” |
| Personagem | Netero | Legend of the Martial Artist | “A lenda do artista marcial” |
| Personagem | Meruem | Elegy of the Dynast | “Elegia do soberano” |
| Personagem | Genthru | Who’s the Bomber? | o apelido dele em Greed Island |
| Grupo | Trupe Fantasma | Genei no Banka (membros), Kumo no Canzone (perguntas do Hatsu), Requiem Aranea (resultado e licença) | “A elegia do fantasma”, “A canção das aranhas”, “Réquiem da aranha” |
| Grupo | Família Zoldyck | Ansatsu Ikka no Yakata | “A mansão da família de assassinos” |
| Grupo | Zodíaco | Hunter yo Eien Nare! | “Que você seja Hunter para sempre!” |
| Grupo | Associação Hunter (inclui os Hunters com licença sem grupo mais próprio) | Hunter ☆ March | “Marcha dos Hunters” |
| Grupo | Expedição de Beyond Netero | Beyond the Seas | “Além dos mares” |
| Grupo | Guarda Real de Kakin | Kōkai | “Viagem por mar”, como a do navio de Kakin |
| Grupo | Guarda Real das Formigas (Neferpitou, Shaiapouf, Menthuthuyoupi) | In the Palace - Agitato | “No palácio” |
| Grupo | Formigas Quimera (Welfin, Ikalgo, Cheetu, Leol, Colt) | Soldier Ants | “Formigas soldado” |
| Grupo | Greed Island (Genthru, Razor, Biscuit) | G・I Theme | o tema de Greed Island |
| Momento | Início | The World of Adventurers | “O mundo dos aventureiros” |
| Momento | Feitos: trajetória sem feito com paralelo | Yume wo Oikakete | “Correndo atrás de um sonho” |
| Momento | Feitos: caçada | Koshitantan... | “Espreitando a presa...” |
| Momento | Feitos: organização | Nakama to Iu Koto. | “Isso que chamam de companheiros.” |
| Momento | Feitos: nome no cartão | Hunter ☆ Parade | “Desfile dos Hunters” |
| Momento | Crie o seu poder: montar | Latent Power | “Poder latente” |
| Momento | Crie o seu poder: carta sem personagem com faixa | Realized Capacity | “Capacidade realizada” |
| Momento | Créditos | Kujira-tō Yori | “Da Ilha Baleia” |

Essas regras substituem a tabela da fase 12: Riot, Mystic Land e Ikkiuchi! saíram, porque o título delas não liga a nenhum personagem, grupo ou momento.

**Onde fica.** Faixas, personagens e grupos em `conteudo/trilha.mjs`; a regra em `motor/trilha.mjs` (`faixaDaSituacao`); cada tela declara o foco com `useFocoDaTrilha` (`web/src/lib/trilha.js`). O player mostra a faixa, a tradução e o porquê (ex.: “Tocando Iai no Kyōjin · tema de Nobunaga Hazama”).

**Formigas Quimera.** Antes desta fase, elas só apareciam como referência: Neferpitou no Hatsu; Neferpitou, Shaiapouf, Menthuthuyoupi e Welfin no estilo parecido; e os personagens com tipo na lista do resultado. Agora também têm faixa: o Rei, a Guarda Real e os soldados. Ainda não têm organização na licença nem versão do quiz. Na base, o campo de afiliação delas está vazio, então o ETL ainda não sabe quem é Formiga, e a lista do grupo foi escrita à mão.

**Testes.** `test/trilha.test.mjs` tem 8 testes: faixas válidas e sem repetição; personagens das regras existem na base, cada um num grupo só; toda pergunta do quiz tem a faixa do membro ou do grupo dele; licença Zoldyck e Trupe; resultado e Hatsu pelo personagem semelhante; Formigas Quimera; feitos; telas sem foco. Total: 57 testes.

- [x] Testado no navegador: no quiz da Trupe, a faixa muda a cada pergunta (Chrollo, Nobunaga e depois Genei no Banka para Feitan e Machi); nos feitos, marcar a prova difícil toca o tema do Gon e marcar a sobrevivência toca o do Killua; caçada e organização com as faixas delas; carta do poder parecida com o Kurapika toca o tema dele, a 375 px
- [x] Faixas, traduções e grupos de `conteudo/trilha.mjs` revisados pelo Samuel (17/10/2026)
- [x] Validado pelo Samuel no navegador, na jornada inteira: quiz da Trupe (a faixa muda por membro), resultado de Especialização com o tema do Chrollo, Hatsu com o tema do Killua, feitos (Gon, caçada, organização sem denunciar a opção, nome), licença Zoldyck, poder com o tema do Gon, créditos e quiz do Zodíaco (Kurapika, Zodíaco, Leorio)
- [ ] Decidir como as Formigas Quimera entram (organização na licença, versão do quiz ou as duas)

## Correção: player adaptável e links sem "#" (17/10/2026)

**Problemas relatados.**

1. No computador (Chrome, Edge, Firefox, Brave) e no Android do Samuel, a trilha só tocava com um toque no play e não trocava sozinha. No celular do irmão dele, funcionava.
2. No notebook do irmão, um link compartilhado deu 404.

**Causas.**

1. O som toca dentro do player do Spotify, que é um iframe. A maioria dos navegadores só deixa um iframe começar o som depois de um toque dentro dele; o clique no botão "Trilha sonora" do site não conta. Trocar de faixa recarrega o player, e o toque se perde. O navegador de testes do Claude não tem essa regra, e por isso os testes anteriores passaram.
2. O site navega por "#" (`.../quiz-hxh/#/poder`). Sem o "#" (`.../quiz-hxh/poder`), o GitHub Pages responde 404. Isso acontece quando alguém digita o endereço ou quando um aplicativo corta o "#" do link.

**Correção.**

- O player se adapta ao navegador. Ele pede o play e espera até 6 s. Se a música começa, segue trocando sozinho de faixa a cada tela.
- Se não começa, o navegador bloqueou: o painel avisa "aperte ▶ no player" e, dali em diante, não interrompe a música ao mudar de tela. Mostra "Faixa desta tela" com o botão "Tocar esta", e a troca fica a um toque.
- No fim da faixa, o player volta ao início sem recarregar (`seek` e `resume`), e assim o toque já dado continua valendo.
- O player ignora avisos atrasados da faixa anterior, que antes apagavam o aviso de toque.
- `web/public/404.html` leva qualquer endereço sem "#" para o mesmo caminho com "#" (ex.: `.../quiz-hxh/poder` → `.../quiz-hxh/#/poder`).

- [x] Testado no navegador: com o bloqueio simulado, o aviso aparece, o toque no player começa a música, a troca de tela mantém a música e mostra "Tocar esta", e o toque troca a faixa; sem bloqueio, começa e troca sozinho; no fim da prévia, a faixa recomeça sem recarregar
- [ ] Confirmar no celular e no computador do Samuel e do irmão, no site publicado
- [ ] Confirmar que `.../quiz-hxh/poder` redireciona para `.../quiz-hxh/#/poder` no site publicado

## Análise de causa raiz: trilha que não começa nem troca sozinha (17/10/2026)

**Sintoma.** No Opera (computador do Samuel e celular do irmão), a trilha quase sempre começa e troca sozinha. No Brave, não começa e pede um clique a cada tela. O pedido é que a música comece ao entrar no site e troque sozinha em qualquer navegador.

**Por quês.**

1. O Brave não toca sem clique porque o navegador bloqueia som que a pessoa não pediu.
2. O clique nos botões do site não conta porque o som toca dentro do player do Spotify, uma página de outro site embutida na nossa. Chrome e Opera deixam o site passar a permissão para o player (`allow="autoplay"`); o Brave pergunta ou bloqueia site por site e não passa.
3. Cada tela pede um clique novo porque o Spotify recarrega o player inteiro para trocar de faixa, e o clique dado pertencia ao player antigo.
4. Não dá para trocar sem recarregar: a API do Spotify não tem comando para isso.
5. Não dá para tocar a música direto da nossa página porque seria preciso hospedar os arquivos, e a trilha tem direitos autorais.

**Causas raiz.**

1. **Regra dos navegadores (não muda):** nenhum navegador deixa um site começar o som antes do primeiro toque na página. O mais perto de "começar ao entrar" é começar no primeiro clique em qualquer lugar.
2. **Arquitetura (pode mudar):** a música mora num player de terceiro que se recarrega a cada faixa.
3. **Teste (pode mudar):** o navegador de testes do Claude não aplica a regra de autoplay; ele só simula. A validação real é no navegador do Samuel.

**Opções.**

| Opção | Começa no primeiro clique | Troca sozinha no Brave | Faixa inteira | Pode |
| --- | --- | --- | --- | --- |
| A. Spotify, começando no primeiro clique em qualquer lugar | Chrome e Opera, sim; Brave, não | não | não (prévia sem conta) | sim |
| B. Player do YouTube com os envios oficiais, trocando o vídeo no mesmo player | provavelmente | provavelmente | sim | sim, se houver envios oficiais que permitam incorporar |
| C. Arquivos de música no próprio site | sim | sim | sim | não: a trilha oficial não pode ser copiada |

**Decisão.** Opção A agora; depois, um teste da opção B para o Samuel avaliar no Brave.

**Opção A, feita.**

- A música começa no primeiro clique ou tecla em qualquer lugar do site, com o painel fechado. Antes disso, nada é pedido ao Spotify.
- Um botão de silenciar (🔊/🔇) fica sempre ao lado de "Trilha sonora". Silenciar pausa a música, e a escolha fica guardada no aparelho: com o som desligado, os cliques no site não iniciam nada. Ligar de novo volta a tocar.
- Onde o navegador bloqueia, o botão da trilha passa a dizer "Toque para ouvir" e abre o painel com o player.

- [x] Testado no navegador: o clique em "Trupe Fantasma" começou o tema do Chrollo com o painel fechado; silenciar pausou e ficou guardado; depois de recarregar, cliques não pediram nada ao Spotify; ligar o som voltou a tocar
- [ ] Confirmar no Opera e no Brave do Samuel
- [ ] Teste da opção B (YouTube) para avaliar no Brave: página `web/public/teste-trilha.html`, publicada em `.../quiz-hxh/teste-trilha.html`, fora do menu do site. Usa três faixas do canal oficial "Yoshihisa Hirano - Topic" (The World of Adventurers, Ansatsu Ikka no Yakata, Requiem Aranea), que aceitam ser incorporadas; o player troca o vídeo sem se recarregar e mostra um registro do que aconteceu
