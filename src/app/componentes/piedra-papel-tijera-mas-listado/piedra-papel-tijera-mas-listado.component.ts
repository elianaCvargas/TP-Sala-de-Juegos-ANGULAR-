import { Component, OnInit, ViewChild } from '@angular/core';
import { JuegoPiedraPapelTijera } from 'src/app/clases/juego-piedra-papel-tijera';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
import { Juego } from '../../clases/juego';
import { ListadoDeResultadosComponent } from '../listado-de-resultados/listado-de-resultados.component';

@Component({
  selector: 'app-piedra-papel-tijera-mas-listado',
  templateUrl: './piedra-papel-tijera-mas-listado.component.html',
  styleUrls: ['./piedra-papel-tijera-mas-listado.component.scss']
})
export class PiedraPapelTijeraMasListadoComponent implements OnInit {
  public listadoParaCompartir: Array<Juego>;
  public email:string;
  @ViewChild('listadoResultados') listadoResultados: ListadoDeResultadosComponent;

  constructor(private juegosService: JuegoServiceService) {
    this.listadoParaCompartir = new Array<any>();
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.juegosService
      .read_AllGamesByEmailAndGameName(this.email, 'Piedra Papel o Tijera')
      .subscribe((juegos: JuegoPiedraPapelTijera[]) => {
        this.listadoResultados.listado = juegos;
        this.listadoResultados.refresh();
      });
  }


  tomarJuegoTerminado(juego: JuegoPiedraPapelTijera) {
    this.juegosService.create_NewGame(juego).then(() => {
      console.log("carla agrego algo");
    });
    this.listadoParaCompartir.push(juego);
    this.listadoResultados.refresh();
  }
}
