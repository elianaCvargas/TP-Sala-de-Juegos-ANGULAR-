export abstract class Juego {
  public nombre = 'Sin Nombre';
  public jugador: string;
  public gano = false;
  public fecha: Date;
  constructor(nombre?: string, gano?: boolean, jugador?: string, fecha?: Date) {
    // if (nombre)
    //   this.nombre = nombre;

    // if (gano)
    //   this.gano = gano;
    // if(jugador)
    //   this.jugador=jugador;
    // else
    //   this.jugador= nombre;
    this.nombre = nombre;
    this.gano = gano;
    this.jugador = jugador;
    this.fecha = fecha;
  }

  public abstract verificar(): boolean;

  public retornarAyuda() {
    return 'NO hay Ayuda definida';
  }
}
