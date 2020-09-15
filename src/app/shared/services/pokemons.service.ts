import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { responcePokemons } from '../interfaces/responcePokemons.interface';
import { PokemonInfo } from '../interfaces/pokemonInfo.interface';
import { PokemonRequest } from '../interfaces/pokemonRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  public pokemons: PokemonRequest[]

  // public page: number = 1;
  public pageMax: number = 4;
  public search: string = '';

  apiUrl: string = "https://pokeapi.co/api/v2"

  constructor(private _http: HttpClient) { }

  loadPokemons(type: string, page: number): Observable<PokemonRequest[]> {
    return this._http.get(`${this.apiUrl}/${type}?page=${page}`).pipe(
      map((responce: responcePokemons) => {
        // this.addPokemons(responce.results)
        return responce.results
      })
    )
  }
  loadPokemonsInfo(url: string): Observable<any> {
    return this._http.get(`${url}`)
  }

  // loadFilm(filmId?: number) {
  //   return this._http.get(`${this.movieUrl}/${filmId}`);
  // }

  // get getPage(): number {
  //   return this.page
  // }

  // addPokemons(pokemonsList: PokemonRequest[]) {
  //   pokemonsList.map(pokemon => {
  //     this.pokemons.push(pokemon)
  //   })
  // }

  implementEmptyPokemonInfo(): PokemonInfo {
    return {
      abilities: [],
      base_experience: 0,
      forms: [],
      game_indices: [],
      height: 0,
      held_items: [],
      id: 0,
      is_default: true,
      location_area_encounters: "",
      moves: [],
      name: "",
      order: 0,
      species: {},
      sprites: {},
      stats: [],
      types: [],
      weight: 0
    }
  }

  // getFilmById(id: number) {
  //   let film = this.films.filter(item => item.id == id)
  //   return film[0]
  // }

  // filteringSearch(search: string) {
  //   this.films.filter(film => film.title.toLowerCase().indexOf(search.toLowerCase()) != -1)
  // }

  // getSearch(search: string) {
  //   if (search == '') {
  //     this.films.map(film => film.visible = true)
  //   } else {
  //     this.films.map(film =>
  //       (film.title.toLowerCase().indexOf(search.toLowerCase()) != -1) ? film.visible = true : film.visible = false
  //     )
  //   }
  // }

}