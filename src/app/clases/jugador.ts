export class Jugador {
  public nombre: string;
  public cantGanados: number;
  public cantPerdidos: number;

  constructor(nombre: string, cantGanados: number, cantPerdidos: number) {
    this.nombre = nombre;
    this.cantGanados = cantGanados;
    this.cantPerdidos = cantPerdidos;
  }
}
