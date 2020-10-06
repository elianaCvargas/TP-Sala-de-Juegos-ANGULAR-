import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.scss']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() enviarJuego :EventEmitter<any>= new EventEmitter<any>();

  nuevoJuego : JuegoAgilidad;
  Mensajes: string;
  operacionArtimeticaGenerada: boolean;

  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
public email: string;
  private subscription: Subscription;

  constructor() {
    this.ocultarVerificar=false;
    this.Tiempo=5;
    this.nuevoJuego = new JuegoAgilidad('Agilidad Aritmetica', false);
    console.info("Inicio agilidad");
  }

  ngOnInit() {
    this.email = localStorage.getItem("email");

  }

  NuevoJuego() {
    this.ocultarVerificar=false;
   this.repetidor = setInterval(()=>{

      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=5;
      }
      }, 900);
  }

  generarOperacion() {
    this.nuevoJuego.fecha = new Date();
    this.nuevoJuego.jugador = this.email;
    this.nuevoJuego.generarOperacion();
    this.operacionArtimeticaGenerada = true;
  }

  verificar()
  {
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);
    console.info('agilidad aritmetica:', this.nuevoJuego.gano);

    if (this.nuevoJuego.verificar()) {
      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje('Sos un Genio!!!', true);
      this.nuevoJuego = new JuegoAgilidad('Agilidad Aritmetica', false);

    } else {
      this.enviarJuego.emit(this.nuevoJuego);
      let mensaje: string = 'Lo siento, necesitas mejorar tu habilidad con la calculadora master';
      this.MostarMensaje(mensaje, false);
      this.nuevoJuego = new JuegoAgilidad('Agilidad Aritmetica', false);

    }

    this.nuevoJuego.resultado = 0;
    this.ocultarVerificar=false;
  }

  MostarMensaje (
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
