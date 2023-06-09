const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const texto = boton.dataset.value || boton.textContent;

    if (pantalla.textContent === "0" && texto !== ".") {
      pantalla.textContent = texto;
    } else {
      pantalla.textContent += texto;
    }
  });
});

class Calculadora {
  constructor() {
    this.num1 = '';
    this.num2 = '';
    this.operador = '';
    this.resultado = 0;
  }

  realizarOperacion() {
    const num1 = Number(this.num1);
    const num2 = Number(this.num2);

    switch (this.operador) {
      case '+':
        this.resultado = num1 + num2;
        break;
      case '-':
        this.resultado = num1 - num2;
        break;
      case '*':
        this.resultado = num1 * num2;
        break;
      case '/':
        this.resultado = num1 / num2;
        break;
      case '^':
        this.resultado = Math.pow(num1, num2);
        break;
      case '//':
        this.resultado = Math.floor(num1 / num2);
        break;
      case '%':
        this.resultado = num1 % num2;
        break;
      case '√':
        this.resultado = Math.sqrt(num2);
        break;
      case '!':
        this.resultado = 1;
        for (let i = 2; i <= num2; i++) {
          this.resultado *= i;
        }
        break;
      case 'div':
        this.resultado = this.calcularDivisores(num2);
        console.log(this.resultado);
        break;
    }
  }
  
  calcularDivisores(numero) {
    const divisores = [];
    for (let i = 1; i <= numero; i++) {
      if (numero % i === 0) {
        divisores.push(i);
      }
    }
    return divisores;
  }

  buscarOperacion(cadena) {
    const regex = /(\d+(\.\d+)?|)([+\-*/^%√!div]{1,3})(\d+(\.\d+)?)/;
    const match = cadena.match(regex);

    if (match) {
      this.num1 = match[1] || '0';
      this.operador = match[3];
      this.num2 = match[4] || '0';

      this.realizarOperacion();

      if (this.operador === 'div') {
        pantalla.textContent = this.resultado.join(', ');
      } else {
        const resultadoFormateado = parseFloat(this.resultado.toFixed(8)).toString();
        pantalla.textContent = resultadoFormateado;
      }
    }
  }

  limpiar() {
    pantalla.textContent = "0";
  }

  borrar() {
    pantalla.textContent = pantalla.textContent.slice(0, -2);
  }
}

const calculadora = new Calculadora();

document.getElementById('c').addEventListener('click', () => {
  calculadora.limpiar();
});

document.getElementById('borrar').addEventListener('click', () => {
  calculadora.borrar();
});

document.getElementById('igual').addEventListener('click', () => {
  const cadena = pantalla.textContent;
  calculadora.buscarOperacion(cadena);
});
