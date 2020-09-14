import { Component } from '@angular/core';
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
export class LoginComponent{
  public loginForm: loginForm

  constructor(
    private authService: AuthService,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(form.value).subscribe(
        (resp) => {
          if(!this.authService.isAuth()){
            this.messagesService.sendMessage('Данные не верны', 'alert-danger')
          }else{
            const navigationExtras: NavigationExtras = {state: {data: 'Успешная авторизация', type: 'alert-success'}}
            this.router.navigate(['albums'], navigationExtras)
          }
        },
        err => {
          this.messagesService.sendMessage(err, 'alert-danger')
        }
      )
    }
  }

}
