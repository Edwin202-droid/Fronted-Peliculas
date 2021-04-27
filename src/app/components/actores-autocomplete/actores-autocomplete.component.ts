import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatTable } from '@angular/material';

@Component({
  selector: 'app-actores-autocomplete',
  templateUrl: './actores-autocomplete.component.html',
  styleUrls: ['./actores-autocomplete.component.css']
})
export class ActoresAutocompleteComponent implements OnInit {

  constructor() { }

  control:FormControl = new FormControl();
  actores = [ {nombre: 'Tom Holland', personaje: '' , foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/1200px-Tom_Holland_by_Gage_Skidmore.jpg'},
              {nombre: 'Tom Hanks', personaje: '' , foto: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Tom_Hanks_TIFF_2019.jpg'},
              {nombre: 'Samuel L. Jackson', personaje: '' , foto:'https://upload.wikimedia.org/wikipedia/commons/a/a9/Samuel_L._Jackson_2019_by_Glenn_Francis.jpg'},
  ];

  actoresOriginal= this.actores;

  actoresSeleccionados=[];

  columnasAMostrar= ['imagen', 'nombre', 'personaje', 'acciones'];
  
  /* Actualizar la tabla */
  @ViewChild(MatTable, null) table: MatTable<any>;

  ngOnInit() {
    this.control.valueChanges.subscribe(valor => {
      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(actor => actor.nombre.indexOf(valor) !== -1 );
    });
  }

  optionSelected(event:MatAutocompleteSelectedEvent){
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if(this.table !== undefined){
      this.table.renderRows();
    }
  }

  eliminar(actor){
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre === actor.nombre);

    this.actoresSeleccionados.splice(indice ,1 );
    this.table.renderRows();
  }
  finalizaArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor === event.item.data)

    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);

    this.table.renderRows();
  }
}
