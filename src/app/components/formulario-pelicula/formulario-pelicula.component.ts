import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  generosNoSeleccionados: MultipleSeleccion[] = [
    {llave: 1, valor: 'Drama'},
    {llave: 2, valor: 'Comedia'},
    {llave: 3, valor: 'Accion'},
  ];

  generosSeleccionados: MultipleSeleccion[]=[];

  cinesNoSeleccionados: MultipleSeleccion[]=[
    {llave: 1, valor: 'CineStar'},
    {llave: 2, valor: 'CinePlanet'},
  ];
  
  cinesSeleccionados: MultipleSeleccion[]=[];

  ngOnInit() {
    this.form = this.formBuilder.group({
      titulo: ['',Validators.required],
      resumen: ['', Validators.required],
      enCines: false,
      trailer: '',
      fechaLanzamiento:'',
      poster:'',
      generosId:'',
      cinesId:'',
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambio(){

    const generosIds = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosId').setValue(generosIds);

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesId').setValue(cinesIds);
    
    this.OnSubmit.emit(this.form.value);
  }

  achivoSeleccionado(archivo:File){
    this.form.get('poster').setValue(archivo);
  }

  changeMarkdown(texto){
    this.form.get('resumen').setValue(texto);
  }

}
