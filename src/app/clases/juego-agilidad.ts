import { Juego } from './juego';

export class JuegoAgilidad extends Juego{
  primerNumero: number = 0;
  segundoNumero: number = 0;
  operador: number = 0;
  operadorSimbolo: string = "";
  
  resultado:number = 0;
  numeroIngresado: number;
  gano: boolean

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super(nombre, gano, jugador);
  }

  verificar() {
    if (this.numeroIngresado == this.resultado) {
      this.gano = true;
    }
    if (this.gano) {
      return true;
    } else {
      return false;
    }
  }

  generarOperacion() {
    this.primerNumero = Math.floor(Math.random() * 100 + 1);
    this.segundoNumero = Math.floor(Math.random() * 100 + 1);

    this.operador = Math.floor(Math.random() * 4 + 1);
    switch(this.operador){
      case 2: 
        this.operadorSimbolo = "-";
        this.resultado = this.primerNumero - this.segundoNumero;
        break;
      case 3: 
        this.operadorSimbolo = "*";
        this.resultado = this.primerNumero * this.segundoNumero;
        break;
      case 4: 
        this.operadorSimbolo = "/";
        this.resultado = Math.round(this.primerNumero / this.segundoNumero);
        break;
      default: 
        this.operadorSimbolo = "+";
        this.resultado = this.primerNumero + this.segundoNumero;
        break;
    }

    console.info('resultado:' + this.resultado);
    this.gano = false;
  }
}
