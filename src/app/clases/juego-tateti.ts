import { Juego } from './juego';
import { Ficha } from './tateti-ficha';
import { TaTeTiMovimiento } from './tateti-movimiento';

export class JuegoTateti extends Juego {
  tableroActual: Array<Array<Ficha>>;
  winner: Ficha = null;
  fichaActual: Ficha =  'X';

  constructor(gano?: boolean, jugador?: string) {
    super('Tateti', gano, jugador);
    this.tableroActual = [[null,null,null],[null,null,null],[null,null,null]];
  }

  public generarTableroNuevo() {
    this.tableroActual = [[null,null,null],[null,null,null],[null,null,null]];
  }

  generarMovimiento(movimiento: TaTeTiMovimiento) {
    this.tableroActual[movimiento.row][movimiento.column] = this.fichaActual;
  }

  public verificar(): boolean {
    this.winner = null;

    for (let i = 0; i < 3; i++) {
      if(this.tableroActual[i][0] == this.fichaActual &&
        this.tableroActual[i][1] == this.fichaActual &&
        this.tableroActual[i][2] == this.fichaActual) {
        this.winner = this.fichaActual;
      }

      if(this.tableroActual[0][i] == this.fichaActual &&
        this.tableroActual[1][i] == this.fichaActual &&
        this.tableroActual[2][i] == this.fichaActual) {
        this.winner = this.fichaActual;
      }
    }

    if(this.tableroActual[0][0] == this.fichaActual && this.tableroActual[1][1] == this.fichaActual && this.tableroActual[2][2] == this.fichaActual) {
      this.winner = this.fichaActual;
    }

    if(this.tableroActual[0][2] == this.fichaActual && this.tableroActual[1][1] == this.fichaActual && this.tableroActual[2][0] == this.fichaActual) {
      this.winner = this.fichaActual;
    }

    return this.winner != null;
  }

  public obtenerProximaFicha(): void {
    this.fichaActual = this.fichaActual == "X" ? 'O' : 'X';
  }
}
