// Conteúdo autoral do "Crie o seu poder": as peças que a pessoa combina.
// A vivência e os votos vêm de conteudo/hatsu.mjs.

// Forma do poder; "frase" completa "Um poder de <categoria> ..."; "naturais" = categorias em que essa forma sai sem esforço
export const FORMAS = [
  { id: "objeto", nome: "Arma ou objeto", frase: "que se manifesta como um objeto ou uma arma", naturais: ["materializacao", "intensificacao", "manipulacao"] },
  { id: "criatura", nome: "Criatura", frase: "que se manifesta como uma criatura de aura", naturais: ["materializacao", "emissao", "manipulacao"] },
  { id: "corpo", nome: "O próprio corpo", frase: "que age pelo próprio corpo", naturais: ["intensificacao", "transformacao"] },
  { id: "disparo", nome: "Disparo", frase: "que sai como um disparo a distância", naturais: ["emissao", "transformacao"] },
  { id: "campo", nome: "Campo ou área", frase: "que se espalha num campo ao seu redor", naturais: ["emissao", "especializacao"] },
  { id: "regra", nome: "Regra ou contrato", frase: "que impõe uma regra ao alvo", naturais: ["especializacao", "manipulacao", "materializacao"] },
];

export const GATILHOS = [
  { id: "toque", nome: "Ao tocar", frase: "ao tocar o alvo" },
  { id: "nome", nome: "Ao dizer o nome", frase: "quando você diz o nome do golpe" },
  { id: "olhar", nome: "Ao olhar nos olhos", frase: "ao olhar o alvo nos olhos" },
  { id: "ferido", nome: "Quando ferido", frase: "quando você está ferido" },
  { id: "ritual", nome: "Depois de um ritual", frase: "depois de um ritual preparado antes" },
  { id: "sempre", nome: "Sempre ativo", frase: "sem pausa, enquanto você estiver consciente" },
];

// Comentários sobre a construção, à luz da teoria do Nen
export const COMENTARIOS = {
  proprio: "Categoria do seu próprio tipo: aproveitamento máximo da aura.",
  vizinho: "Categoria vizinha no hexágono: rende 80%, um bom equilíbrio.",
  distante: "Categoria longe do seu tipo. Pela teoria da memória do Hisoka, um poder assim ocupa espaço e enfraquece o resto. O Kurapika só conseguiu porque fez votos pesados.",
  forcada: "Essa forma não é a mais natural para essa categoria: funciona, mas pede mais treino.",
  natural: "A forma combina com a categoria, como as correntes do Kurapika na Materialização.",
  semVoto: "Sem votos, o poder fica no nível do seu treino. Uma regra simples já ajuda.",
  votoPesado: "Votos pesados como os do Kurapika: poder enorme, risco alto.",
  sempre: "Sempre ativo gasta aura sem parar, como o Ten mantido o dia inteiro: bom para defesa, cansativo em lutas longas.",
};
