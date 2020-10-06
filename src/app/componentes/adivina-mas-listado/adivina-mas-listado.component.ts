import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
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
  public juegoNombre: string;
  @ViewChild('listadoResultados') listadoResultados: ListadoDeResultadosComponent;

  constructor(private juegosService: JuegoServiceService, private datePipe: DatePipe) {
    this.listadoParaCompartir = new Array<any>();
  }

  ngOnInit() {
    this.email = localStorage.getItem("email");
    this.juegosService.read_AllGamesByEmailAndGameName(this.email,'Adivina el número')
    .subscribe((juegos: JuegoAdivina[]) => {
      // juegos.sort((a,b) => a.afecha.)
      // var hoy = new Date;
      // juegos.forEach((j) => {
      //   var newDate = j.fecha.nanoseconds;
      //   if(j.fecha.getFullYear == hoy.getFullYear && j.fecha.getDate == hoy.getMonth && j.fecha.getDay == hoy.getDay)
      //   {
      //       console.log(j);
      //   }
      // })
      this.listadoResultados.listado = juegos;

      this.listadoResultados.refresh();
    });
  }

  tomarJuegoTerminado(juego: JuegoAdivina) {
    this.juegoNombre = juego.nombre;
    this.juegosService.create_NewGame(juego).then(() => {
      console.log(" agrego algo");
    });
    this.listadoParaCompartir.push(juego);
    this.listadoResultados.refresh();
  }
}
