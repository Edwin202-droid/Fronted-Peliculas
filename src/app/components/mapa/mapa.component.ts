import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { coordenada } from 'src/app/interfaces/coordenadas';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  @Input()coordendasIniciales: coordenada[]=[];

  @Output()coordenadaSeleccionada: EventEmitter<coordenada> = new EventEmitter<coordenada>();

  ngOnInit() {
    this.capas= this.coordendasIniciales.map(valor => marker([valor.latitud, valor.longitud]))
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(-12.218615218043038, -436.9436448812485)
  };

  /* Marcadores */
  capas: Marker<any>[]= [];

  manejarClick(event: LeafletMouseEvent){
    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;
    console.log({latitud,longitud});
    
    this.capas = [];
    this.capas.push(marker([latitud,longitud]));
    this.coordenadaSeleccionada.emit({latitud: latitud , longitud:longitud});
  }
}
