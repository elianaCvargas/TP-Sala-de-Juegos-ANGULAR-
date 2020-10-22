import { Component, OnInit, ViewChild } from '@angular/core';
import { Juego } from 'src/app/clases/juego';
import { JuegoMemotest } from 'src/app/clases/juego-memotest';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
import { ListadoDeResultadosComponent } from '../listado-de-resultados/listado-de-resultados.component';

@Component({
  selector: 'app-memotest-mas-listado',
  templateUrl: './memotest-mas-listado.component.html',
  styleUrls: ['./memotest-mas-listado.component.scss']
})
export class MemotestMasListadoComponent implements OnInit {


  public listadoParaCompartir: Array<Juego>;
  public email:string;

  @ViewChild('listadoResultados') listadoResultados: ListadoDeResultadosComponent;

  constructor(private juegosService: JuegoServiceService) {
    this.listadoParaCompartir = new Array<any>();
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.juegosService
      .read_AllGamesByEmailAndGameName(this.email, 'Memotest')
      .subscribe((juegos: JuegoMemotest[]) => {
        this.listadoResultados.listado = juegos;
        this.listadoResultados.refresh();
      });
  }

  // function a(b,c) { return "hola" };
  // var fnc = (b,c) => { return "hola" };
  // fnc(1,2);

  tomarJuegoTerminado(juego: JuegoMemotest) {
    console.log("en app",juego);
    var juegoModel = {
      gano: juego.gano,
      fecha: juego.fecha,
      jugador: juego.jugador,
      nombre: juego.nombre
    };

    this.juegosService.create_NewGame(juegoModel).then(() => {
      console.log("carla agrego algo");
      //asd
    });
    this.listadoParaCompartir.push(juego);
    this.listadoResultados.refresh();
  }

}
