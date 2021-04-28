import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { actorCreacionDTO } from 'src/app/interfaces/actor';
import { ActoresService } from 'src/app/servicios/actores.service';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent implements OnInit {

  constructor(private router:Router, private actoresService:ActoresService) { }

  ngOnInit() {
  }
  
  guardarCambio(actor: actorCreacionDTO){
    
    this.actoresService.crearActor(actor).subscribe(()=>{
      this.router.navigate(['/actores']);
    });
  }

}
