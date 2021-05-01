import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { coordenada, coordenadaConMensaje } from 'src/app/interfaces/coordenadas';
import { PeliculaDTO } from 'src/app/interfaces/pelicula';
import { PeliculasService } from 'src/app/servicios/peliculas.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {

  pelicula:PeliculaDTO;

  fechaLanzamiento:Date;
  trailerURL: SafeResourceUrl;
  coordenadas: coordenadaConMensaje[]=[];

  constructor(private peliculasService:PeliculasService, 
              private activatedRoute: ActivatedRoute,
              private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      this.peliculasService.obtenerPorId(params.id).subscribe(pelicula =>{

        console.log(pelicula);
        
        this.pelicula = pelicula;
        
        this.fechaLanzamiento= new Date(this.pelicula.fechaLanzamiento);
        this.trailerURL= this.generarURLYoutubeEmbed(this.pelicula.trailer);
        this.coordenadas= pelicula.cine.map(cine =>{
          return {longitud: cine.longitud, latitud:cine.latitud, mensaje:cine.nombre}
        });
      });
    })
  }
  //Recibir el video de youtube
  generarURLYoutubeEmbed(url:any):SafeResourceUrl{
    if(!url){ return ''}
    //Extraemos el id del video
    var video_id= url.split('v=')[1];
    var posicionAmpersan = video_id.indexOf('&');

    if(posicionAmpersan !== -1){
      video_id= video_id.substring(0, posicionAmpersan);
    }
    //nos aseguramos de que pase una url segura
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video_id}`)
  }

}
