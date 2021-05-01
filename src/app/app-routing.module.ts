import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Pages */
import { LandingComponent } from './pages/landing/landing.component';

import { CrearPeliculaComponent } from './pages/crear-pelicula/crear-pelicula.component';
import { EditarPeliculaComponent } from './pages/editar-pelicula/editar-pelicula.component';
import { FiltroPeliculasComponent } from './components/filtro-peliculas/filtro-peliculas.component';

import { GenerosComponent } from './pages/generos/generos.component';
import { CrearGeneroComponent } from './pages/crear-genero/crear-genero.component';
import { EditarGeneroComponent } from './pages/editar-genero/editar-genero.component';

import { ActoresComponent } from './pages/actores/actores.component';
import { CrearActorComponent } from './pages/crear-actor/crear-actor.component';
import { EditarActorComponent } from './pages/editar-actor/editar-actor.component';

import { CineComponent } from './pages/cine/cine.component';
import { CrearCineComponent } from './pages/crear-cine/crear-cine.component';
import { EditarCineComponent } from './pages/editar-cine/editar-cine.component';
import { DetallePeliculaComponent } from './pages/detalle-pelicula/detalle-pelicula.component';

const routes: Routes = [
  {path:'', component:LandingComponent},

  {path:'generos', component: GenerosComponent},
  {path:'generos/crear', component:CrearGeneroComponent},
  {path:'generos/editar/:id', component:EditarGeneroComponent},

  {path:'actores', component:ActoresComponent},
  {path:'actores/crear',component:CrearActorComponent},
  {path:'actores/editar/:id', component:EditarActorComponent},

  {path:'cines',component:CineComponent},
  {path:'cines/crear',component:CrearCineComponent},
  {path:'cines/editar/:id', component:EditarCineComponent},

  {path:'pelicula/:id',component:DetallePeliculaComponent},
  {path:'peliculas/crear', component:CrearPeliculaComponent},
  {path:'peliculas/editar/:id', component:EditarPeliculaComponent},
  {path:'peliculas/buscar', component: FiltroPeliculasComponent},

  {path:'**', redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
