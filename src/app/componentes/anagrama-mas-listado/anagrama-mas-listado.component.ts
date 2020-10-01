import { Component, OnInit, ViewChild } from '@angular/core';
import { Juego } from 'src/app/clases/juego';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
import { ListadoDeResultadosComponent } from '../listado-de-resultados/listado-de-resultados.component';

@Component({
  selector: 'app-anagrama-mas-listado',
  templateUrl: './anagrama-mas-listado.component.html',
  styleUrls: ['./anagrama-mas-listado.component.scss']
})
export class AnagramaMasListadoComponent implements OnInit {


  public listadoParaCompartir: Array<Juego>;
  @ViewChild('listadoResultados') listadoResultados: ListadoDeResultadosComponent;

  constructor(private juegosService: JuegoServiceService) {
    this.listadoParaCompartir = new Array<any>();
  }
  ngOnInit(): void {
  }

  tomarJuegoTerminado(juego: Juego) {
    console.log("en app",juego);
    this.juegosService.create_NewGame(juego).then(() => {
      console.log("carla agrego algo");
    });
    this.listadoParaCompartir.push(juego);
    this.listadoResultados.refresh();
  }
}
