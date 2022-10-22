class Calculo {
  constructor(resultadoAnteriorText, resultadoAtualText) {
    this.resultadoAnteriorText = resultadoAnteriorText;
    this.resultadoAtualText = resultadoAtualText;
    this.clear();
  }

  formatoNum(number) {
    const stringNumero = number.toString();
    const numerosInteiros = parseFloat(stringNumero.split(".")[0]);
    const decimal = stringNumero.split(".")[1];
    let exibicaoCompleta;

    if (isNaN(numerosInteiros)) {
      exibicaoCompleta = "";
    } else {
      exibicaoCompleta = numerosInteiros.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimal != null) {
      return `${exibicaoCompleta}.${decimal}`;
    } else {
      return exibicaoCompleta;
    }
  }

  delete() {
    this.resultadoAtual = this.resultadoAtual.toString().slice(0, -1);
  }

  calcular() {
    let result;

    const _resultadoAnterior = parseFloat(this.resultadoAnterior);
    const _resultadoAtual = parseFloat(this.resultadoAtual);

    if (isNaN(_resultadoAnterior) || isNaN(_resultadoAtual)) return;

    switch (this.operation) {
      case "+":
        result = _resultadoAnterior + _resultadoAtual;
        break;
      case "-":
        result = _resultadoAnterior - _resultadoAtual;
        break;
      case "÷":
        result = _resultadoAnterior / _resultadoAtual;
        break;
      case "*":
        result = _resultadoAnterior * _resultadoAtual;
        break;
      default:
        return;
    }

    this.resultadoAtual = result;
    this.operation = undefined;
    this.resultadoAnterior = "";
  }

  escolha(operation) {
    if (this.resultadoAtual === "") return;

    if (this.resultadoAnterior !== "") {
      this.calcular();
    }

    this.operation = operation;

    this.resultadoAnterior = this.resultadoAtual;
    this.resultadoAtual = "";
  }

  acrescentar(number) {
    if (this.resultadoAtual.includes(".") && number === ".") return;

    this.resultadoAtual = `${this.resultadoAtual}${number.toString()}`;
  }

  clear() {
    this.resultadoAtual = "";
    this.resultadoAnterior = "";
    this.operation = undefined;
  }

  atualizar() {
    this.resultadoAnteriorText.innerText = `${this.formatoNum(
      this.resultadoAnterior
    )} ${this.operation || ""}`;
    this.resultadoAtualText.innerText = this.formatoNum(
      this.resultadoAtual
    );
  }
}

//Area de Resultados
const resultadoAnteriorText = document.querySelector("[data-resultado-anterior]");
const resultadoAtualText = document.querySelector("[data-resultado-atual]");

const calculo = new Calculo(
  resultadoAnteriorText,
  resultadoAtualText
);

//numeros
const numeros = document.querySelectorAll("[data-numeros]");

for (const numero of numeros) {
  numero.addEventListener("click", () => {
    calculo.acrescentar(numero.innerText);
    calculo.atualizar();
  });
}

//operacoes
const operacoes = document.querySelectorAll("[data-operacoes]");
for (const operacao of operacoes) {
  operacao.addEventListener("click", () => {
    calculo.escolha(operacao.innerText);
    calculo.atualizar();
  });
}

//Limpar
const clear = document.querySelector("[data-clear]");

clear.addEventListener("click", () => {
  calculo.clear();
  calculo.atualizar();
});

//Calcular
const igual = document.querySelector("[data-igual]");

igual.addEventListener("click", () => {
  calculo.calcular();
  calculo.atualizar();
});

//Apagar  ultimo numero
const delet = document.querySelector("[data-delete]");

delet.addEventListener("click", () => {
  calculo.delete();
  calculo.atualizar();
});
