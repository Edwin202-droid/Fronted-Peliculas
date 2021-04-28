import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { cineDTO } from 'src/app/interfaces/cine';
import { CinesService } from 'src/app/servicios/cines.service';

@Component({
  selector: 'app-cine',
  templateUrl: './cine.component.html',
  styleUrls: ['./cine.component.css']
})
export class CineComponent implements OnInit {

  cines:cineDTO[];
  columnasAMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(private cineServices:CinesService ) { }

  ngOnInit() {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.cineServices.obtenerCines(pagina,cantidadElementosAMostrar).subscribe((respuesta:HttpResponse<cineDTO[]>)=>{ 
      this.cines= respuesta.body;
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
    this.cineServices.borrarCine(id).subscribe(()=>{
      //Despues de borrado, mostramos la pagina 
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    });
  }

}
