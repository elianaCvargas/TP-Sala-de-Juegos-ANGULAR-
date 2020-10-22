import { EstadoImagenEnum } from '../enum/estadoImagenEnum';
import { ImagenMemotest } from './imagen-memotest';
import { Juego } from './juego';
import { MemotestMovimiento } from './memotest-movimiento';
import { Ficha } from './tateti-ficha';
import { TaTeTiMovimiento } from './tateti-movimiento';

export class JuegoMemotest extends Juego {
  tableroActual: Array<Array<ImagenMemotest>>;
  url: Array<string> = ["assets/imagenes/Foquito.PNG", "assets/imagenes/Manzana.PNG", "assets/imagenes/Mosquito.PNG"
  , "assets/imagenes/Oso.PNG", "assets/imagenes/Paraguas.PNG", "assets/imagenes/Sapito.PNG", "assets/imagenes/Rainbow.PNG"
  , "assets/imagenes/Helado.PNG"];

  public imagenAnterior: ImagenMemotest;
  public movimientoAnterior: MemotestMovimiento;

  constructor(gano?: boolean, jugador?: string) {
    super('Memotest', gano, jugador);

    this.generarTableroNuevo();
  }

  public generarTableroNuevo() {
    this.tableroActual = [[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]];
    let column: number;
    let row: number;
    this.imagenAnterior = null;
    this.movimientoAnterior = null;
    for (let cantImagenes = 0; cantImagenes < 2; cantImagenes++) {
      for (let i = 0; i < 8; i++) {
        const imagenActual = this.url[i];

        do {
          column = Math.floor(Math.random() * 4);
          row = Math.floor(Math.random() * 4);
        } while(this.tableroActual[column][row])

        this.tableroActual[column][row] = new ImagenMemotest(imagenActual, EstadoImagenEnum.Oculto);
      }
    }
  }

  generarMovimiento(movimiento: MemotestMovimiento) {
    if(this.movimientoAnterior === null || movimiento.column != this.movimientoAnterior.column ||
      movimiento.row != this.movimientoAnterior.row) {
        if(this.imagenAnterior === null)
        {
          this.imagenAnterior = this.tableroActual[movimiento.row][movimiento.column];
          this.tableroActual[movimiento.row][movimiento.column].estado = EstadoImagenEnum.Visible;
          this.movimientoAnterior = movimiento;
        }
        else{
          if(this.tableroActual[movimiento.row][movimiento.column].ruta === this.imagenAnterior.ruta)
          {
            this.imagenAnterior = null;
            this.movimientoAnterior = null;
            this.tableroActual[movimiento.row][movimiento.column].estado = EstadoImagenEnum.Visible;
          }
          else{
            this.tableroActual[movimiento.row][movimiento.column].estado = EstadoImagenEnum.Visible;

            setTimeout (() => {
              this.tableroActual[movimiento.row][movimiento.column].estado = EstadoImagenEnum.Oculto;
              this.imagenAnterior.estado = EstadoImagenEnum.Oculto;

              this.imagenAnterior = null;
              this.movimientoAnterior = null;
           }, 1000);
          }
        }
      }
  }

  public verificar(): boolean {
    // this.winner = null;
    let cont = 0;
    for (let i = 0; i < this.tableroActual.length; i++) {
       for (let j = 0; j < this.tableroActual[i].length; j++) {
          if( this.tableroActual[i][j].estado === EstadoImagenEnum.Visible)
          {
             cont++;
          }
          else
          {
            cont--;
          }
       }

    }

    if(cont === 16)
    {
      this.gano = true;
      return true;
    }
else{
     return false;
}
  }

  public obtenerProximaFicha(): void {
    // this.fichaActual = this.fichaActual == "X" ? 'O' : 'X';
  }
}
