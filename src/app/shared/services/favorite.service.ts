import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Favorite } from '../interfaces/favorite.interface';
import { Film } from '../interfaces/film.interface';
import { CloudService } from './cloud.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService extends CloudService {

  constructor(
    protected firestore: AngularFirestore
  ) {
    super(firestore)
  }

  load(): Observable<Favorite[]> {
    return super.getAllData('favorites').pipe(
      map(res => {
        if (!res) return []
        const mappedFavorites = Object.keys(res).map(key => ({ ...res[key] }))
        return mappedFavorites;
      })
    )
  }

  implementNewFavorite(film: Film) {
    return {
      filmId: film.id,
      favImage: film.poster_path,
      favTitle: film.title,
      favOverview: film.overview,
      favPopularity: film.popularity
    }
  }

  addFavorites(film: Favorite, favorites: Favorite[]): Favorite[] {
    favorites.push(film)
    return favorites
  }

  getFavoriteById(id: string, favorites: Favorite[]): Favorite[] {
    return favorites.filter(item => item.id == id)
  }

  removeFavoriteById(id: string, favorites: Favorite[]): Favorite[] {
    return favorites.filter(item => item.id != id)
  }

}
