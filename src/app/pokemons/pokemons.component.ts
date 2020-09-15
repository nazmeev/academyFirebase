import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonInfo } from '../shared/interfaces/pokemonInfo.interface';
import { MessagesService } from '../shared/services/messages.service';
import { ModalPokemonComponent } from './modal-pokemon/modal-pokemon.component';
import { ModalPokemonEditComponent } from './modal-pokemon-edit/modal-pokemon-edit.component';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent{
  public pokemons: PokemonInfo[] = []
  
  constructor(
    private modalService: NgbModal,
    private messagesService: MessagesService
    ) { }

  removePokemon(id){
    if (confirm('Вы уверены?')){
      this.pokemons = this.pokemons.filter(item => item.id != id)
      this.messagesService.sendMessage('Удалено', 'alert-success')
    }
  }
  openEditPokemon(id){
    let poky = this.getPokemon(id)
    const modalRef = this.modalService.open(ModalPokemonEditComponent)
    
    modalRef.componentInstance.pokemonInfo = poky[0]
    modalRef.componentInstance.title = 'Редактировать'
    modalRef.result.then((result) => {
      this.pokemons.map(item => {
        console.log(result);
        
        if(result.id == item.id) item = result})
      this.messagesService.sendMessage('Обновлено', 'alert-success')
    }, (reason) => {
      this.messagesService.sendMessage(`Dismissed ${this.getDismissReason(reason)}`, 'alert-warning')
    }).catch((error) => {
      this.messagesService.sendMessage(`Error: ${error}`, 'alert-danger')
    })
  }

  openCreatePokemon() {
    const modalRef = this.modalService.open(ModalPokemonComponent)
    modalRef.componentInstance.item = null
    modalRef.componentInstance.title = 'Создать'
    modalRef.result.then((result) => {
      this.pokemons.push(result)
      this.messagesService.sendMessage('Добавлено', 'alert-success')
    }, (reason) => {
      this.messagesService.sendMessage(`Dismissed ${this.getDismissReason(reason)}`, 'alert-warning')
    }).catch((error) => {
      this.messagesService.sendMessage(`Error: ${error}`, 'alert-danger')
    })
  }

  getPokemon(id){
    return this.pokemons.filter(pokemon => pokemon.id == id)
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC'
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop'
    } else {
      return `with: ${reason}`
    }
  }
}
