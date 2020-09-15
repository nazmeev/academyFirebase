import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonInfo } from '../../shared/interfaces/pokemonInfo.interface';
import { PokemonRequest } from '../../shared/interfaces/pokemonRequest.interface';
import { PokemonsService } from '../../shared/services/pokemons.service';

@Component({
  selector: 'app-modal-pokemon',
  templateUrl: './modal-pokemon.component.html',
  styleUrls: ['./modal-pokemon.component.css']
})
export class ModalPokemonComponent implements OnInit {
  public canSave: boolean = false
  public pokemonsList: PokemonRequest[] = []
  public title: string
  public opinion: string
  public pokemonInfo: PokemonInfo = this.pokemonsService.implementEmptyPokemonInfo()

  constructor(
    private pokemonsService: PokemonsService,
    public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.getPokemonsList()
  }

  getPokemonsList() {
    this.pokemonsService.loadPokemons('pokemon', 1).subscribe((pokemons: PokemonRequest[]) => {
      this.pokemonsList = pokemons
    }, err => console.error('err', err))
  }

  onChangePokemon(link) {
    if(link == ''){
      this.canSave = false
      this.pokemonInfo = this.pokemonsService.implementEmptyPokemonInfo()
    }else{
      this.canSave = false
      this.pokemonsService.loadPokemonsInfo(link).subscribe((info) => {
        this.pokemonInfo = info
        this.canSave = true
      }, err => console.error('err', err))
    }
  }

  savePokemon() {
    this.pokemonInfo.opinion = this.opinion
    this.activeModal.close(this.pokemonInfo)
  }

}
