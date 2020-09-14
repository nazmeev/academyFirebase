import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  public messageAlert: string = ''
  public typeAlert: string = ''
  public message = {}

  subscription: Subscription

  constructor(public messagesService: MessagesService) {
    this.subscription = this.messagesService.getMessage().subscribe(message => {      
      this.messageAlert = message.messageAlert
      this.typeAlert = message.typeAlert
    })
  }

}
