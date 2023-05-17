import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../shared/interfaces/cart-item';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.less']
})

export class LoginComponent {
  constructor( private auth: AuthService) { }

  public isNewUser: boolean = false;
  public titleText = "Вход в THE CANDLES";
  public passwordPlaceholder = 'Введите пароль';
  public buttonText = "Вход";

  

  public form = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [Validators.required]),
    password2: new FormControl<string | null>(null, [Validators.required]),
  });

  public registration(): void {
    this.isNewUser = true;
    this.titleText = "Регистрация в THE CANDLES";
    this.passwordPlaceholder = 'Введите новый пароль';
    this.buttonText = "Зарегистрироваться";
    document.querySelector(".content__registration")?.classList.add("content__registration_hidden");
  }
  public submit() {
    const formData = this.form.value;
    if (formData.email && formData.password) {
      if (this.isNewUser) {
        this.auth.register(formData.email, formData.password);
        console.log("Вы зарегистрированы")
      } else {  
        this.auth.login(formData.email, formData.password);
        console.log("Вы зашли в аккаунт")
      }
    }
 
  }
 

  // public submit(): void {
  //   this.isNewUser = true; 
  //   this.titleText = this.isNewUser ? "Пароль для THE CANDLES" : "Здравствуйте, Маргарита"; 
    
  //   this.buttonText = this.isNewUser ? "Сохранить" : "Войти"; 
  //   if (this.isNewUser) {
  //     Array.prototype.forEach.call(
  //       document.getElementsByClassName("row"),
  //       (el) => el.classList.add("row-create-account")  
  //     );
  //     document.querySelector(".form-content")?.classList.add("form-create-account");
  //     document.querySelector(".row_submit")?.classList.add("button-create-account");
  
  //   }
   

    
  // }



  // get email() { return this.form.get('email'); }
  // get password() { return this.form.get('password'); }

}
