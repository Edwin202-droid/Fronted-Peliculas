import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.peliculasEnCines = [{
        titulo: 'Spider-Man',
        fechaLanzamiento: new Date(),
        precio: 1400.99,
        poster:'https://i.pinimg.com/originals/6c/77/5f/6c775f7a7b90a7f8620897c6bdd0e839.jpg'
      },
      {
        titulo: 'Moana',
        fechaLanzamiento: new Date('2016-11-14'),
        precio: 300.99
      }]
    }, 500);
  }
  title = 'Al valor que yo quiera';
  ocultar = false;
  peliculasEnCines;
  peliculasProximosEstrenos = [];

  manejarRated(voto: number): void{
    alert(voto);
  }
}
