import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cineCreacionDTO, cineDTO } from 'src/app/interfaces/cine';
import { CinesService } from 'src/app/servicios/cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor(private router:Router, private cineServices: CinesService, private activateRoute: ActivatedRoute) { }

  modelo: cineDTO;

  ngOnInit() {

    this.activateRoute.params.subscribe(params => {
      this.cineServices.obtenerPorId(params.id).subscribe(genero =>{
        this.modelo= genero;
      }, /* Ante un error */
        ()=> this.router.navigate(['/cines']))
    });
  }

  guardarCine( cine: cineCreacionDTO){
    
    this.cineServices.editarCine(this.modelo.id, cine).subscribe(()=>{
      this.router.navigate(['/generos']);
    });
  }
}
