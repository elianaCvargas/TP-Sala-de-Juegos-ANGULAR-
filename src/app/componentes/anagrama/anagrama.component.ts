import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Documento } from 'src/app/clases/documento';
import { EstadisticaJugador } from 'src/app/clases/estadistica-jugador';
import { JuegoAnagrama } from 'src/app/clases/juego-anagrama';
import { JuegoPiedraPapelTijera } from 'src/app/clases/juego-piedra-papel-tijera';
import { Ranking } from 'src/app/clases/Ranking';
import { JuegosEnum } from 'src/app/enum/juegosEnum';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.scss'],
})
export class AnagramaComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<JuegoAnagrama> = new EventEmitter();
  nuevoJuego: JuegoAnagrama;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
  anagramaGenerado: boolean;
  public email: string;
  public docRanking: Documento<Ranking>;
  public docJugador: Documento<EstadisticaJugador>;
  public puntajeInicial: number = 50;

  constructor(private juegosService: JuegoServiceService) {
    this.nuevoJuego = new JuegoAnagrama(false);
    this.ocultarVerificar = false;
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.generarAnagrama();
  }

  generarAnagrama() {
    this.nuevoJuego.jugador = this.email;
    this.nuevoJuego.generarAnagrama();
    this.anagramaGenerado = true;
    this.contador = 0;
  }

  verificar() {
    this.contador++;
    this.ocultarVerificar = true;
    if (this.nuevoJuego.verificar()) {
      this.nuevoJuego.fecha = new Date();
      this.nuevoJuego.gano = true;
      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje('Sos un Genio!!!', true);
      this.nuevoJuego = new JuegoAnagrama();
      this.nuevoJuego.anagrama = '';
      this.juegosService
        .getRankingByGameAndPlayer(this.nuevoJuego.nombre, this.email)
        .subscribe((data) => {
          this.docRanking = data;
          this.docRanking.data.puntaje += this.puntajeInicial;
          this.juegosService.update_Ranking(this.docRanking);
        });

      this.juegosService
        .getEstadisticaJugadorByEmailAndGame(this.email, JuegosEnum.Anagrama)
        .subscribe((data) => {
          this.docJugador = data;
          this.docJugador.data.cantGanados++;
          this.juegosService.update_Jugador(this.docJugador);
        });
    } else {
      this.nuevoJuego.gano = false;
      this.nuevoJuego.fecha = new Date();
      this.nuevoJuego.jugador = this.email;
      this.enviarJuego.emit(this.nuevoJuego);
      this.nuevoJuego = new JuegoAnagrama();
      this.MostarMensaje('Era tan simple!', false);
      this.juegosService
      .getEstadisticaJugadorByEmailAndGame(this.email, JuegosEnum.Anagrama)
      .subscribe((data) => {
        this.docJugador = data;
        this.docJugador.data.cantPerdidos++;
        this.juegosService.update_Jugador(this.docJugador);
      });
    }

    this.generarAnagrama();
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
