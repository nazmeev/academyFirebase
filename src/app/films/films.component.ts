import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FilmsService } from '../shared/services/films.service';
import { FavoriteService } from '../shared/services/favorite.service';
import { Favorite } from '../shared/interfaces/favorite.interface';
import { forkJoin, of } from 'rxjs';
import { Film } from '../shared/interfaces/film.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})

export class FilmsComponent implements OnInit {
  public maxPages: number = 4
  public loaded: boolean = false
  public moreActive: boolean = true

  public films: Film[] = []
  public favorites: Favorite[] = []

  public imgPath = this.filmsService.smallImgPath

  constructor(
    private filmsService: FilmsService,
    private favoriteService: FavoriteService,
  ) {  }

  ngOnInit(): void {
    console.log('ngOnInit');
    (this.films.length)? this.loaded = true : this.getPopularFilms2()
  }

  // getPopularFilms() { /// не работает Почему?
  //   console.log('loading data')
  //   forkJoin(
  //     this.filmsService.loadFilms(),
  //     this.favoriteService.load()
  //   )
  //     .subscribe(([films, favorites]) => {
  //       console.log('*-*-*-*-*-*-*-*-',favorites)
  //       this.films = films
  //       this.favorites = favorites
  //       this.loaded = true
  //     })
  // }
  getPopularFilms2() {
    console.log('loading films getPopularFilms2');
    
    this.filmsService.loadFilms().pipe(
      switchMap((films: Film[]) => {
        this.films = films
        return this.favoriteService.load()
      }),
      switchMap((favorites: Favorite[]) => {
        this.favorites = favorites
        return of(true)
      })
    ).subscribe((loaded: boolean) => {
      this.loaded = loaded
    })
  }
  getPopularFilms3() {
    console.log('loading films getPopularFilms3');
    this.filmsService.loadFilms().subscribe(
      (filmList: Film[]) => {
        this.films = filmList
        this.favoriteService.load().subscribe(
          (favoritesList: Favorite[]) => {
            this.favorites = favoritesList
            this.loaded = true
        })
      }
    )
  }

  loadMore() {
    console.log('loadMore')

    if (this.moreActive)
      this.filmsService.loadFilms().subscribe(films => {
        this.films = films
        if (this.filmsService.getPage > this.maxPages) this.moreActive = false
      }, err => console.error('err', err))
  }

  addFavorite(id: number) {
    console.log('addFavorite')
    let film: Film = this.filmsService.getFilmById(id)
    let favorite: Favorite = this.favoriteService.implementNewFavorite(film)

    this.favoriteService.createData(favorite, 'favorites').then(
      resp => {
        console.log('FilmsComponent addFavorite resp', resp)
        this.favoriteService.updateData(resp.id, resp, 'favorites') // узнать как получать ид документа
        this.favorites = this.favoriteService.addFavorites(resp, this.favorites)
      },
      error => {
        console.log("FilmsComponent addFavorite err: " + error)
      }
    )
  }

  removeFavorite(id: string) {
    this.favoriteService.deleteData(id, 'favorites').then(
      resp => {
        console.log('FilmsComponent addFavorite resp', resp)
        this.favorites = this.favoriteService.removeFavoriteById(resp, this.favorites)
      },
      error => {
        console.log("FilmsComponent addFavorite err: " + error)
      }
    )
  }

}