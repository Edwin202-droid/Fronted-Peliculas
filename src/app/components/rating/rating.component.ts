import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input()maximoRating = 5;
  @Input()ratingSeleccionado= 0;

  @Output()rated:EventEmitter<number> = new EventEmitter<number>();

  maximoRatingArr = [];
  votado=false;
  ratingAnterior;

  constructor() { }

  ngOnInit() {
    this.maximoRatingArr = Array(this.maximoRating).fill(0);
  }

  manejarMouseEnter(index:number){
    this.ratingSeleccionado = index + 1;
  }
  manejarMouseLeave(index:number){
    if(this.ratingAnterior !== 0){
      this.ratingSeleccionado = this.ratingAnterior;
    }else{
      /* Si el usuario ya voto, no se puede hacer nada */
      this.ratingSeleccionado = 0;
    }
  }
  rate(index:number):void{
    this.ratingSeleccionado = index + 1;
    this.votado =true;
    this.ratingAnterior = this.ratingSeleccionado;

    /* Emitiendo el valor seleccionado hacie el hijo */
    this.rated.emit(this.ratingSeleccionado);
  }
}
