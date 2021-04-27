import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cineCreacionDTO } from 'src/app/interfaces/cine';
import { coordenada } from 'src/app/interfaces/coordenadas';

@Component({
  selector: 'app-formulario-cines',
  templateUrl: './formulario-cines.component.html',
  styleUrls: ['./formulario-cines.component.css']
})
export class FormularioCinesComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  @Input()modelo:  cineCreacionDTO;

  @Output()guardarCambios: EventEmitter<cineCreacionDTO> = new EventEmitter<cineCreacionDTO>();

  coordenaInicial: coordenada[]=[];
  form:FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre:['',Validators.required],
      latitud:['',Validators.required],
      longitud:['',Validators.required],
    });
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
      this.coordenaInicial.push({latitud:this.modelo.latitud, longitud:this.modelo.longitud});
    }
  }
  coordenadaSeleccion(coordenada:coordenada){
    this.form.patchValue(coordenada);
  }

  OnSubmit(){
    this.guardarCambios.emit(this.form.value);
  }

}
