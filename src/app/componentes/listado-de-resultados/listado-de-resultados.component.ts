import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JuegoAdivina } from 'src/app/clases/juego-adivina';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.scss'],
})
export class ListadoDeResultadosComponent implements OnInit {
  @Input() listado: JuegoAdivina [];


  displayedColumns: string[] = ['juego', 'jugador', 'resultado'];
  adivinados: JuegoAdivina[];
  dataSource: MatTableDataSource<JuegoAdivina>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    this.refresh();
  }

  ngOnInit() {

  }

  refresh() {
    this.dataSource = new MatTableDataSource(this.listado);
    this.dataSource.paginator = this.paginator;
  }

  ver() {
    console.log('' + this.listado);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
