import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PeliculaDTO } from 'src/app/interfaces/pelicula';
import { PeliculasService } from 'src/app/servicios/peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  
  constructor(private peliculaService:PeliculasService) { }
  @Input()
  peliculas: PeliculaDTO[];

  @Output()borrado:EventEmitter<void>= new EventEmitter<void>();

  ngOnInit(): void {
    
  }

  
  borrar(peliculaId:number){
    this.peliculaService.borrar(peliculaId).subscribe(()=>{
      this.borrado.emit();
    });
  }


}
