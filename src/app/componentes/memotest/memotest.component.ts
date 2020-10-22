import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Documento } from 'src/app/clases/documento';
import { EstadisticaJugador } from 'src/app/clases/estadistica-jugador';
import { JuegoMemotest } from 'src/app/clases/juego-memotest';
import { MemotestMovimiento } from 'src/app/clases/memotest-movimiento';
import { Ranking } from 'src/app/clases/Ranking';
import { JuegosEnum } from 'src/app/enum/juegosEnum';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss']
})
export class MemotestComponent implements OnInit {

  nuevoJuego: JuegoMemotest;
  public email: string;
  public docRanking: Documento<Ranking>;
  public docJugador: Documento<EstadisticaJugador>;

  constructor(private juegosService: JuegoServiceService) {
    this.nuevoJuego = new JuegoMemotest(false);
  }
  @Output() enviarJuego: EventEmitter<JuegoMemotest> = new EventEmitter();

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
  }

  handleReset() {
    this.nuevoJuego = new JuegoMemotest(false);
  }


  handleCoinMovement(movimiento: MemotestMovimiento) {
    this.nuevoJuego.generarMovimiento(movimiento);
    this.nuevoJuego.verificar();

    if(this.nuevoJuego.gano)
    {
      this.nuevoJuego.fecha = new Date;
      this.nuevoJuego.jugador = this.email;
      this.nuevoJuego.gano = true;
      this.enviarJuego.emit(this.nuevoJuego);
      this.juegosService
        .getRankingByGameAndPlayer(this.nuevoJuego.nombre, this.email)
        .subscribe((data) => {
          this.docRanking = data;
          this.docRanking.data.puntaje = 5;
          this.juegosService.update_Ranking(this.docRanking);
        });

      this.juegosService.getEstadisticaJugadorByEmailAndGame(this.email,JuegosEnum.Memotest).subscribe((data) => {
        this.docJugador = data;
        this.docJugador.data.cantGanados++;
        this.juegosService.update_Jugador(this.docJugador);
      });

    }
    // else {
    //   this.nuevoJuego = new JuegoMemotest(false);
    // }
  }

}
