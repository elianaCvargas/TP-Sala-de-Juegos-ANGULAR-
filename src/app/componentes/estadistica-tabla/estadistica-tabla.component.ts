import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EstadisticaJugador } from 'src/app/clases/estadistica-jugador';
import { JuegosEnum } from 'src/app/enum/juegosEnum';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';

@Component({
  selector: 'app-estadistica-tabla',
  templateUrl: './estadistica-tabla.component.html',
  styleUrls: ['./estadistica-tabla.component.scss']
})
export class EstadisticaTablaComponent implements OnInit {
  displayedColumns: string[] = ['nombre','cantGanados', 'cantPerdidos'];
  dataSource: MatTableDataSource<EstadisticaJugador>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public listado;
  constructor(private jugadorService: JuegoServiceService) {
    this.refresh();
  }

  ngOnInit() {
    const email = localStorage.getItem('email');
    this.jugadorService.getEstadisticaByEmail(email).subscribe(
      (data) => {
        let results = data.map(doc => doc.data);
        this.refresh(results);
      });
  }

  refresh(listado: EstadisticaJugador[] = []) {
    this.dataSource = new MatTableDataSource(listado);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
