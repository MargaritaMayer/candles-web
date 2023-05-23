import { Inject, Injectable } from '@angular/core';
import { Auth, UserCredential, signInWithEmailAndPassword, signInWithCustomToken, Persistence, browserSessionPersistence, browserLocalPersistence, signInWithCredential, AuthCredential, User, createUserWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({ providedIn: 'root'})
export class AuthService {
  public userId: BehaviorSubject<string | null | undefined> =  new BehaviorSubject<string | null | undefined>(undefined);

  constructor(
    private auth: Auth, 
    private router: Router, 
    private fireauth: AngularFireAuth,
    private store: AngularFirestore,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    ) {
      this.fireauth.authState.subscribe((user) => {
        if (user) {
          this.userId.next(user.uid);
        } else {
          this.userId.next(null);
        }

      })
    }


  showNotification(text: string, label: string): void {
    this.alerts
        .open(text, {label: label})
        .subscribe();
  }
  public my_login(username: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, username, password).then((user) => user.user);
  }
  public my_register(username: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(this.auth, username, password).then((user) => user.user);
  }

  async login(email: string, password: string) {
    try{
      // this.currentUser.next(await this.my_login(email, password));
      const id: string = (await this.my_login(email, password)).uid;
      this.userId.next(id);
      // console.log('id', id)
      this.router.navigate(['/home']); 
      this.showNotification("", "Вы успешно зашли в свой аккаунт");
    }  catch(error){
      // console.log('error', error)
      this.showNotification("Введен неверный email или пароль", "Вы не смогли войти в аккаунт")
      this.router.navigate(['/login']);
    }
  }


  async register(name: string, email: string, password: string) {
    try {
      const id: string = (await this.my_register(email, password)).uid;
      this.userId.next(id);
      await this.store.collection(`/users/${id}/info`).doc('info').set({
        "name": name
      });
      this.router.navigate(['/home']);
      this.showNotification("", "Вы успешно зарегистрировались и зашли в свой аккаунт")

    } catch(error) {
      // console.log(error)
      this.showNotification("", "Почта, которую вы ввели, уже используется или ее не существует");
      this.router.navigate(['/login']);
    }     
  }

  logout() {
    this.fireauth.signOut().then(() => {
      this.userId.next(null);

      localStorage.removeItem('token');
    }, err => {
      this.showNotification("Пожалуйста, попробуйте еще раз", "Вы не смогли выйти из аккаунта")
    }) 
  }

  async resetPassword(email: string) {
    try {
      return sendPasswordResetEmail(this.auth, String(email));
    } catch (error) {
    }
  }





}
