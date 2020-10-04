import { Juego } from '../clases/juego';

export class JuegoPiedraPapelTijera extends Juego {
    seleccionIA: number = 0;
    seleccionIngresada: number = 0;
    seleccionIANombre: string;
    seleccionNombre: string;

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super('Piedra Papel o Tijera', gano, jugador);
    }

    public verificar(): boolean {
        if (this.seleccionIngresada != this.seleccionIA) {
            switch(this.seleccionIngresada.toString() + this.seleccionIA.toString())
            {
                case '13':
                    this.gano = true;
                    break;
                case '21':
                    this.gano = true;
                    break;
                case '32':
                    this.gano = true;
                    break;
            }
        }

        if (this.gano) {
            return true;
        } else {
            return false;
        }
    }

    public generarseleccion() {
        this.seleccionIA = Math.floor(Math.random() * 3 + 1);
        this.seleccionIANombre = this.seleccionIA === 1 ? 'Piedra' : this.seleccionIA === 2 ? 'Papel' : 'Tijera';
        console.info('seleccion ia:' + this.seleccionIA);
        console.info(`seleccion ia: ${ this.seleccionIA === 1 ? 'piedra' : this.seleccionIA === 2 ? 'papel' : 'tijera' }`)
        this.gano = false;
      }
}
