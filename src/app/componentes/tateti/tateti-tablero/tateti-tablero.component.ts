import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ficha } from 'src/app/clases/tateti-ficha';
import { TaTeTiMovimiento } from 'src/app/clases/tateti-movimiento';

@Component({
  selector: 'app-tateti-tablero',
  templateUrl: './tateti-tablero.component.html',
  styleUrls: ['./tateti-tablero.component.scss']
})
export class TatetiTableroComponent implements OnInit {
  @Input() tablero: Array<Array<Ficha>>;
  @Input() stopPlay: boolean;
  @Output() coinPlacement: EventEmitter<TaTeTiMovimiento> = new EventEmitter<TaTeTiMovimiento>();
  @Output() reset: EventEmitter<void> = new EventEmitter<void>();

  winner: Ficha;

  constructor() {

  }

  ngOnInit() { }

  emitCoinPlacement(row, colum) {
    const movimiento = new TaTeTiMovimiento(row, colum);
    this.coinPlacement.emit(movimiento);
  }
}
