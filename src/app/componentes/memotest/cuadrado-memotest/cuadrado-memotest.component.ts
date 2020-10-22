import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImagenMemotest } from 'src/app/clases/imagen-memotest';
import { EstadoImagenEnum } from 'src/app/enum/estadoImagenEnum';

@Component({
  selector: 'app-cuadrado-memotest',
  templateUrl: './cuadrado-memotest.component.html',
  styleUrls: ['./cuadrado-memotest.component.scss']
})
export class CuadradoMemotestComponent implements OnInit {

  @Input() image: ImagenMemotest;
  @Input() disabled: boolean;
  @Output() imgSelection: EventEmitter<void> = new EventEmitter<void>();
  public estados = EstadoImagenEnum;

  constructor() {  }

  ngOnInit() {
    console.log('MemotestComponent: ' + this.image)
  }

}
