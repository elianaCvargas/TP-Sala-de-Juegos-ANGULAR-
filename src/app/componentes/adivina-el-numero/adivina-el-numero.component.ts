import { DatePipe } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.scss'],
})
export class AdivinaElNumeroComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<JuegoAdivina> = new EventEmitter();

  nuevoJuego: JuegoAdivina;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
  numeroSecretoGenerado: boolean;
  esGanador: boolean = false;
  public email: string;
  public fechaJuego: string;
  constructor(private datePipe: DatePipe) {
    this.nuevoJuego = new JuegoAdivina('Adivina el numero', false);
    console.info('numero Secreto:', this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar = false;
  }

  ngOnInit() {
    this.email = localStorage.getItem("email");
  }

  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.numeroSecretoGenerado = true;
    this.contador = 0;
    this.esGanador = false;
  }

  verificar() {
    this.contador++;
    this.ocultarVerificar = true;
    this.fechaJuego = this.datePipe.transform(new Date, 'yyyy/MM/dd');
    //gano
    if (this.nuevoJuego.verificar()) {
      this.nuevoJuego.fecha = new Date;
      this.nuevoJuego.jugador = this.email;
      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje('Sos un Genio!!!', true);
      this.nuevoJuego.numeroSecreto = 0;
      this.esGanador = true;
      this.nuevoJuego = new JuegoAdivina('Adivina el numero', false);
    }
    //pierdo
    else {
      let mensaje: string;
      switch (this.contador) {
        case 1:
          mensaje = 'No, intento fallido. Animo!';
          break;
        case 2:
          mensaje = 'No,Te estaras Acercando???';
          break;
        case 3:
          mensaje = 'No es, Yo crei que la tercera era la vencida.';
          break;
        case 4:
          mensaje = ' intentos y nada.';
          break;
        case 5:
          mensaje = 'Afortunado en el amor';
          break;

        default:
          mensaje = 'Ya le erraste ' + this.contador + ' veces';
          break;
      }
      if (this.contador < 6) {
        this.esGanador = false;
        this.MostarMensaje(
          '#' +
            this.contador +
            ' ' +
            mensaje +
            ' ayuda:' +
            this.nuevoJuego.retornarAyuda(), false
        );
      } else {
        this.MostarMensaje('Lo siento, numero de intentos finalizados', false);
        this.nuevoJuego.fecha = new Date;
        this.nuevoJuego.jugador = this.email;
        this.enviarJuego.emit(this.nuevoJuego);
        this.nuevoJuego.numeroSecreto = 0;
        this.MostarMensaje('Loser!', false);
        this.esGanador = false;
        this.nuevoJuego = new JuegoAdivina('Adivina el numero', false);
      }
    }
    console.info('numero Secreto:', this.nuevoJuego.gano);
  }

  MostarMensaje(mensaje: string, ganador: boolean) {
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
    }, 2000);
  }
}
