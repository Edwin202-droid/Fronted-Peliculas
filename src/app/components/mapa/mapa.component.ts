import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { coordenada, coordenadaConMensaje } from 'src/app/interfaces/coordenadas';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  //Para mostrar el nombre del local - no afecta la coordenada
  @Input() coordendasIniciales: coordenadaConMensaje[] = [];

  //Para que el usuario no puede mover el marcador del mapa
  @Input() soloLectura: boolean = false;

  @Output() coordenadaSeleccionada: EventEmitter<coordenada> = new EventEmitter<coordenada>();

  ngOnInit() {
    this.capas = this.coordendasIniciales.map(valor => {
      //Para mostrar el nombre
      let marcador=  marker([valor.latitud, valor.longitud]);
      if(valor.mensaje){
        marcador.bindPopup(valor.mensaje, {autoClose:false, autoPan:false});
      }
      return marcador;
    });
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(-12.218615218043038, -436.9436448812485)
  };

  /* Marcadores */
  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent) {
    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;
    console.log({ latitud, longitud });

    if (!this.soloLectura) {
      const latitud = event.latlng.lat;
      const longitud = event.latlng.lng;
      console.log({ latitud, longitud });

      this.capas = [];
      this.capas.push(marker([latitud, longitud]));
      this.coordenadaSeleccionada.emit({ latitud: latitud, longitud: longitud });
    }
  }
}
