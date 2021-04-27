import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { actorCreacionDTO } from 'src/app/interfaces/actor';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  guardarCambio(actor: actorCreacionDTO){
    
    console.log(actor);
    
    //this.router.navigate(['/actores']);
  }

}
