import { Juego } from '../clases/juego';

export class JuegoAhorcado extends Juego {
  palabraSecreta: string = "";
  letraIngresada: string = "";
  palabraProgreso: string;

  listadoClave: string[] = [];
  listadoValor: string[] = [];
  letraAcertada: boolean;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('Ahorcado', gano, jugador);
  }

  public verificarLetra() {
    this.letraAcertada = false;
    // check claves con letra ingresada
    for(var i = 0; i < this.listadoClave.length; i++){
      if(this.letraIngresada === this.listadoClave[i]){
        this.listadoValor[i] = this.letraIngresada;
        this.letraAcertada = true;
      }
    }

    // actualizar palabra en progreso
    this.palabraProgreso = "";
    for(var i = 0; i < this.listadoValor.length; i++){
      this.palabraProgreso += this.listadoValor[i];
    }
  }

  public verificar() {
    if (this.palabraProgreso === this.palabraSecreta) {
      this.gano = true;
    }
    if (this.gano) {
      return true;
    } else {
      return false;
    }
  }

  public generarpalabra() {
    var opciones = ["secreto", "rayuela", "varita", "chevrolet", "cohete", "transicion", "calculadora"];
    this.palabraSecreta = opciones[Math.floor(Math.random() * opciones.length + 1)];
    this.palabraProgreso = "";
    console.info('palabra secreta:' + this.palabraSecreta);
    
    for(var i = 0; i < this.palabraSecreta.length; i++){
      this.listadoClave.push(this.palabraSecreta[i]);
      this.listadoValor.push("-");
      this.palabraProgreso += this.listadoValor[i];
    }

    this.gano = false;
  }

  public resetpalabra() {
    this.palabraSecreta = "";
    this.listadoValor = [];
    this.listadoClave = [];
    this.palabraProgreso = "";
  }
}
