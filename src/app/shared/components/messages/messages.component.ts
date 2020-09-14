import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public messageAlert: string = ''
  public typeAlert: string = ''
  public message = {}

  subscription: Subscription

  constructor(public messagesService: MessagesService) {
    this.subscription = this.messagesService.getMessage().subscribe(message => {
      // console.log('subscription', message);
      
      this.messageAlert = message.messageAlert
      this.typeAlert = message.typeAlert
    })
  }

  ngOnInit(): void {
  }

}
