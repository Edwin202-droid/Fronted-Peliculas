import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculaCreacionDTO } from 'src/app/interfaces/pelicula';
import { MultipleSeleccion } from 'src/app/interfaces/seleccion';
import { PeliculasService } from 'src/app/servicios/peliculas.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {


  constructor(private peliculasServices: PeliculasService, private router: Router) { }

  generosNoSeleccionados: MultipleSeleccion[];
  cinesNoSeleccionados: MultipleSeleccion[];

  ngOnInit() {
    this.peliculasServices.postGet().subscribe(resultado => {
      this.generosNoSeleccionados = resultado.generos.map(genero => {
        return <MultipleSeleccion>{ llave: genero.id, valor: genero.nombre }
      });
      this.cinesNoSeleccionados = resultado.cines.map(cines=>{
        return <MultipleSeleccion>{llave: cines.id, valor:cines.nombre}
      });
    });
  }

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    
    this.peliculasServices.crearPelicula(pelicula).subscribe((id:number)=> this.router.navigate(['/pelicula/'+id]),
    )

  }
}
