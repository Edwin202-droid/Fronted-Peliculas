import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorPeliculaDTO } from 'src/app/interfaces/actor';
import { PeliculaCreacionDTO, PeliculaDTO } from 'src/app/interfaces/pelicula';
import { MultipleSeleccion } from 'src/app/interfaces/seleccion';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  form: FormGroup

  @Input()modelo: PeliculaDTO

  @Output()OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();

  @Input()generosNoSeleccionados: MultipleSeleccion[];

  @Input()generosSeleccionados: MultipleSeleccion[]=[];

  @Input()cinesNoSeleccionados: MultipleSeleccion[];
  
  @Input()cinesSeleccionados: MultipleSeleccion[]=[];

  @Input()actoresSeleccionados: actorPeliculaDTO[]=[];

  //NoPostear de nuevo la imagen, si el usuario no actualiza la foto
  imagenCambiada= false;

  ngOnInit() {
    this.form = this.formBuilder.group({
      titulo: ['',Validators.required],
      resumen: ['', Validators.required],
      enCines: false,
      trailer: '',
      fechaLanzamiento:'',
      poster:'',
      generosIds:'',
      cinesIds:'',
      actores:'',
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambio(){

    const generosIds = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosIds').setValue(generosIds);

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesIds').setValue(cinesIds);

    //mandar los actores que hemos seleccionado
    const actores = this.actoresSeleccionados.map(val =>{
      return {id: val.id, personaje:val.personaje}
    });
    this.form.get('actores').setValue(actores);

    //No mandar de nuevo la imagen , si no lo actualiza
    if(!this.imagenCambiada){
      this.form.patchValue({'poster':null})
    }
    
    this.OnSubmit.emit(this.form.value);
  }

  achivoSeleccionado(archivo:File){
    this.form.get('poster').setValue(archivo);
    this.imagenCambiada = true;
  }

  changeMarkdown(texto){
    this.form.get('resumen').setValue(texto);
  }

}
