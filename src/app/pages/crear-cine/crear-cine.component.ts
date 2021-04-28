import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cineCreacionDTO } from 'src/app/interfaces/cine';
import { CinesService } from 'src/app/servicios/cines.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent{

  constructor(private router: Router,private cineServices:CinesService) { }

  guardarCambios(cine: cineCreacionDTO) {
    console.log(cine);
    this.cineServices.crearCine(cine).subscribe(() => {
      this.router.navigate(['/cines']);
    }, error => console.error(error));
  }


}
