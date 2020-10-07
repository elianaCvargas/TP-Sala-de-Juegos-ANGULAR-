import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Documento } from 'src/app/clases/documento';
import { EstadisticaJugador } from 'src/app/clases/estadistica-jugador';
import { Ranking } from 'src/app/clases/Ranking';
import { JuegosEnum } from 'src/app/enum/juegosEnum';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
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
  public email: string;
  public docRanking: Documento<Ranking>;
  public docJugador: Documento<EstadisticaJugador>;
  public puntajeInicial: number = 6;

  constructor(private juegosService: JuegoServiceService) {
    this.nuevoJuego = new JuegoAhorcado('Ahorcado', false);
    console.info('palabra secreta:', this.nuevoJuego.palabraSecreta);
    this.ocultarVerificar = false;
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
  }

  generarpalabra() {
    this.nuevoJuego.generarpalabra();
    this.nuevoJuego.fecha = new Date();
    this.nuevoJuego.jugador = this.email;
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
      this.nuevoJuego.palabraSecreta = '';
      this.esGanador = true;
      this.palabraSecretaGenerada = false;
      this.nuevoJuego.resetpalabra();
      this.nuevoJuego = new JuegoAhorcado('Ahorcado', false);
      this.juegosService
      .getRankingByGameAndPlayer(this.nuevoJuego.nombre, this.email)
      .subscribe((data) => {
        this.docRanking = data;
        this.docRanking.data.puntaje += this.puntajeInicial - this.contador;
        this.juegosService.update_Ranking(this.docRanking);
      });

    this.juegosService
      .getEstadisticaJugadorByEmailAndGame(this.email, JuegosEnum.Ahorcado)
      .subscribe((data) => {
        this.docJugador = data;
        this.docJugador.data.cantGanados++;
        this.juegosService.update_Jugador(this.docJugador);
      });
    } else {
      let mensaje: string;

      if (!this.nuevoJuego.letraAcertada) {
        this.contador++;
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
      } else {
        mensaje = 'Has acertado una letra!';
      }
      if (this.contador < 7) {
        this.esGanador = false;
        if (mensaje == 'Has acertado una letra!') {
          this.MostarMensaje('#' + mensaje, true);
        } else {
          this.MostarMensaje('# ' + mensaje, false);
        }
        this.ocultarVerificar = false;
      }
      //if (this.contador >= 7)
      else {
        this.MostarMensaje('Lo siento, numero de intentos finalizados', false);
        this.nuevoJuego.palabraSecreta = '';
        this.enviarJuego.emit(this.nuevoJuego);
        this.esGanador = false;
        this.palabraSecretaGenerada = false;
        this.nuevoJuego.resetpalabra();
        this.nuevoJuego = new JuegoAhorcado('Ahorcado', false);
        this.juegosService
        .getEstadisticaJugadorByEmailAndGame(this.email, JuegosEnum.Ahorcado)
        .subscribe((data) => {
          this.docJugador = data;
          this.docJugador.data.cantPerdidos++;
          this.juegosService.update_Jugador(this.docJugador);
        });
      }
    }

    this.nuevoJuego.letraIngresada = '';
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
    }, 3000);
    console.info('objeto', x);
  }
}
