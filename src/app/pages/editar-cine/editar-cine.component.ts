import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cineCreacionDTO, cineDTO } from 'src/app/interfaces/cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor(private activateRoutes:ActivatedRoute) { }

  modelo: cineDTO = {nombre: "CineStar", latitud :-12.209969045075784, longitud:-436.9309043884278}

  ngOnInit() {
    this.activateRoutes.params.subscribe(params =>{
      //alert(params.id);
    });                                                    
  }

  guardarCine(cine:cineCreacionDTO){                                                                                                                                                                                                                                    
  }

}
