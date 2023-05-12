import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  public my_login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        return this.fireauth.signInWithEmailAndPassword(username, password)
            .then((user) => resolve(user))
            .catch((err) => reject(err));
    });
}

  async login(email: string, password: string) {
    try{
      await this.my_login(email, password);
      
      localStorage.setItem('token', 'true');
      this.router.navigate(['home']); 
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
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    }) 
  }





}
