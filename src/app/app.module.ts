import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import "leaflet/dist/images/marker-shadow.png";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { RatingComponent } from './components/rating/rating.component';
import { ListadoPeliculasComponent } from './peliculas/listado-peliculas/listado-peliculas.component';
import { ListadoGenericoComponent } from './components/listado-generico/listado-generico.component';
import { LandingComponent } from './pages/landing/landing.component';
import { GenerosComponent } from './pages/generos/generos.component';
import { CrearGeneroComponent } from './pages/crear-genero/crear-genero.component';
import { ActoresComponent } from './pages/actores/actores.component';
import { CrearActorComponent } from './pages/crear-actor/crear-actor.component';
import { CrearPeliculaComponent } from './pages/crear-pelicula/crear-pelicula.component';
import { CrearCineComponent } from './pages/crear-cine/crear-cine.component';
import { CineComponent } from './pages/cine/cine.component';
import { EditarActorComponent } from './pages/editar-actor/editar-actor.component';
import { EditarPeliculaComponent } from './pages/editar-pelicula/editar-pelicula.component';
import { EditarCineComponent } from './pages/editar-cine/editar-cine.component';
import { EditarGeneroComponent } from './pages/editar-genero/editar-genero.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioGenerosComponent } from './components/formulario-generos/formulario-generos.component';
import { FiltroPeliculasComponent } from './components/filtro-peliculas/filtro-peliculas.component';
import { FormularioActoresComponent } from './components/formulario-actores/formulario-actores.component';
import { InputImagenesComponent } from './components/input-imagenes/input-imagenes.component';
import { InputMarkdownComponent } from './components/input-markdown/input-markdown.component';
import { MarkdownModule } from 'ngx-markdown';
import { FormularioCinesComponent } from './components/formulario-cines/formulario-cines.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapaComponent } from './components/mapa/mapa.component';
import { FormularioPeliculaComponent } from './components/formulario-pelicula/formulario-pelicula.component';
import { SelectorMultipleComponent } from './components/selector-multiple/selector-multiple.component';
import { ActoresAutocompleteComponent } from './components/actores-autocomplete/actores-autocomplete.component';
import { HttpClientModule } from '@angular/common/http';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DetallePeliculaComponent } from './pages/detalle-pelicula/detalle-pelicula.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RatingComponent,
    ListadoPeliculasComponent,
    ListadoGenericoComponent,
    LandingComponent,
    GenerosComponent,
    CrearGeneroComponent,
    ActoresComponent,
    CrearActorComponent,
    CrearPeliculaComponent,
    CrearCineComponent,
    CineComponent,
    EditarActorComponent,
    EditarPeliculaComponent,
    EditarCineComponent,
    EditarGeneroComponent,
    FormularioGenerosComponent,
    FiltroPeliculasComponent,
    FormularioActoresComponent,
    InputImagenesComponent,
    InputMarkdownComponent,
    FormularioCinesComponent,
    MapaComponent,
    FormularioPeliculaComponent,
    SelectorMultipleComponent,
    ActoresAutocompleteComponent,
    DetallePeliculaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /* Angular Materia */
    BrowserAnimationsModule,
    /* Importaciones que usaremos del Material */
    MaterialModule,
    /* Formularios, binding doble via */
    ReactiveFormsModule,
    FormsModule,

    MarkdownModule.forRoot(),
    /* Mapa */
    LeafletModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

