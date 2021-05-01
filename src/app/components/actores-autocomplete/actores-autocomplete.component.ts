import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatTable } from '@angular/material';
import { actorPeliculaDTO } from 'src/app/interfaces/actor';
import { ActoresService } from 'src/app/servicios/actores.service';

@Component({
  selector: 'app-actores-autocomplete',
  templateUrl: './actores-autocomplete.component.html',
  styleUrls: ['./actores-autocomplete.component.css']
})
export class ActoresAutocompleteComponent implements OnInit {

  constructor(private actoresServices:ActoresService) { }

  control:FormControl = new FormControl();
  actoresAMostrar: actorPeliculaDTO[]=[];

  @Input()actoresSeleccionados: actorPeliculaDTO[]=[];

  columnasAMostrar= ['imagen', 'nombre', 'personaje', 'acciones'];
  
  /* Actualizar la tabla */
  @ViewChild(MatTable, null) table: MatTable<any>;

  ngOnInit() {
    this.control.valueChanges.subscribe(nombre => {
      this.actoresServices.obtenerPorNombre(nombre).subscribe(actores =>{
        this.actoresAMostrar = actores;
      });
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
