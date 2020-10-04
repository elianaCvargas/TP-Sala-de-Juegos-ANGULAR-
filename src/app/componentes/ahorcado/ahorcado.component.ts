import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import { JuegoAhorcado } from '../../clases/juego-ahorcado';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss'],
})
export class AhorcadoComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<JuegoAhorcado> = new EventEmitter();

  nuevoJuego: JuegoAhorcado;
  Mensajes: string;
  contador: number = 0; //vidas
  ocultarVerificar: boolean;
  palabraSecretaGenerada: boolean;
  esGanador: boolean = false;

  constructor() {
    this.nuevoJuego = new JuegoAhorcado('Ahorcado', false, 'username');
    console.info('palabra secreta:', this.nuevoJuego.palabraSecreta);
    this.ocultarVerificar = false;
  }

  ngOnInit() {}

  generarpalabra() {
    this.nuevoJuego.generarpalabra();
    this.palabraSecretaGenerada = true;
    this.contador = 0;
  }

  verificar() {
    this.ocultarVerificar = true;
    console.info('palabra secreta:', this.nuevoJuego.gano);
    this.nuevoJuego.verificarLetra();

    if (this.nuevoJuego.verificar()) {
      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje('Sos un Genio!!!', true);
      this.nuevoJuego.palabraSecreta = "";
      this.esGanador = true;
      this.palabraSecretaGenerada = false;
      this.nuevoJuego.resetpalabra();
    } else {
      let mensaje: string;

      if(!this.nuevoJuego.letraAcertada){
        this.contador++;
      }

      switch (this.contador) {
        case 1:
          mensaje = 'Te quedan 6 intentos, ánimos';
          break;
        case 2:
          mensaje = 'Te quedan 5 intentos, suerte';
          break;
        case 3:
          mensaje = 'Te quedan 4 intentos, Que presión';
          break;
        case 4:
          mensaje = 'Te quedan 3 intentos, hora de llorar';
          break;
        case 5:
          mensaje = 'Te quedan 2 intentos, a muerte súbita';
          break;
        case 6:
          mensaje = 'Te queda el último intento.';
          break;
      }

      this.ocultarVerificar = false;

      if (this.contador >= 7) {
        this.MostarMensaje('Lo siento, numero de intentos finalizados', false);
        this.nuevoJuego.palabraSecreta = "";
        this.enviarJuego.emit(this.nuevoJuego);
        this.esGanador = false;
        this.palabraSecretaGenerada = false;
        this.nuevoJuego.resetpalabra();
      }
    }

    this.nuevoJuego.letraIngresada = "";
    console.info('numero Secreto:', this.nuevoJuego.gano);
  }

  MostarMensaje(mensaje: string, ganador: boolean = false) {
    this.Mensajes = mensaje;
    var x = document.getElementById('snackbar');
    if (ganador) {
      x.className = 'show Ganador';
    } else {
      x.className = 'show Perdedor';
    }
    var modelo = this;
    setTimeout(function () {
      x.className = x.className.replace('show', '');
      modelo.ocultarVerificar = false;
    }, 3000);
    console.info('objeto', x);
  }
}
