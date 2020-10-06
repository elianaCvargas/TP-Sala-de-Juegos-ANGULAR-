export class Ranking {
  public nombre: string;
  public jugador: string;
  public puntaje: number;


  constructor(nombre: string, jugador:string, puntaje: number) {
    this.nombre = nombre;
    this.jugador = jugador;
    this.puntaje =  puntaje;
  }
}
