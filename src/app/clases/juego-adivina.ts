import { Juego } from '../clases/juego';

export class JuegoAdivina extends Juego {
  numeroSecreto: number = 0;
  numeroIngresado: number;
  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('Adivina el número', gano, jugador);
  }

  public verificar() {
    this.gano = this.numeroIngresado == this.numeroSecreto ? true : false;
    return this.gano;
  }

  public generarnumero() {
    this.numeroSecreto = Math.floor(Math.random() * 100 + 1);
    console.info('numero Secreto:' + this.numeroSecreto);
    this.gano = false;
  }

  public retornarAyuda() {
    if (this.numeroIngresado < this.numeroSecreto) {
      return 'Falta';
    }
    return 'Te pasate';
  }
}
