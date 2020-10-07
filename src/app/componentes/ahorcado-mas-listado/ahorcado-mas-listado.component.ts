import { Component, OnInit, ViewChild } from '@angular/core';
import { JuegoAhorcado } from 'src/app/clases/juego-ahorcado';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
import { Juego } from '../../clases/juego';
import { ListadoDeResultadosComponent } from '../listado-de-resultados/listado-de-resultados.component';
@Component({
  selector: 'app-ahorcado-mas-listado',
  templateUrl: './ahorcado-mas-listado.component.html',
  styleUrls: ['./ahorcado-mas-listado.component.scss'],
})
export class AhorcadoMasListadoComponent implements OnInit {
  public listadoParaCompartir: Array<Juego>;
  @ViewChild('listadoResultados') listadoResultados: ListadoDeResultadosComponent;

  constructor(private juegosService: JuegoServiceService) {
    this.listadoParaCompartir = new Array<any>();
  }

  ngOnInit() {}

  tomarJuegoTerminado(juego: JuegoAhorcado) {
    var juegoModel = {
      Juego: juego.nombre,
      fecha: juego.fecha,
      jugador: juego.jugador,
      gano: juego.gano,
      palabraSecreta: juego.palabraSecreta,
      letraIngresada: juego.letraIngresada,
      palabraProgreso: juego.palabraProgreso,

    };
    this.juegosService.create_NewGame(juegoModel).then(() => {
    });
    this.listadoParaCompartir.push(juego);
    this.listadoResultados.refresh();
  }

}
