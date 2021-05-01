import { Component, OnInit } from '@angular/core';
import { PeliculaDTO } from 'src/app/interfaces/pelicula';
import { PeliculasService } from 'src/app/servicios/peliculas.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  constructor(private peliculaSerivce:PeliculasService){}

  ngOnInit(): void {
    this.peliculaSerivce.obtenerPeliculas().subscribe(landingPage =>{
      this.peliculasEnCines = landingPage.enCines;
      this.peliculasProximosEstrenos= landingPage.proximosEstrenos;
    });
  }
  
  peliculasEnCines: PeliculaDTO[];
  peliculasProximosEstrenos:PeliculaDTO[];

  borrado(){
    this.peliculaSerivce.obtenerPeliculas().subscribe(landingPage =>{
      this.peliculasEnCines = landingPage.enCines;
      this.peliculasProximosEstrenos= landingPage.proximosEstrenos;
    });
  }

  manejarRated(voto: number): void{
    alert(voto);
  }
}
