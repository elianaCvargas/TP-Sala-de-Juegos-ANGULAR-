export class EstadisticaJugador {
  public nombreJugador: string;
  public nombreJuego: string;
  public cantGanados: number;
  public cantPerdidos: number;

  constructor(nombreJuego: string, nombre: string, cantGanados: number, cantPerdidos: number) {
    this.nombreJugador = nombre;
    this.cantGanados = cantGanados;
    this.cantPerdidos = cantPerdidos;
    this.nombreJuego = nombreJuego;
  }
}
