import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../shared/interfaces/cart-item';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.less'],
  
})

export class LoginComponent implements OnInit {
  
  constructor( 
    private auth: AuthService, 
    private router: Router, 
    ) { }
  ngOnInit(): void {

  }
  form = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
    password2: new FormControl<string | null>(null, [Validators.required, this.passwordsMustMatch]),
  });
  public isNewUser: boolean = false;
  public isUser: boolean = false;
  public titleText = "Вход в THE CANDLES";
  public passwordPlaceholder = 'Введите пароль';
  public buttonText = "Вход";
  public formText = "Войдите в аккаунт или зарегистрируйтесь"
  public isResetPassword = false;
  

  public get email() { return this.form?.get('email'); }
  public get password() { return this.form?.get('password'); }
  public get password2() { 
  
    return this.form?.get('password2'); }

  public registration(): void {
    this.isNewUser = true;
    this.formText = "Введите данные для регистрации"
    this.titleText = "Регистрация в THE CANDLES";
    this.passwordPlaceholder = 'Введите новый пароль';
    this.buttonText = "Зарегистрироваться";
    document.querySelector(".content__registration")?.classList.add("content__registration_hidden");
  }

  public resetPassword(): void {
    document.querySelector(".content__registration")?.classList.add("content__registration_hidden");
    this.buttonText = "Получить письмо"
    this.isResetPassword = true;
      // .then(() => {
      //   this.successMsg = 'Ссылка на восстановление пароля отправлена на ваш email';
      // })
      // .catch(err => {
      //   this.errorMsg = this.authErrorService.getErrorMsg(err.code);
      // });
  }
  public submit() {
    console.log("HIHI")


    if ((this.form.controls['email'].invalid || this.form.controls['password'].invalid) ||
      (this.isNewUser && this.form.invalid) || (this.isResetPassword && this.form.controls['email'].invalid)) {
      console.log("h")
      this.form.controls['email'].markAsDirty();
      this.form.controls['password'].markAsDirty();
      this.form.controls['password2'].markAsDirty();
      return;
    }
    if (this.isResetPassword){
      
      if (!this.form.value.email) return;
      this.auth.resetPassword(this.form.value.email)
      
    }



    const formData = this.form.value;



    if (formData.email && formData.password) {
      this.isUser = true;
      if (this.isNewUser) {
        this.auth.register(formData.email, formData.password);
        
      }  else {
        this.auth.login(formData.email, formData.password);
      }    
    
    } 
  }


  passwordsMustMatch(control: FormControl): { [p: string]: boolean }  | null {

    if (control.parent && control.parent.value.password === control.value) {
      return null;
    }
    return {
      passwordsMustMatch: true
    };
  }
}



