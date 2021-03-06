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
  document.querySelector(".row-resultados").style.visibility = "visible";

  const textoPreenchimento = document
    .querySelector("#preenchimento")
    .value.toLocaleLowerCase();
  const textoVisualizacao = document
    .querySelector("#visualizacao")
    .value.toLocaleLowerCase();

  let textoResultadoPreenchimento = "";
  let textoResultadoVisualizacao = "";

  limparResultado();

  classesEIds(textoPreenchimento, "preenchimento");
  classesEIds(textoVisualizacao, "visualizacao");

  consoles(textoPreenchimento, "preenchimento");
  consoles(textoVisualizacao, "visualizacao");

  tagsBrs(textoPreenchimento, "preenchimento");
  tagsBrs(textoVisualizacao, "visualizacao");

  tagsParaTeste.forEach((tag, i) => {
    let quantasVezesPreenchimentoArr = pesquisarNoTextoQuantasVezes(
      textoPreenchimento,
      tag
    );

    if (tag == "b") {
      let qtdTagBr = getQtdTagBr(textoPreenchimento);
      let tagBFechamentoQtd = textoPreenchimento.split(`</b>`).length - 1;

      if (qtdTagBr != quantasVezesPreenchimentoArr[0]) {
        textoResultadoPreenchimento = textoResultado(
          [quantasVezesPreenchimentoArr[0] - qtdTagBr, tagBFechamentoQtd],
          tag
        );
      } else {
        textoResultadoPreenchimento = tagBFechamentoQtd
          ? `- Existem ${tagBFechamentoQtd} tags ${tag} de fechamento a mais<br>`
          : "";
      }
    } else {
      textoResultadoPreenchimento = textoResultado(
        quantasVezesPreenchimentoArr,
        tag
      );
    }

    if (textoResultadoPreenchimento)
      escreverResultado(textoResultadoPreenchimento, "preenchimento");

    textoResultadoPreenchimento = "";

    let quantasVezesVisualizacaoArr = pesquisarNoTextoQuantasVezes(
      textoVisualizacao,
      tag
    );

    if (tag == "b") {
      let qtdTagBr = getQtdTagBr(textoVisualizacao);
      let tagBFechamentoQtd = textoVisualizacao.split(`</b>`).length - 1;

      if (qtdTagBr != quantasVezesVisualizacaoArr[0]) {
        textoResultadoVisualizacao = textoResultado(
          [quantasVezesVisualizacaoArr[0] - qtdTagBr, tagBFechamentoQtd],
          tag
        );
      } else {
        textoResultadoVisualizacao = tagBFechamentoQtd
          ? `- Existem ${tagBFechamentoQtd} tags ${tag} de fechamento a mais<br>`
          : "";
      }
    } else {
      textoResultadoVisualizacao = textoResultado(
        quantasVezesVisualizacaoArr,
        tag
      );
    }

    if (textoResultadoVisualizacao)
      escreverResultado(textoResultadoVisualizacao, "visualizacao");
  });

  textoResultadoVisualizacao = "";

  let p = document.querySelector("#resultadoPreenchimento");
  let v = document.querySelector("#resultadoVisualizacao");
  if (!p.innerHTML.length)
    p.innerHTML =
      "<span class='text-success'>- Nenhuma anormalidade com o c??digo</span>";
  if (!v.innerHTML.length)
    v.innerHTML =
      "<span class='text-success'>- Nenhuma anormalidade com o c??digo</span>";
};

copiar = () => {
  let texto = "Preenchimento: \n";
  texto += document.querySelector("#resultadoPreenchimento").innerText + "\n";
  texto += "Visualiza????o: \n";
  texto += document.querySelector("#resultadoVisualizacao").innerText;
  navigator.clipboard.writeText(texto);
};

//-- fun????es
pesquisarNoTextoQuantasVezes = (texto, tag) => {
  let qtsTagAbertura = texto.split(`<${tag}`).length - 1;
  let qtsTagFechamento = texto.split(`</${tag}`).length - 1;

  return [qtsTagAbertura, qtsTagFechamento];
};

getQtdTagBr = (texto) => {
  let qtsTagBr = texto.split(`<br`).length - 1;
  return qtsTagBr;
};

textoResultado = (qtd, tag) => {
  if (qtd[0] > qtd[1])
    return `- Faltando ${qtd[0] - qtd[1]} tags ${tag} de fechamento<br>`;
  if (qtd[0] < qtd[1])
    return `- Existem ${qtd[1] - qtd[0]} tags ${tag} de fechamento a mais<br>`;

  return "";
};

