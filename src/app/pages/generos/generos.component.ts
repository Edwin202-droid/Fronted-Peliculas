
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, PageEvent } from '@angular/material';
import { generoDTO } from 'src/app/interfaces/genero';
import { GeneroService } from 'src/app/servicios/genero.service';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent implements OnInit {

  generos:generoDTO[];
  columnasAMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(private generoService:GeneroService ) { }

  ngOnInit() {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.generoService.obtenerGenerosPaginado(pagina,cantidadElementosAMostrar).subscribe((respuesta:HttpResponse<generoDTO[]>)=>{ 
      this.generos= respuesta.body;
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
    this.generoService.borrarGenero(id).subscribe(()=>{
      //Despues de borrado, mostramos la pagina 
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    });
  }

}
