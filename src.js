const tagsParaTeste = [
  "p",
  "strong",
  "a",
  "b",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "table",
  "tr",
  "td",
  "th",
  "img",
  "span",
  "div",
  "button",
  "input",
  "form",
  "label",
  "select",
  "option",
  "textarea",
  "link",
  "script",
  "style",
  "head",
  "body",
  "html",
  "canvas",
];

submit = function () {
  const textoPreenchimento = document
    .querySelector("#preenchimento")
    .value.toLocaleLowerCase();
  const textoVisualizacao = document
    .querySelector("#visualizacao")
    .value.toLocaleLowerCase();

  tagsParaTeste.forEach((tag, i) => {
    if (!i) limparResultado();
    let quantasVezesPreenchimentoArr = pesquisarNoTextoQuantasVezes(textoPreenchimento, tag);
    let textoResultadoPreenchimento = textoResultado(quantasVezesPreenchimentoArr, tag);
    escreverResultado(textoResultadoPreenchimento, "preenchimento");

    let quantasVezesVisualizacaoArr = pesquisarNoTextoQuantasVezes(textoVisualizacao, tag);
    let textoResultadoVisualizacao = textoResultado(quantasVezesVisualizacaoArr, tag);
    escreverResultado(textoResultadoVisualizacao, "visualizacao");
  });

};

//-- funções

pesquisarNoTextoQuantasVezes = (texto, tag) => {
  let qtsTagAbertura = texto.split(`<${tag}`).length - 1;
  let qtsTagFechamento = texto.split(`</${tag}`).length - 1;

  return [qtsTagAbertura, qtsTagFechamento];
};

textoResultado = (qtd, tag) => {

  if (qtd[0] > qtd[1])
    return `Faltando ${qtd[0] - qtd[1]} tags <strong>${tag}</strong> de fechamento `;
  if (qtd[0] < qtd[1])
    return `Existem ${qtd[1] - qtd[0]} tags <strong>${tag}</strong> de fechamento a mais `;

  return "";
};

escreverResultado = (texto, tipo) => {
  if (tipo == "preenchimento") {
    let resultado = document.querySelector("#resultadoPreenchimento");
    let p = document.createElement("p");
    p.innerHTML = texto;
    resultado.insertBefore(p, resultado.firstChild);
  } else {
    let resultado = document.querySelector("#resultadoVisualizacao");
    let p = document.createElement("p");
    p.innerHTML = texto;
    resultado.insertBefore(p, resultado.firstChild);
  }
};

limparResultado = () => {
  let preenchimento = document.querySelector("#resultadoPreenchimento");
  preenchimento.innerText = "";
  let visualizacao = document.querySelector("#resultadoVisualizacao");
  visualizacao.innerText = "";
};


/** exemplo de erro

 <p>sadsd</p> 
 <p>sadsd</a> 
 
 */