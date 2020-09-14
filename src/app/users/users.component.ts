import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CloudService } from '../shared/services/cloud.service';
import { MessagesService } from '../shared/services/messages.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // public messageAlert: string = ''
  // public typeAlert: string = ''
  public isAuth: boolean
  public userName: string = ''

  constructor(
    private router: Router,
    private authService: AuthService,
    private cloudService: CloudService,
    private messagesService: MessagesService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { data: string, type: string }
    console.log('state', state);
    
    // if (state.data) {
      this.messagesService.sendMessage(state.data, state.type)
      console.log('state', state);

      // this.messageAlert = state.data
      // this.typeAlert = state.type
    // }
  }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth()
    if (this.isAuth) {
      let token: string = this.authService.getStorage()
      this.cloudService.getDataById(token, 'users').subscribe(resp => this.userName = resp['login'])
    }
  }
    
}
