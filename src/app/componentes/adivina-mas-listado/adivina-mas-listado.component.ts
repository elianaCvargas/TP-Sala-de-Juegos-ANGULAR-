import { Component, OnInit } from '@angular/core';
import { JuegoAdivina } from 'src/app/clases/juego-adivina';
import { Juego } from '../../clases/juego';
@Component({
  selector: 'app-adivina-mas-listado',
  templateUrl: './adivina-mas-listado.component.html',
  styleUrls: ['./adivina-mas-listado.component.scss'],
})
export class AdivinaMasListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;
  constructor() {
    this.listadoParaCompartir = new Array<any>();
  }

  ngOnInit() {}

  tomarJuegoTerminado(juego: JuegoAdivina) {
    console.log("en app",juego);
    this.listadoParaCompartir.push(juego);
  }

  tomarJuegoTerminadoNuevoManejador()
  {
    console.log("Ingresamos");

  }
}
