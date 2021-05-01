import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LandingPageDTO, PeliculaCreacionDTO, PeliculaDTO, PeliculaPostGet, PeliculaPutGet } from '../interfaces/pelicula';
import { formatearfecha } from './actores.service';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http:HttpClient) { }

  private apiURL = environment.apiURL + 'peliculas';

  public obtenerPeliculas():Observable<LandingPageDTO>{
    return this.http.get<LandingPageDTO>(this.apiURL);
  }

  public obtenerPorId(id:number):Observable<PeliculaDTO>{
    return this.http.get<PeliculaDTO>(`${this.apiURL}/${id}`);
  }

  //mostrar cines y generos
  public postGet():Observable<PeliculaPostGet>{
    return this.http.get<PeliculaPostGet>(`${this.apiURL}/postget`);
  }
  //Servicio para mostrar los datos de la pelicula a editar
  public putGet(id:number):Observable<PeliculaPutGet>{
    return this.http.get<PeliculaPutGet>(`${this.apiURL}/putget/${id}`);
  }

  //Servicio filtrado de pelicula
  public filtrado(valores: any):Observable<any>{
    const params = new HttpParams({fromObject:valores});
    return this.http.get<PeliculaDTO[]>(`${this.apiURL}/filtrar`,{params, observe: 'response'});
  }

  public crearPelicula(pelicula: PeliculaCreacionDTO):Observable<number>{
    const formData = this.ConstruirFormData(pelicula);
    return this.http.post<number>(this.apiURL,formData);
  }

  public editarPelicula(id:number, pelicula: PeliculaCreacionDTO){
    const formData = this.ConstruirFormData(pelicula);
    return this.http.put(`${this.apiURL}/${id}`,formData);
  }

  public borrar(id:number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  //para recibir el poster
  private ConstruirFormData(pelicula: PeliculaCreacionDTO):FormData{
    const formData = new FormData();

    formData.append('titulo',pelicula.titulo);
    formData.append('resumen',pelicula.resumen);
    formData.append('trailer',pelicula.trailer);
    formData.append('enCines', String(pelicula.enCines));

    if(pelicula.fechaLanzamiento){
      formData.append('fechaLanzamiento', formatearfecha(pelicula.fechaLanzamiento));
    }

    if(pelicula.poster){
      formData.append('poster',pelicula.poster);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cineIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
  }
}
