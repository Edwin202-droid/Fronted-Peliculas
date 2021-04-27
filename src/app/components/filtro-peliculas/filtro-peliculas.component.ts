import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
              private location:Location,
              private activatedRoute:ActivatedRoute) { }

  form:FormGroup;
  generos = [
    {id:1, nombre:'Drama'},
    {id:2, nombre: 'Accion'},
    {id:3, nombre: 'Comedia'}
  ];

  peliculas=[
    {titulo:'SpiderMan', enCines:false, proximosEstrenos:true, generos: [1,2], poster:'https://i.pinimg.com/originals/6c/77/5f/6c775f7a7b90a7f8620897c6bdd0e839.jpg'},
    {titulo:'Zack Snyder: Justice League', enCines: true, proximosEstremos:false, generos: [1,2], poster:'https://blogdesuperheroes.es/wp-content/plugins/BdSGallery/BdSGaleria/102651.jpg'},
    {titulo: 'Dragon Ball Super: Broly', enCines: false, proximosEstrenos: false, generos: [3],poster:'https://i.pinimg.com/originals/22/71/cd/2271cdf320e18978dae0a5cfb3ea6496.jpg'},
  ]

  peliculasOriginal= this.peliculas;
  formularioOriginal= {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  };

  ngOnInit() {

    this.form= this.formBuilder.group(this.formularioOriginal);
    
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value)

    this.form.valueChanges.subscribe(valores =>{
      this.peliculas= this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametroBusquedaURL();
    });
  }

  private leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params)=>{
      var objeto:any = [];
      if(params.titulo){
        objeto.titulo = params.titulo;
      }
      if(params.generoId){
        objeto.generoId= Number(params.generoId);
      }
      if(params.proximosEstrenos){
        objeto.proximosEstrenos = params.proximosEstrenos;
      }
      if(params.enCines){
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
    });
  }

  /* Url */
  private escribirParametroBusquedaURL(){
    var queryStrings = [];
    var valoresFormulario = this.form.value;

    if(valoresFormulario.titulo){
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }
    if(valoresFormulario.generoId != '0'){
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }
    if(valoresFormulario.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }
    if(valoresFormulario.enCines){
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    /* Reescribir la Url */
    this.location.replaceState('peliculas/buscar',queryStrings.join('&'));

  }


  buscarPeliculas(valores:any){
    if(valores.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !==  -1);
    }
    if(valores.generoId){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !==  -1);
    }
    if(valores.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }
    if(valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

}
