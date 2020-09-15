import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonInfo } from '../../shared/interfaces/pokemonInfo.interface';

@Component({
  selector: 'app-modal-pokemon-edit',
  templateUrl: './modal-pokemon-edit.component.html',
  styleUrls: ['./modal-pokemon-edit.component.css']
})
export class ModalPokemonEditComponent implements OnInit {
  public title: string
  public opinion: string

  @Input() pokemonInfo: PokemonInfo

  constructor(public activeModal: NgbActiveModal) { }
  
  ngOnInit(): void {
    this.opinion = this.pokemonInfo.opinion
  }
  
  savePokemon() {
    this.pokemonInfo.opinion = this.opinion
    this.activeModal.close(this.pokemonInfo)
  }

}
