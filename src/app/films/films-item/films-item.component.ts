import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-films-item',
  templateUrl: './films-item.component.html',
  styleUrls: ['./films-item.component.css']
})
export class FilmsItemComponent {

  @Input() filmItem: any;  
  @Input() imgPath: string;
  @Output() favorited = new EventEmitter<number>();
  @Output() unfavorited = new EventEmitter<number>();

  constructor() { }

  addFavorite(id: number) {
    this.favorited.emit(id);
  }
  removeFavorite(id: number) {
    this.unfavorited.emit(id);
  }
}
