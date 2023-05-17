import { Injectable } from '@angular/core';
import { Auth, UserCredential, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({ providedIn: 'root'})
export class AuthService {
  public currentUser: UserCredential | null = null


  constructor(
    private auth: Auth, 
    private router: Router, 
    // private cartService: CartService,
    private fireauth: AngularFireAuth,
    ) {
    // this.auth.onAuthStateChanged((...a) => console.log(a));
  }

  public my_login(username: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, username, password);
  }

  async login(email: string, password: string) {
    try{
      this.currentUser = await this.my_login(email, password);
      
      localStorage.setItem('token', 'true');
      // this.cartService.initialize();

      // this.router.navigate(['faq']); 
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
    // this.fireauth.signOut().then(() => {
    //   localStorage.removeItem('token');
    //   this.router.navigate(['/login']);
    // }, err => {
    //   alert(err.message);
    // }) 
  }





}
