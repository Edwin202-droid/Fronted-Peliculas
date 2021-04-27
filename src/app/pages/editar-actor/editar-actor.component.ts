import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorCreacionDTO, actorDTO } from 'src/app/interfaces/actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  constructor( private activateRoutes: ActivatedRoute) { }

  modelo: actorDTO = {nombre: 'Edwin', fechaNacimiento:new Date(), foto:'https://m.media-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1_UX214_CR0,0,214,317_AL_.jpg'};

  ngOnInit() {
    this.activateRoutes.params.subscribe(params =>{
      //alert(params.id);
    });
                                
  }

  guardarCambios(actor:actorCreacionDTO){
    console.log(actor);
    
  }

}
