import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImagenMemotest } from 'src/app/clases/imagen-memotest';
import { MemotestMovimiento } from 'src/app/clases/memotest-movimiento';

@Component({
  selector: 'app-tablero-memotest',
  templateUrl: './tablero-memotest.component.html',
  styleUrls: ['./tablero-memotest.component.scss']
})
export class TableroMemotestComponent implements OnInit {

  @Input() tablero: Array<Array<ImagenMemotest>>;
  @Input() stopPlay: boolean;
  @Output() coinPlacement: EventEmitter<MemotestMovimiento> = new EventEmitter<MemotestMovimiento>();
  @Output() reset: EventEmitter<void> = new EventEmitter<void>();

  constructor() {

  }

  ngOnInit() { }

  emitCoinPlacement(row, colum) {
    const movimiento = new MemotestMovimiento(row, colum);
    this.coinPlacement.emit(movimiento);
  }

}
