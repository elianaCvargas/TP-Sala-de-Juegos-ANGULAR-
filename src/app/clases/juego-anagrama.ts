import { Juego } from './juego';

const palabras = [
  'Piscina',
  'Mejor',
  'Ballesta',
  'Diciembre',
  'Arrullar',
  'Mordedura',
  'Propaganda',
  'Desenvolver',
  'Torbellino',
  'Jefe',
  'Limar',
  'Calor',
  'Pesar',
  'Transpirar',
  'Polo',
  'Panzada',
  'Machete',
  'Denso',
  'Museo',
  'Ateo',
];

export class JuegoAnagrama extends Juego {
  public anagrama: string;
  public palabraIngresada: string = '';

  constructor(gano?: boolean, jugador?: string) {
    super('Anagrama', gano, jugador);
  }

  public generarAnagrama() {
    var randomIndex = Math.floor(Math.random() * palabras.length);
    this.anagrama = palabras[randomIndex];
  }

  public verificar(): boolean {
    let letters = this.anagrama.toUpperCase().split('');
    for (let i = 0; i < this.palabraIngresada.length; i++) {
      const element = this.palabraIngresada.toUpperCase()[i];
      const letterIndex = letters.indexOf(element);
      if (letterIndex == -1) {
        return false;
      }

      letters.splice(letterIndex, 1);
    }

    return letters.length == 0;
  }
}
