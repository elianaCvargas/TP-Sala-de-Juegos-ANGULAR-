import { EstadisticaTablaComponent } from '../componentes/estadistica-tabla/estadistica-tabla.component';
import { EstadoImagenEnum } from '../enum/estadoImagenEnum';

export class ImagenMemotest {
  public ruta: string;
  public estado: EstadoImagenEnum;
  constructor(ruta: string, estado: EstadoImagenEnum) {
    this.ruta = ruta;
    this.estado = estado;
  }
}
