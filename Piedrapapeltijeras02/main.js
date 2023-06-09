class JuegoPiedraPapelTijera {
  constructor() {
    this.instrucciones = document.querySelector("#instrucciones");
    this.contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
    this.contenedorPuntosPC = document.querySelector("#puntos-computadora");
    this.mensaje = document.querySelector("#mensaje");
    this.contenedorGanaPunto = document.querySelector("#gana-punto");
    this.elegiTuArma = document.querySelector("#elegi-tu-arma");
    this.contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
    this.contenedorEleccionPC = document.querySelector("#eleccion-computadora");
    this.botonesArmas = document.querySelectorAll(".arma");
    this.salir = document.querySelector("#salir");
    this.reiniciar = document.querySelector("#reiniciar");
    this.estadisticas = new Estadisticas();

    this.puntosUsuario = 0;
    this.puntosPC = 0;
    this.finJuego = false;

    this.botonesArmas.forEach(boton => {
      boton.addEventListener("click", this.iniciarTurno.bind(this));
    });

    this.reiniciar.addEventListener("click", this.reiniciarJuego.bind(this));

    if (this.salir) {
      this.salir.addEventListener("click", () => {
        this.mostrarEstadisticas();
      });
    }
  }

  iniciarTurno(e) {
    if (this.finJuego) {
      return;
    }

    const eleccionUsuario = e.currentTarget.id;
    let eleccionPC = Math.floor(Math.random() * 3);

    if (eleccionPC === 0) {
      eleccionPC = "piedra🪨";
    } else if (eleccionPC === 1) {
      eleccionPC = "papel📋";
    } else if (eleccionPC === 2) {
      eleccionPC = "tijera✂️";
    }

    if (
      (eleccionUsuario === "piedra🪨" && eleccionPC === "tijera✂️") ||
      (eleccionUsuario === "tijera✂️" && eleccionPC === "papel📋") ||
      (eleccionUsuario === "papel📋" && eleccionPC === "piedra🪨")
    ) {
      this.ganaUsuario();
    } else if (
      (eleccionPC === "piedra🪨" && eleccionUsuario === "tijera✂️") ||
      (eleccionPC === "tijera✂️" && eleccionUsuario === "papel📋") ||
      (eleccionPC === "papel📋" && eleccionUsuario === "piedra🪨")
    ) {
      this.ganaPC();
    } else {
      this.empate();
    }

    this.mensaje.classList.remove("disabled");
    this.contenedorEleccionUsuario.innerText = eleccionUsuario;
    this.contenedorEleccionPC.innerText = eleccionPC;

    if (this.puntosUsuario === 5 || this.puntosPC === 5) {
      if (this.puntosUsuario === 5) {
        this.estadisticas.incrementarGanadasJugador();
      } else {
        this.estadisticas.incrementarGanadasComputadora();
      }

      this.finJuego = true;
      this.reiniciar.classList.remove("disabled");
    }
  }

  ganaUsuario() {
    this.puntosUsuario++;
    this.contenedorPuntosUsuario.innerText = this.puntosUsuario;
    this.contenedorGanaPunto.innerText = "¡Ganaste un punto! 🔥";
  }

  ganaPC() {
    this.puntosPC++;
    this.contenedorPuntosPC.innerText = this.puntosPC;
    this.contenedorGanaPunto.innerText = "¡La computadora ganó un punto! 😭";
  }

  empate() {
    this.contenedorGanaPunto.innerText = "¡Empate! 😱";
  }

  reiniciarJuego() {
    this.reiniciar.classList.add("disabled");
    this.elegiTuArma.classList.remove("disabled");
    this.mensaje.classList.add("disabled");

    this.puntosUsuario = 0;
    this.puntosPC = 0;
    this.finJuego = false;

    this.contenedorPuntosUsuario.innerText = this.puntosUsuario;
    this.contenedorPuntosPC.innerText = this.puntosPC;

    this.instrucciones.innerText = "El primero en llegar a 5 puntos gana.";
  }

  mostrarEstadisticas() {
    const estadisticas = this.estadisticas.getEstadisticas();
    this.instrucciones.innerText = `Estadísticas:\nPartidas ganadas por el jugador: ${estadisticas.jugador}\nPartidas ganadas por la computadora: ${estadisticas.computadora}`;
    this.salir.classList.add("disabled");
  }
}

class Estadisticas {
  constructor() {
    this.jugador = 0;
    this.computadora = 0;
  }

  getEstadisticas() {
    return {
      jugador: this.jugador,
      computadora: this.computadora
    };
  }

  incrementarGanadasJugador() {
    this.jugador++;
  }

  incrementarGanadasComputadora() {
    this.computadora++;
  }
}

const juego = new JuegoPiedraPapelTijera();
