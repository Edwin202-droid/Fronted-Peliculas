import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaCreacionDTO, PeliculaDTO } from 'src/app/interfaces/pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private activateRoutes:ActivatedRoute) { }

  modelo:PeliculaDTO = {
    titulo: 'SpiderMan', trailer:'abc', enCines: true , resumen: 'cosa',
    fechaLanzamiento: new Date(), poster:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spiderman-homecoming-poster-1551691492.jpg'
  }

  ngOnInit() {
    this.activateRoutes.params.subscribe(params =>{
      //alert(params.id);
    });
  }

  guardarCambios(pelicula:PeliculaCreacionDTO){

  }

}
