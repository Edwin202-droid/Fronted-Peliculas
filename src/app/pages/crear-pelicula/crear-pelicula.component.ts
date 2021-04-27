import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculaCreacionDTO } from 'src/app/interfaces/pelicula';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  guardarCambios(pelicula:PeliculaCreacionDTO){
    console.log(pelicula);
    
  }
}
