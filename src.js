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

  limparResultado();

  classesEIds(textoPreenchimento, "preenchimento");
  classesEIds(textoVisualizacao, "visualizacao");

  consoles(textoPreenchimento, "preenchimento");
  consoles(textoVisualizacao, "visualizacao");

  tagsParaTeste.forEach((tag, i) => {
    let quantasVezesPreenchimentoArr = pesquisarNoTextoQuantasVezes(
      textoPreenchimento,
      tag
    );
    let textoResultadoPreenchimento = textoResultado(
      quantasVezesPreenchimentoArr,
      tag
    );
    if (textoResultadoPreenchimento)
      escreverResultado(textoResultadoPreenchimento, "preenchimento");

    let quantasVezesVisualizacaoArr = pesquisarNoTextoQuantasVezes(
      textoVisualizacao,
      tag
    );
    let textoResultadoVisualizacao = textoResultado(
      quantasVezesVisualizacaoArr,
      tag
    );
    if (textoResultadoVisualizacao)
      escreverResultado(textoResultadoVisualizacao, "visualizacao");
  });

  let p = document.querySelector("#resultadoPreenchimento");
  let v = document.querySelector("#resultadoVisualizacao");
  if (!p.innerHTML.length)
    p.innerHTML =
    "<span class='text-success'>- Nenhuma anormalidade com o código</span>";
  if (!v.innerHTML.length)
    v.innerHTML =
    "<span class='text-success'>- Nenhuma anormalidade com o código</span>";
};

copiar = () => {
  let texto = "Preenchimento: \n";
  texto += document.querySelector("#resultadoPreenchimento").innerText + "\n";
  texto += "Visualização: \n";
  texto += document.querySelector("#resultadoVisualizacao").innerText;
  navigator.clipboard.writeText(texto);
};

//-- funções
pesquisarNoTextoQuantasVezes = (texto, tag) => {
  let qtsTagAbertura = texto.split(`<${tag}`).length - 1;
  let qtsTagFechamento = texto.split(`</${tag}`).length - 1;

  return [qtsTagAbertura, qtsTagFechamento];
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
  let regexClasse1 = /\.(.*?[a-zA-Z\-\_0-9])\ {/g;
  let regexClasse2 = /\.(.*?[a-zA-Z\-\_0-9])\{/g;
  let resultadoRegexClasse1 = texto.match(regexClasse1) || [];
  let resultadoRegexClasse2 = texto.match(regexClasse2) || [];

  let resultadoClasse = resultadoRegexClasse1.concat(resultadoRegexClasse2);
  if (resultadoClasse.length)
    resultadoClasse = resultadoClasse.map((item) => {
      let itemSemPonto = item.replace(".", "");
      let itemSemEspaco = itemSemPonto.replace(" ", "");
      let itemSemChave = itemSemEspaco.replace("{", "");
      return itemSemChave;
    });

  resultadoClasse.forEach((e) => {
    let quantasClasses = texto.split(e).length - 2;
    if (!quantasClasses) {
      if (tipo == "preenchimento") {
        let resultado = document.querySelector("#resultadoPreenchimento");
        resultado.innerHTML += ` - A classe ${e} não está em uso<br>`;
      } else {
        let resultado = document.querySelector("#resultadoVisualizacao");
        resultado.innerHTML += ` - A classe ${e} não está em uso<br>`;
      }
    }
  });

  // ids
  let regexId1 = /\#(.*?[a-zA-Z\-\_0-9])\ {/g;
  let regexId2 = /\#(.*?[a-zA-Z\-\_0-9])\{/g;
  let resultadoRegexId1 = texto.match(regexId1) || [];
  let resultadoRegexId2 = texto.match(regexId2) || [];

  let resultadoId = resultadoRegexId1.concat(resultadoRegexId2);
  if (resultadoId.length)
    resultadoId = resultadoId.map((item) => {
      let itemSemCerquilha = item.replace("#", "");
      let itemSemEspaco = itemSemCerquilha.replace(" ", "");
      let itemSemChave = itemSemEspaco.replace("{", "");
      return itemSemChave;
    });

  resultadoId.forEach((e) => {
    let quantosIds = texto.split(e).length - 2;
    if (!quantosIds) {
      if (tipo == "preenchimento") {
        let resultado = document.querySelector("#resultadoPreenchimento");
        resultado.innerHTML += ` - O id  ${e} não está em uso<br>`;
      } else {
        let resultado = document.querySelector("#resultadoVisualizacao");
        resultado.innerHTML += ` - O id ${e} não está em uso<br>`;
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
      else
        resultado.innerHTML += ` - Retirar o console.log<br>`;
    } else {
      let resultado = document.querySelector("#resultadoVisualizacao");
      if (arrConsole.length - 1 > 1)
        resultado.innerHTML += ` - Retirar os console.log<br>`;
      else
        resultado.innerHTML += ` - Retirar o console.log<br>`;
    }
  }
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
 <script>
    console.log("teste");
 </script>

 **/