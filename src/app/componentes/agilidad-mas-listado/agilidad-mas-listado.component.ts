import { Component, OnInit, ViewChild } from '@angular/core';
import { JuegoAgilidad } from 'src/app/clases/juego-agilidad';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
import { Juego } from '../../clases/juego';
import { ListadoDeResultadosComponent } from '../listado-de-resultados/listado-de-resultados.component';

@Component({
  selector: 'app-agilidad-mas-listado',
  templateUrl: './agilidad-mas-listado.component.html',
  styleUrls: ['./agilidad-mas-listado.component.scss']
})
export class AgilidadMasListadoComponent implements OnInit {
  public listadoParaCompartir: Array<Juego>;
  @ViewChild('listadoResultados') listadoResultados: ListadoDeResultadosComponent;

  constructor(private juegosService: JuegoServiceService) {
    this.listadoParaCompartir = new Array<any>();
  }

  ngOnInit() {
  }

  tomarJuegoTerminado(juego: JuegoAgilidad) {
    console.log("en app",juego);
    // this.juegosService.create_NewGame(juego).then(() => {
    //   console.log("carla agrego algo");
    // });
    this.listadoParaCompartir.push(juego);
    this.listadoResultados.refresh();
  }
}
