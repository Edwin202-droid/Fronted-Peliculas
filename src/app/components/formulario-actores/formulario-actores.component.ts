import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from 'src/app/interfaces/actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form:FormGroup;

  @Input()modelo: actorDTO;

  @Output()submit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  imagenCambiada= false;

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['',Validators.required],
      fechaNacimiento: '',
      foto:'',
      biografia:'',
    });
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  Onsubmit(){
    if(!this.imagenCambiada){
      this.form.patchValue({'foto':null});
    }
    this.submit.emit(this.form.value);
  }

  archivoSeleccionado(file){
    this.imagenCambiada= true;
    this.form.get('foto').setValue(file);
  }
  cambioMardown(texto:string){
    this.form.get('biografia').setValue(texto);
  }

}
