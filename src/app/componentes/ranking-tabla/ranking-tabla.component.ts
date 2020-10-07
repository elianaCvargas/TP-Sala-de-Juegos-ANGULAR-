import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ranking } from 'src/app/clases/Ranking';

@Component({
  selector: 'app-ranking-tabla',
  templateUrl: './ranking-tabla.component.html',
  styleUrls: ['./ranking-tabla.component.scss']
})
export class RankingTablaComponent implements OnInit {

  @Input() listado: Ranking[];

  displayedColumns: string[] = ['jugador', 'puntaje'];
  dataSource: MatTableDataSource<Ranking>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    this.refresh();
  }

  ngOnInit() {

  }

  refresh(listado: Ranking[] = []) {
    this.dataSource = new MatTableDataSource(listado);
    this.dataSource.paginator = this.paginator;
  }

  ver() {
    console.log('' + this.listado);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
