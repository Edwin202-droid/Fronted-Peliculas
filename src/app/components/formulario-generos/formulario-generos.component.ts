import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { generoCreacionDTO } from 'src/app/interfaces/genero';
import { primeraLetraMayuscula } from '../validaciones/primeraLetraMayuscula';

@Component({
  selector: 'app-formulario-generos',
  templateUrl: './formulario-generos.component.html',
  styleUrls: ['./formulario-generos.component.css']
})
export class FormularioGenerosComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @Input()modelo: generoCreacionDTO;

  @Output()onSubmit: EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>();
  form: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.minLength(3), primeraLetraMayuscula()]]/* primeraLetraMayuscula() le quitamos la validacion del frontedn, y usamos del backend */
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }

  }

  guardarGenero(){
    this.onSubmit.emit(this.form.value);
  }

  obtenerErrorCampoNombre(){
    var campo = this.form.get('nombre');
    if(campo.hasError('required')){
      return 'El campo nombre es requerido';
    }

    if(campo.hasError('minlength')){
      return 'La longitud minima es de 3 caracteres'
    }

    if(campo.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    return '';
  }
}
