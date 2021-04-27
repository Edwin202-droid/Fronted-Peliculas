import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { toBase64 } from './utilidades-imagenes';

@Component({
  selector: 'app-input-imagenes',
  templateUrl: './input-imagenes.component.html',
  styleUrls: ['./input-imagenes.component.css']
})
export class InputImagenesComponent implements OnInit {

  constructor() { }

  imagenBase64: string;

  @Output()archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();
  @Input()urlImagenActual :string


  ngOnInit() {
  }

  change(event){
    if(event.target.files.length > 0){
      /* obtenemos el archivo seleccionado */
      const file : File = event.target.files[0];
      /* Obtenemos la imagen en string, base 64 */
      toBase64(file).then((value:string) => this.imagenBase64 = value)
                    .catch(error => console.log(error)
                    )
      this.archivoSeleccionado.emit(file);
      
      this.urlImagenActual=null;
    }
  }
}
