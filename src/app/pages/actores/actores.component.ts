import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { actorDTO } from 'src/app/interfaces/actor';
import { ActoresService } from 'src/app/servicios/actores.service';

@Component({
  selector: 'app-actores',
  templateUrl: './actores.component.html',
  styleUrls: ['./actores.component.css']
})
export class ActoresComponent implements OnInit {

  constructor(private actoresService:ActoresService) { }

  actores:actorDTO[];
  columnasAMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit() {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.actoresService.obtenerActores(pagina,cantidadElementosAMostrar).subscribe((respuesta:HttpResponse<actorDTO[]>)=>{ 
      this.actores= respuesta.body;
      console.log(respuesta.headers.get("cantidadTotalRegistros"));
      this.cantidadTotalRegistros= respuesta.headers.get("cantidadTotalRegistros");
    });
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros (this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  borrar(id:number){
    this.actoresService.borrarActor(id).subscribe(()=>{
      //Despues de borrado, mostramos la pagina 
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    });
  }


}
