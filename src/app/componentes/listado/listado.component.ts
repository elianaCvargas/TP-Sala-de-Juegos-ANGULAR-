import { Component, OnInit, ViewChild } from '@angular/core';
import { Juego } from 'src/app/clases/juego';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { ListadoDeResultadosComponent } from '../listado-de-resultados/listado-de-resultados.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir = Array<Juego>();
  @ViewChild('listadoResultados') listadoResultados: ListadoDeResultadosComponent;

  miServicioJuego: JuegoServiceService;
  public listadojuegos;

  constructor(private juegosService: JuegoServiceService) {
    this.listadoParaCompartir = new Array<any>();
  }

  ngOnInit() {
    this.llamaService();
  }

  llamaService() {
    this.juegosService.read_AllGames().subscribe((data) => {

      data.forEach(element => {
       this.listadoParaCompartir.push(element);
      });
      //  this.listadoParaCompartir = data;
      // this.listadoParaCompartir.push(juego);
      this.listadoResultados.refresh();
    });

  }

  llamaServicePromesa() {
    console.log('llamaServicePromesa');
    // this.miServicioJuego.listarPromesa().then((listado) => {
    //     this.listadoParaCompartir = listado;
    // });
  }
}
