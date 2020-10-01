import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JuegoAnagrama } from 'src/app/clases/juego-anagrama';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.scss']
})
export class AnagramaComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<JuegoAnagrama> = new EventEmitter();
  nuevoJuego: JuegoAnagrama;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
  anagramaGenerado: boolean;

  constructor() {
    this.nuevoJuego = new JuegoAnagrama(false, 'username');
    this.ocultarVerificar = false;
  }

  ngOnInit() {
    this.generarAnagrama();
  }

  generarAnagrama() {
    this.nuevoJuego.generarAnagrama();
    this.anagramaGenerado = true;
    this.contador = 0;
  }

  verificar() {
    this.contador++;
    this.ocultarVerificar = true;
    console.info('numero Secreto:', this.nuevoJuego.gano);
    if (this.nuevoJuego.verificar()) {
      console.log('antes de enviar');
      this.enviarJuego.emit(this.nuevoJuego);

      this.MostarMensaje('Sos un Genio!!!', true);
      this.nuevoJuego.anagrama = '';
    } else {
      let mensaje: string;
      switch (this.contador) {
        case 1:
          mensaje = 'No, intento fallido, animo';
          break;
        case 2:
          mensaje = 'No,Te estaras Acercando???';
          break;
        case 3:
          mensaje = 'No es, Yo crei que la tercera era la vencida.';
          break;
        case 4:
          mensaje = 'Dale que es re fácil.';
          break;
        case 5:
          mensaje = ' intentos y nada.';
          break;
        case 6:
          mensaje = 'Afortunado en el amor';
          break;

        default:
          mensaje = 'Ya le erraste ' + this.contador + ' veces';
          break;
      }

      this.MostarMensaje(
        '#' +
          this.contador +
          ' ' +
          mensaje +
          ' ayuda :' +
          this.nuevoJuego.retornarAyuda()
      );
    }
    console.info('numero Secreto:', this.nuevoJuego.gano);
  }

  MostarMensaje(
    mensaje: string = 'este es el mensaje',
    ganador: boolean = false
  ) {
    this.Mensajes = mensaje;
    var x = document.getElementById('snackbar');
    if (ganador) {
      x.className = 'show Ganador';
    } else {
      x.className = 'show Perdedor';
    }
    var modelo = this;
    setTimeout(function () {
      x.className = x.className.replace('show', '');
      modelo.ocultarVerificar = false;
    }, 3000);
    console.info('objeto', x);
  }
}
