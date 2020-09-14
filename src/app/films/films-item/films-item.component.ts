import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-films-item',
  templateUrl: './films-item.component.html',
  styleUrls: ['./films-item.component.css']
})
export class FilmsItemComponent implements OnInit {

  @Input() filmItem: any;  
  @Input() imgPath: string;
  @Output() favorited = new EventEmitter<number>();
  @Output() unfavorited = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {}

  addFavorite(id: number) {
    console.log('addFavoriteItems')
    this.favorited.emit(id);
  }
  removeFavorite(id: number) {
    console.log('FilmsItemComponent removeFavoriteItems')
    this.unfavorited.emit(id);
  }
}
