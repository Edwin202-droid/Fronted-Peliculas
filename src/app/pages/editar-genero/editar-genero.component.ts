import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { generoCreacionDTO, generoDTO } from 'src/app/interfaces/genero';
import { GeneroService } from 'src/app/servicios/genero.service';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  constructor(private router:Router, private generoService: GeneroService, private activateRoute: ActivatedRoute) { }

  modelo: generoDTO;

  ngOnInit() {

    this.activateRoute.params.subscribe(params => {
      this.generoService.obtenerPorId(params.id).subscribe(genero =>{
        this.modelo= genero;
      }, /* Ante un error */
        ()=> this.router.navigate(['/generos']))
    });
  }

  guardarCambios( genero : generoCreacionDTO){
    
    this.generoService.editarGenero(this.modelo.id, genero).subscribe(()=>{
      this.router.navigate(['/generos']);
    });
  }

}
