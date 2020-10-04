import { Component, OnInit, ViewChild } from '@angular/core';
import { JuegoAdivina } from 'src/app/clases/juego-adivina';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
import { Juego } from '../../clases/juego';
import { ListadoDeResultadosComponent } from '../listado-de-resultados/listado-de-resultados.component';
@Component({
  selector: 'app-adivina-mas-listado',
  templateUrl: './adivina-mas-listado.component.html',
  styleUrls: ['./adivina-mas-listado.component.scss'],
})
export class AdivinaMasListadoComponent implements OnInit {
  public email: string;
  public listadoParaCompartir: Array<Juego>;
  @ViewChild('listadoResultados') listadoResultados: ListadoDeResultadosComponent;

  constructor(private juegosService: JuegoServiceService) {
    this.listadoParaCompartir = new Array<any>();
  }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    this.juegosService.read_AllGamesByEmail(this.email)
    .subscribe((juegos: JuegoAdivina[]) => {
      this.listadoResultados.listado = juegos;
      this.listadoResultados.refresh();
    });
  }

  tomarJuegoTerminado(juego: JuegoAdivina) {
    this.juegosService.create_NewGame(juego).then(() => {
      console.log("carla agrego algo");
    });
    this.listadoParaCompartir.push(juego);
    this.listadoResultados.refresh();
  }
}
