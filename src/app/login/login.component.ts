import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../shared/interfaces/cart-item';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.less']
})

export class LoginComponent {
  constructor( 
    private auth: AuthService, 
    private router: Router, 
    ) { }

  public isNewUser: boolean = false;
  public isUser: boolean = false;
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
      this.isUser = true;
      if (this.isNewUser) {
        this.auth.register(formData.email, formData.password);
        // console.log("Вы зарегистрированы")
      } else {  
        this.auth.login(formData.email, formData.password);
        // console.log("Вы зашли в аккаунт")
        this.router.navigate(['/home']); 
      }
    } 
  }

  public logout() {
    this.auth.logout();
  }
}