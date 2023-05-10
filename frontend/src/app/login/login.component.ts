import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../shared/interfaces/cart-Item';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  public isNewUser: boolean | null = null;
  public titleText = "Вход в THE CANDLES";
  public emailInputPlaceholder = "Электронная почта";
  public buttonText = "Продолжить";

  public form = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [Validators.required]),
  });


  public submit(): void {
    this.isNewUser = false; // or false, need backend here
    this.titleText = this.isNewUser ? "Пароль для THE CANDLES" : "Здравствуйте, Маргарита"; 
    this.emailInputPlaceholder = 'Пароль';
    this.buttonText = this.isNewUser ? "Сохранить" : "Войти"; 
    if (this.isNewUser) {
      Array.prototype.forEach.call(
        document.getElementsByClassName("row"),
        (el) => el.classList.add("row-create-account")  
      );
      document.querySelector(".form-content")?.classList.add("form-create-account");
      document.querySelector(".row_submit")?.classList.add("button-create-account");
  
    }
   

    
  }



  // get email() { return this.form.get('email'); }
  // get password() { return this.form.get('password'); }

}
