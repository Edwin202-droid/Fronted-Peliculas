import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreacionDTO, actorDTO } from 'src/app/interfaces/actor';
import { ActoresService } from 'src/app/servicios/actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit { 

  constructor( private activateRoute: ActivatedRoute, private router:Router, private actoresService: ActoresService) { }

  modelo: actorDTO;

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.actoresService.obtenerPorId(params.id).subscribe(genero =>{
        this.modelo= genero;
      }, /* Ante un error */
        ()=> this.router.navigate(['/generos']))
    });                         
  }

  guardarCambios(actor:actorCreacionDTO){
    this.actoresService.editarActor(this.modelo.id, actor).subscribe(()=>{
      this.router.navigate(['/actores']);
    });
  }

}
