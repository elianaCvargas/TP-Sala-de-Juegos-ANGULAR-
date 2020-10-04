import { Juego } from 'src/app/clases/juego';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { ListadoDeResultadosComponent } from '../listado-de-resultados/listado-de-resultados.component';
import { JuegoTateti } from 'src/app/clases/juego-tateti';

@Component({
  selector: 'app-tateti-mas-listado',
  templateUrl: './tateti-mas-listado.component.html',
  styleUrls: ['./tateti-mas-listado.component.scss']
})
export class TatetiMasListadoComponent implements OnInit {

  public listadoParaCompartir: Array<Juego>;
  @ViewChild('listadoResultados') listadoResultados: ListadoDeResultadosComponent;

  constructor(private juegosService: JuegoServiceService) {
    this.listadoParaCompartir = new Array<any>();
  }

  ngOnInit() {}

  // function a(b,c) { return "hola" };
  // var fnc = (b,c) => { return "hola" };
  // fnc(1,2);

  tomarJuegoTerminado(juego: Juego) {
    console.log("en app",juego);
    this.juegosService.create_NewGame(juego).then(() => {
      console.log("carla agrego algo");
      //asd
    });
    this.listadoParaCompartir.push(juego);
    this.listadoResultados.refresh();
  }
}
