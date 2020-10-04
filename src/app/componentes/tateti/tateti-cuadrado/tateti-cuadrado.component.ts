import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ficha } from 'src/app/clases/tateti-ficha';

@Component({
  selector: 'app-tateti-cuadrado',
  templateUrl: './tateti-cuadrado.component.html',
  styleUrls: ['./tateti-cuadrado.component.scss']
})
export class TatetiCuadradoComponent implements OnInit {

  @Input() value: Ficha;
  @Input() disabled: boolean;
  @Output() squareSelection: EventEmitter<void> = new EventEmitter<void>();

  constructor() {  }

  ngOnInit() {
    console.log('TatetiCuadradoComponent: ' + this.value)
  }

}
