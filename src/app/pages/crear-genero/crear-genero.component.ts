import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { generoCreacionDTO } from 'src/app/interfaces/genero';
import { GeneroService } from 'src/app/servicios/genero.service';
;

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent {

  constructor(private router:Router,
              private generoService: GeneroService) { }

  guardarCambios( genero : generoCreacionDTO){
    console.log(genero);
    this.generoService.crearGenero(genero).subscribe(()=>{
      this.router.navigate(['/generos']);
    }, error => console.error(error));
  }


}
