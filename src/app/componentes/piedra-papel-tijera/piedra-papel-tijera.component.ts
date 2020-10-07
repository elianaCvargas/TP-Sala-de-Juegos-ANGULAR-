import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Documento } from 'src/app/clases/documento';
import { EstadisticaJugador } from 'src/app/clases/estadistica-jugador';
import { Ranking } from 'src/app/clases/Ranking';
import { JuegosEnum } from 'src/app/enum/juegosEnum';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.scss'],
})
export class PiedraPapelTijeraComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<
    JuegoPiedraPapelTijera
  > = new EventEmitter();

  nuevoJuego: JuegoPiedraPapelTijera;
  Mensajes: string;
  ocultarVerificar: boolean;
  ocultarSeleccion: boolean;
  seleccionIAGenerada: boolean;
  seleccionIngresada: boolean;
  esGanador: boolean = false;
  esFinJuego: boolean = false;
  public email: string;
  public docRanking: Documento<Ranking>;
  public docJugador: Documento<EstadisticaJugador>;
  public puntajeInicial: number = 50;

  constructor(private juegosService: JuegoServiceService) {
    this.nuevoJuego = new JuegoPiedraPapelTijera('Nombre', false);
    console.info('numero Secreto:', this.nuevoJuego.seleccionIA);
    this.ocultarVerificar = false;
    this.ocultarSeleccion = false;
    this.esGanador = false;
    this.esFinJuego = true;
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
  }

  generarseleccion() {
    this.nuevoJuego.fecha = new Date();
    this.nuevoJuego.jugador = this.email;
    this.nuevoJuego.generarseleccion();
    this.seleccionIAGenerada = true;
    this.ocultarSeleccion = false;
    this.esFinJuego = false;

    this.nuevoJuego.seleccionIngresada = 0;
    this.nuevoJuego.seleccionNombre = '';
  }

  seleccionarOpcion(seleccion: number) {
    this.nuevoJuego.seleccionIngresada = seleccion;
    this.ocultarSeleccion = true;
    this.nuevoJuego.seleccionNombre =
      seleccion === 1 ? 'Piedra' : seleccion === 2 ? 'Papel' : 'Tijera';
  }

  verificar() {
    this.ocultarVerificar = true;
    console.info('resultado juego:', this.nuevoJuego.gano);

    if (this.nuevoJuego.verificar()) {
      this.enviarJuego.emit(this.nuevoJuego);
      this.esGanador = true;
      this.MostarMensaje('Genio, capo de los dioses!!!', this.esGanador);
      this.nuevoJuego = new JuegoPiedraPapelTijera('Nombre', false);
      this.juegosService
        .getRankingByGameAndPlayer(this.nuevoJuego.nombre, this.email)
        .subscribe((data) => {
          this.docRanking = data;
          this.docRanking.data.puntaje += this.puntajeInicial;
          this.juegosService.update_Ranking(this.docRanking);
        });

      this.juegosService
        .getEstadisticaJugadorByEmailAndGame(this.email, JuegosEnum.Piedra)
        .subscribe((data) => {
          this.docJugador = data;
          this.docJugador.data.cantGanados++;
          this.juegosService.update_Jugador(this.docJugador);
        });
    } else {
      this.enviarJuego.emit(this.nuevoJuego);
      this.esGanador = false;
      this.MostarMensaje(
        'Lastima, te falto aceitar esa suerte',
        this.esGanador
      );
      this.nuevoJuego = new JuegoPiedraPapelTijera('Nombre', false);
      this.juegosService
        .getEstadisticaJugadorByEmailAndGame(this.email, JuegosEnum.Piedra)
        .subscribe((data) => {
          this.docJugador = data;
          this.docJugador.data.cantPerdidos++;
          this.juegosService.update_Jugador(this.docJugador);
        });
    }

    this.nuevoJuego.seleccionIA = 0;
    console.info('resultado juego:', this.nuevoJuego.gano);
    this.esFinJuego = true;
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
