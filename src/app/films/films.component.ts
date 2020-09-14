import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/services/films.service';
import { FavoriteService } from '../shared/services/favorite.service';
import { Favorite } from '../shared/interfaces/favorite.interface';
import { of } from 'rxjs';
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
    (this.films.length)? this.loaded = true : this.getPopularFilms2()
  }

  getPopularFilms2() {
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
    if (this.moreActive)
      this.filmsService.loadFilms().subscribe(films => {
        this.films = films
        if (this.filmsService.getPage > this.maxPages) this.moreActive = false
      }, err => console.error('err', err))
  }

  addFavorite(id: number) {
    let film: Film = this.filmsService.getFilmById(id)
    let favorite: Favorite = this.favoriteService.implementNewFavorite(film)

    this.favoriteService.createData(favorite, 'favorites').then(
      resp => {
        this.favoriteService.updateData(resp.id, resp, 'favorites')
        this.favorites = this.favoriteService.addFavorites(resp, this.favorites)
      },
      error => {
        console.warn("FilmsComponent addFavorite err: " + error)
      }
    )
  }

  removeFavorite(id: string) {
    this.favoriteService.deleteData(id, 'favorites').then(
      resp => {
        this.favorites = this.favoriteService.removeFavoriteById(resp, this.favorites)
      },
      error => {
        console.warn("FilmsComponent addFavorite err: " + error)
      }
    )
  }

}