import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candle } from './shared/interfaces/candle';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';

import { authState } from '@angular/fire/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CandlesService } from './shared/services/candles.service';
import { CartService } from './shared/services/cart.service';
import { AuthService } from './shared/services/auth.service';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{

  constructor(public candlesService: CandlesService,
    public cartService: CartService, 
    private auth: AuthService,
    private router: Router,
    ){
      this.auth.userId.subscribe((userId) => {
        const login = document.getElementById('login')
        
        if (userId===undefined) return;
        if (userId===null) {
          this._loginText.next('Войти');      
        } else {
          
          this._loginText.next("Выйти");          
        }
        login?.addEventListener('click', (_) => {
          if (userId===null) {
            this.router.navigate(['/login'])
          } else {
            this.auth.logout();
          }          
        });
        this._isLoading.next(false);

    })

    }


  private _loginText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  public get loginText(): Observable<string>{
    return this._loginText
  }

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  
  public get isLoading(): Observable<boolean>{
    return this._isLoading
  }

  ngOnInit() {
    this.candlesService.initialize();
  
  }





}



