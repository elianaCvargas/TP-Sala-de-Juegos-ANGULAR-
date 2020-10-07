import { Component, OnInit, ViewChild } from '@angular/core';
import { Ranking } from 'src/app/clases/Ranking';
import { JuegosEnum } from 'src/app/enum/juegosEnum';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { RankingTablaComponent } from '../ranking-tabla/ranking-tabla.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir = Array<Ranking>();

  @ViewChild('listadoResultadosAdivina')
  listadoResultadosAdivina: RankingTablaComponent;
  @ViewChild('listadoResultadosAgilidad')
  listadoResultadosAgilidad: RankingTablaComponent;
  @ViewChild('listadoResultadosPiedra')
  listadoResultadosPiedra: RankingTablaComponent;
  @ViewChild('listadoResultadosAnagrama')
  listadoResultadosAnagrama: RankingTablaComponent;
  @ViewChild('listadoResultadosTateti')
  listadoResultadosTateti: RankingTablaComponent;
  @ViewChild('listadoResultadosAhorcado')
  listadoResultadosAhorcado: RankingTablaComponent;

  miServicioJuego: JuegoServiceService;
  public listadojuegos;

  constructor(private juegosService: JuegoServiceService) {}

  ngOnInit() {
    this.tabClick({ index: 0 });
  }

  tabClick(tab) {
    switch (tab.index) {
      case 0:
        this.juegosService
          .getRankingByGame(JuegosEnum.Adivina)
          .subscribe((data) => {
            this.listadoParaCompartir = data.map((doc) => doc.data);
            this.listadoResultadosAdivina.refresh(this.listadoParaCompartir);
          });
        break;
      case 1:
        this.juegosService
          .getRankingByGame(JuegosEnum.Agilidad)
          .subscribe((data) => {
            this.listadoParaCompartir = data.map((doc) => doc.data);
            this.listadoResultadosAgilidad.refresh(this.listadoParaCompartir);
          });
        break;
      case 2:
        this.juegosService
          .getRankingByGame(JuegosEnum.Piedra)
          .subscribe((data) => {
            this.listadoParaCompartir = data.map((doc) => doc.data);
            this.listadoResultadosPiedra.refresh(this.listadoParaCompartir);
          });
        break;
      case 3:
        this.juegosService
          .getRankingByGame(JuegosEnum.Anagrama)
          .subscribe((data) => {
            this.listadoParaCompartir = data.map((doc) => doc.data);
            this.listadoResultadosAnagrama.refresh(this.listadoParaCompartir);
          });
        break;
      case 4:
        this.juegosService
          .getRankingByGame(JuegosEnum.Tateti)
          .subscribe((data) => {
            this.listadoParaCompartir = data.map((doc) => doc.data);
            this.listadoResultadosTateti.refresh(this.listadoParaCompartir);
          });
        break;
      case 5:
        this.juegosService
          .getRankingByGame(JuegosEnum.Ahorcado)
          .subscribe((data) => {
            this.listadoParaCompartir = data.map((doc) => doc.data);
            this.listadoResultadosAhorcado.refresh(this.listadoParaCompartir);
          });
        break;
    }
  }
}
