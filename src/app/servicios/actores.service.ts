import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { actorCreacionDTO, actorDTO, actorPeliculaDTO } from '../interfaces/actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  private apiURL = environment.apiURL + 'actores';

  constructor(private http: HttpClient) { }

  public obtenerActores(pagina:number,cantidadRegistrosAMostrar:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina',pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<actorDTO[]>(this.apiURL, {observe:'response', params});
  }

  public obtenerPorId(id:number):Observable<actorDTO>{
    return this.http.get<actorDTO>(`${this.apiURL}/${id}`);
  } 

  public borrarActor(id:number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  public crearActor(actor:actorCreacionDTO){

    const formData = this.construirFormData(actor);

    return this.http.post(this.apiURL, formData);
  }

  public editarActor(id: number, actor: actorCreacionDTO){
    return this.http.put(`${this.apiURL}/${id}`, actor);
  }

  public obtenerPorNombre(nombre:string):Observable<actorPeliculaDTO[]>{
    //paso el string a json para buscarlo en el backend
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<actorPeliculaDTO[]>(`${this.apiURL}/buscarPorNombre`, JSON.stringify(nombre), {headers});
  }

  //Para poder recibir la imagen
  private construirFormData(actor:actorCreacionDTO):FormData{
    const formData = new FormData();

    formData.append('nombre',actor.nombre);

    if(actor.biografia){
      formData.append('biografia',actor.biografia);
    }
    
    if(actor.fechaNacimiento){
      formData.append('fechaNacimiento', formatearfecha(actor.fechaNacimiento));
    }

    if(actor.foto){
      formData.append('foto',actor.foto);
    }

    return formData

  }


}

export function formatearfecha(date:Date) {

  date = new Date(date);
  const formatto = new Intl.DateTimeFormat('en',{
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const [
    {value: month},,
    {value: day},,
    {value: year}
  ] = formatto.formatToParts(date);

  return `${year}-${month}-${day}`;
}
