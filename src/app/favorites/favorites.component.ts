import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../shared/services/favorite.service';
import { Favorite } from '../shared/interfaces/favorite.interface';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { CloudService } from '../shared/services/cloud.service';
import { MessagesService } from '../shared/services/messages.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {
  public loaded: boolean = false
  public imgPath = `https://image.tmdb.org/t/p/w185`
  public favorites: Favorite[] = []

  constructor(
    private cloudService: CloudService,
    private favoriteService: FavoriteService,
    private modalService: NgbModal,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    console.log('favoriteService');
    (this.favorites.length) ? this.loaded = true : this.getFavorites()
  }

  getFavorites() {
    console.log('return load data')
    this.cloudService.getAllData('favorites').subscribe(
      (filmList: Favorite[]) => {
        this.favorites = filmList
        this.loaded = true
      }
    )
  }

  removeFavorite(id: string) {
    if (confirm('Вы уверены?'))
      this.favoriteService.deleteData(id, 'favorites').then(
        resp => {
          console.log('FilmsComponent removeFavorite resp', resp)
          this.favorites = this.favoriteService.removeFavoriteById(resp, this.favorites)
          this.messagesService.sendMessage('Удалено', 'alert-success')
          // this.favorites = this.favoriteService.getFavorites()
          console.log(this.favorites);
          
        },
        error => {
          console.log("FilmsComponent addFavorite err: " + error)
        }
      )
  }

  openEdit(itemId: string) {
    console.log('openEdit', itemId);

    this.cloudService.getDataById(itemId, 'favorites').subscribe(
      item => {
        const modalRef = this.modalService.open(EditComponent)
        modalRef.componentInstance.item = item
        modalRef.result.then((result) => {
          console.log('openEdit result', result)
          if (!result) this.messagesService.sendMessage('Закрыто', 'alert-warning')
          this.cloudService.updateData(result.value.id, result.value, 'favorites').then(
            res => {
              this.messagesService.sendMessage('Обновлено', 'alert-success')
            }
          )
        }, (reason) => {
          console.log('Editform dismiss')
          this.messagesService.sendMessage(`Dismissed ${this.getDismissReason(reason)}`, 'alert-warning')
        }).catch((error) => {
          console.log('Editform catch');
          this.getDismissReason(error)
        })
      })
  }
  openCreate() {
    const modalRef = this.modalService.open(EditComponent)
    modalRef.componentInstance.item = null
    modalRef.result.then((result) => {
      console.log('openCreate result', result)
      if (!result) this.messagesService.sendMessage('Закрыто', 'alert-warning')

      console.log('Editform result create')
      this.cloudService.createData(result.value, 'favorites').then(
        resp => {
          console.log('Editform createData', resp)
          this.cloudService.updateData(resp.id, resp, 'favorites') // узнать как получать ид документа
          this.messagesService.sendMessage('Создан новый елемент', 'alert-success')
        },
        error => {
          console.log("Rejected: " + error)
        }
      )
    }, (reason) => {
      console.log('Editform dismiss')
      this.messagesService.sendMessage(`Dismissed ${this.getDismissReason(reason)}`, 'alert-warning')
    }).catch((error) => {
      console.log('Editform catch');
      this.getDismissReason(error)
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

