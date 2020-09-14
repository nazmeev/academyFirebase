import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../shared/interfaces/film.interface';
import { FilmsService } from '../shared/services/films.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})

export class FilmComponent{
  public filmId: number
  public filmItem: Film
  public imgPath = this.filmsService.bigBackPath

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService
  ){
    this.route.params.subscribe(params => {
      this.filmId = params.filmId
      this.getFilm(this.filmId)
    })
  }

  getFilm(filmId){
    this.filmsService.loadFilm(filmId).subscribe(
      (result: any) => this.filmItem = result
    )
  }
  
}