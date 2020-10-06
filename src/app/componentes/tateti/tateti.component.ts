import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JuegoTateti } from 'src/app/clases/juego-tateti';
import { Ficha } from 'src/app/clases/tateti-ficha';
import { TaTeTiMovimiento } from 'src/app/clases/tateti-movimiento';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.scss']
})
export class TatetiComponent implements OnInit {
  nuevoJuego: JuegoTateti;
  public email: string;

  constructor() {
    this.nuevoJuego = new JuegoTateti(false);
  }
  @Output() enviarJuego: EventEmitter<JuegoTateti> = new EventEmitter();

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
  }

  handleReset() {
    this.nuevoJuego = new JuegoTateti(false);
  }


  handleCoinMovement(movimiento: TaTeTiMovimiento) {
    this.nuevoJuego.generarMovimiento(movimiento);
    this.nuevoJuego.verificar();

    if(this.nuevoJuego.winner)
    {
      this.nuevoJuego.fecha = new Date;
      this.nuevoJuego.jugador = this.email;
      this.nuevoJuego.gano = true;
      this.enviarJuego.emit(this.nuevoJuego);
    } else {

      this.nuevoJuego.obtenerProximaFicha();
    }
  }
}
