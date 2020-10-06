import { Component, OnInit, ViewChild } from '@angular/core';
import { JuegoAgilidad } from 'src/app/clases/juego-agilidad';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
import { Juego } from '../../clases/juego';
import { ListadoDeResultadosComponent } from '../listado-de-resultados/listado-de-resultados.component';

@Component({
  selector: 'app-agilidad-mas-listado',
  templateUrl: './agilidad-mas-listado.component.html',
  styleUrls: ['./agilidad-mas-listado.component.scss'],
})
export class AgilidadMasListadoComponent implements OnInit {
  public listadoParaCompartir: Array<Juego>;
  @ViewChild('listadoResultados')
  listadoResultados: ListadoDeResultadosComponent;
  public email: string;
  public nombreJuego: string;
  constructor(private juegosService: JuegoServiceService) {
    this.listadoParaCompartir = new Array<any>();
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.juegosService
      .read_AllGamesByEmailAndGameName(this.email, 'Agilidad Aritmetica')
      .subscribe((juegos: JuegoAgilidad[]) => {
        this.listadoResultados.listado = juegos;
        this.listadoResultados.refresh();
      });
  }

  tomarJuegoTerminado(juego: JuegoAgilidad) {
    this.nombreJuego = juego.nombre;
    this.juegosService.create_NewGame(juego).then(() => {
      console.log('carla agrego algo');
    });
    this.listadoParaCompartir.push(juego);
    this.listadoResultados.refresh();
  }
}
