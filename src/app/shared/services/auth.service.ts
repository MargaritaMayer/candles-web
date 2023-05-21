import { Injectable } from '@angular/core';
import { Auth, UserCredential, signInWithEmailAndPassword, signInWithCustomToken, Persistence, browserSessionPersistence, browserLocalPersistence, signInWithCredential, AuthCredential, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root'})
export class AuthService {
  // public currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public userId: BehaviorSubject<string | null> =  new BehaviorSubject<string | null>(null);

  constructor(
    private auth: Auth, 
    private router: Router, 
    private fireauth: AngularFireAuth,
    ) {
      this.fireauth.authState.subscribe((user) => {
        if (user) {
          this.userId.next(user.uid);
        }

      })
    }

  public my_login(username: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, username, password).then((user) => user.user);
    
  }

  async login(email: string, password: string) {
    try{
      // this.currentUser.next(await this.my_login(email, password));
      const id: string = (await this.my_login(email, password)).uid;
      this.userId.next(id);

      // localStorage.setItem('token', this.auth.currentUser?.getIdToken);

      // this.router.navigate(['/home']); 
    }  catch(error){
      alert("Something went wrong in login");
      this.router.navigate(['/login']);
    }
  } 

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert("Registration Successful");
      this.router.navigate(['/login']);
    }, err => {
      alert("Something went wrong in registration");
      this.router.navigate(['/login']);
    }) 
  }

  logout() {
    this.fireauth.signOut().then(() => {
      // this.currentUser.next(null);
      this.userId.next(null);

      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    }) 
  }





}