escreverResultado = (texto, tipo) => {
  if (tipo == "preenchimento") {
    let resultado = document.querySelector("#resultadoPreenchimento");
    resultado.innerHTML += texto;
  } else {
    let resultado = document.querySelector("#resultadoVisualizacao");
    resultado.innerHTML += texto;
  }
};

limparResultado = () => {
  let preenchimento = document.querySelector("#resultadoPreenchimento");
  preenchimento.innerText = "";
  let visualizacao = document.querySelector("#resultadoVisualizacao");
  visualizacao.innerText = "";
};

classesEIds = (texto, tipo) => {
  //classes
  let regexClasse = /\.(.*?[a-zA-Z0-9-_ ])\{/g;
  let resultadoRegexClasse = texto.match(regexClasse) || [];

  if (resultadoRegexClasse.length)
    resultadoRegexClasse = resultadoRegexClasse.map((item) => {
      let itemSemPonto = item.replace(".", "");
      let itemSemEspaco = itemSemPonto.replace(" ", "");
      let itemSemChave = itemSemEspaco.replace("{", "");
      return itemSemChave;
    });

  resultadoRegexClasse.forEach((e) => {
    let quantasClasses = texto.split(e).length - 2;
    if (!quantasClasses) {
      if (tipo == "preenchimento") {
        let resultado = document.querySelector("#resultadoPreenchimento");
        resultado.innerHTML += ` - A classe ${e} n??o est?? em uso<br>`;
      } else {
        let resultado = document.querySelector("#resultadoVisualizacao");
        resultado.innerHTML += ` - A classe ${e} n??o est?? em uso<br>`;
      }
    }
  });

  //ids
  let regexId = /\#(.*?[a-zA-Z0-9-_ ])\{/g;
  let resultadoRegexId = texto.match(regexId) || [];

  if (resultadoRegexId.length)
    resultadoRegexId = resultadoRegexId.map((item) => {
      let itemSemCerquilha = item.replace("#", "");
      let itemSemEspaco = itemSemCerquilha.replace(" ", "");
      let itemSemChave = itemSemEspaco.replace("{", "");
      return itemSemChave;
    });

  resultadoRegexId.forEach((e) => {
    let quantosIds = texto.split(e).length - 2;
    if (!quantosIds) {
      if (tipo == "preenchimento") {
        let resultado = document.querySelector("#resultadoPreenchimento");
        resultado.innerHTML += ` - O id  ${e} n??o est?? em uso<br>`;
      } else {
        let resultado = document.querySelector("#resultadoVisualizacao");
        resultado.innerHTML += ` - O id ${e} n??o est?? em uso<br>`;
      }
    }
  });
};

consoles = (texto, tipo) => {
  let arrConsole = texto.split("console.log");

  if (arrConsole.length - 1) {
    if (tipo == "preenchimento") {
      let resultado = document.querySelector("#resultadoPreenchimento");
      if (arrConsole.length - 1 > 1)
        resultado.innerHTML += ` - Retirar os console.log<br>`;
      else resultado.innerHTML += ` - Retirar o console.log<br>`;
    } else {
      let resultado = document.querySelector("#resultadoVisualizacao");
      if (arrConsole.length - 1 > 1)
        resultado.innerHTML += ` - Retirar os console.log<br>`;
      else resultado.innerHTML += ` - Retirar o console.log<br>`;
    }
  }
};

//esta fun????o verificar?? as tags brs
tagsBrs = (texto, tipo) => {
  // let regexBrBarra = /<br(.*?[a-zA-Z0-9-_ ])\/>/g;
  // let regexBr = /<br(.*?[a-zA-Z0-9-_ ])>/g;
  // let resultadoTagBrBarra = texto.match(regexBrBarra) || [];
  // let resultadoTagBr = texto.match(regexBr) || [];
  // console.log(resultadoTagBrBarra, resultadoTagBr);
  // console.log("teste", resultadoTagBr);
  // return resultadoTagBr;
};

/** exemplo de erro

  <style>
    .classeDeExemplo {
      color: red;
    }
    #idDeExemplo {
      color: red;
    }
  </style>
 <p>sadsd</p> 
 <p>sadsd</a>
 <br/>
 <br>
 <br></br><b></b></b><b><b>
 <script>
    console.log("teste");
 </script>

 **/
