import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Film } from '../shared/interfaces/film.interface';
import { FilmsService } from '../shared/services/films.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit{
  public filmId: number
  public filmItem: Film
  public imgPath = this.filmsService.bigBackPath

  constructor(
    private activateRouter: ActivatedRoute,
    private route: ActivatedRoute,
    private filmsService: FilmsService,
  ){
    this.route.params.subscribe(params => {
      this.filmId = params.filmId
      this.getFilm(this.filmId)
    })
  }
  ngOnInit(){
    // this.activateRouter.paramMap.subscribe((params: Params) => {
    //   const id = +params.get('id')
    //   this.filmsService.loadFilm(id).subscribe(
    //     (result: any) => this.filmItem = result
    //   )
    // })
  }

  getFilm(filmId){
    this.filmsService.loadFilm(filmId).subscribe(
      (result: any) => this.filmItem = result
    )
  }
  
}