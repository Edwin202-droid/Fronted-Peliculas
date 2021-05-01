import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { generoDTO } from 'src/app/interfaces/genero';
import { PeliculaDTO } from 'src/app/interfaces/pelicula';
import { GeneroService } from 'src/app/servicios/genero.service';
import { PeliculasService } from 'src/app/servicios/peliculas.service';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private generosService: GeneroService,
    private peliculasService: PeliculasService) { }

  form: FormGroup;
  generos: generoDTO[] = [];
  paginaActual=1;
  cantidadAMostrar= 10;
  cantidadElementos;

  peliculas:PeliculaDTO[];

  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  };

  ngOnInit() {

    //Generos existentes en la base de datos
    this.generosService.obtenerGenerosTodos().subscribe(generos => {
      this.generos = generos;
      this.form = this.formBuilder.group(this.formularioOriginal);

      this.leerValoresURL();
      this.buscarPeliculas(this.form.value)

      this.form.valueChanges.subscribe(valores => {
        
        this.buscarPeliculas(valores);
        this.escribirParametroBusquedaURL();
      });
    });
  }

  private leerValoresURL() {
    this.activatedRoute.queryParams.subscribe((params) => {
      var objeto: any = [];
      if (params.titulo) {
        objeto.titulo = params.titulo;
      }
      if (params.generoId) {
        objeto.generoId = Number(params.generoId);
      }
      if (params.proximosEstrenos) {
        objeto.proximosEstrenos = params.proximosEstrenos;
      }
      if (params.enCines) {
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
    });
  }

  /* Url */
  private escribirParametroBusquedaURL() {
    var queryStrings = [];
    var valoresFormulario = this.form.value;

    if (valoresFormulario.titulo) {
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }
    if (valoresFormulario.generoId != '0') {
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }
    if (valoresFormulario.proximosEstrenos) {
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }
    if (valoresFormulario.enCines) {
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    /* Reescribir la Url */
    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));

  }


  buscarPeliculas(valores: any) {
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadAMostrar;
    this.peliculasService.filtrado(valores).subscribe(response =>{
      this.peliculas = response.body;
      this.escribirParametroBusquedaURL();
      this.cantidadElementos= response.headers.get('cantidadTotalRegistros')
    });
  }

  limpiar() {
    this.form.patchValue(this.formularioOriginal);
  }

  paginatorUpdate(datos:PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadAMostrar = datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }

}
