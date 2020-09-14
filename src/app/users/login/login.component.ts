import { Component, OnInit } from '@angular/core';
import { loginForm } from '../../shared/interfaces/loginform.interface';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { MessagesService } from '../../shared/services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginForm: loginForm

  // public messageAlert: string = ''
  // public typeAlert: string = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private messagesService: MessagesService
  ) {
  }
  ngOnInit(){
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(form.value).subscribe(
        (resp) => {
          console.log('onSubmit isAuth', resp)
          
          if(!this.authService.isAuth()){
            // this.messageAlert = 'Данные не верны'
            // this.typeAlert = 'alert-danger'
            this.messagesService.sendMessage('Данные не верны', 'alert-danger')
          }else{
            // form.reset()
            const navigationExtras: NavigationExtras = {state: {data: 'Успешная авторизация', type: 'alert-success'}}
            this.router.navigate(['albums'], navigationExtras)
          }
        },
        err => {
          this.messagesService.sendMessage(err, 'alert-danger')
          // this.messageAlert = err
          // this.typeAlert = 'alert-danger'
        }
      )
    }
  }

}
