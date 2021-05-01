import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorPeliculaDTO } from 'src/app/interfaces/actor';
import { PeliculaCreacionDTO, PeliculaDTO } from 'src/app/interfaces/pelicula';
import { MultipleSeleccion } from 'src/app/interfaces/seleccion';
import { PeliculasService } from 'src/app/servicios/peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private activateRoutes:ActivatedRoute, private peliculasServices:PeliculasService, private router:Router) { }

  modelo:PeliculaDTO;
  
  generosSeleccionados:MultipleSeleccion[];
  generosNoSeleccionados: MultipleSeleccion[];

  cinesSeleccionados: MultipleSeleccion[];
  cinesNoSeleccionados: MultipleSeleccion[];

  actoresSeleccionados: actorPeliculaDTO[];

  ngOnInit() : void{
      this.activateRoutes.params.subscribe( params=> {
        this.peliculasServices.putGet(params.id).subscribe(peliculaPutGet => {
          this.modelo = peliculaPutGet.pelicula;

          this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(genero => {
            return <MultipleSeleccion>{ llave: genero.id, valor: genero.nombre }
          });
          this.generosSeleccionados = peliculaPutGet.cinesSeleccionados.map(genero => {
            return <MultipleSeleccion>{ llave: genero.id, valor: genero.nombre }
          });

          this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map(cines=>{
            return <MultipleSeleccion>{llave: cines.id, valor:cines.nombre}
          });

          this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map(cines=>{
            return <MultipleSeleccion>{llave: cines.id, valor:cines.nombre}
          });
          this.actoresSeleccionados = peliculaPutGet.actores;

        });
      });
  }

  guardarCambios(pelicula:PeliculaCreacionDTO){
    this.peliculasServices.editarPelicula(this.modelo.id, pelicula).subscribe(()=>{
        this.router.navigate(['/pelicula/'+ this.modelo.id])
    });
  }

}
