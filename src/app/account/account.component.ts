import {ChangeDetectionStrategy, Component, OnInit, Output} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiCurrency} from '@taiga-ui/addon-commerce';
import {TuiDay, TuiTime} from '@taiga-ui/cdk';
import { AuthService } from '../shared/services/auth.service';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { AccountService } from '../shared/services/account.service';
import { Account } from '../shared/interfaces/account';
import { TuiHideSelectedPipe } from '@taiga-ui/kit';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent {

  public isAuth = false;
  public account = null

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public get isLoading(): Observable<boolean>{
    return this._isLoading
  }

  public get accountInfo(): Observable<Account | null>{
    return this.accountService.account;
  }
  public isChange = false;
  
  constructor(
    private store: AngularFirestore,
    private auth: AuthService,
    private accountService: AccountService
  ) {
    this.accountInfo.subscribe((user) => {
      this.testForm.patchValue({
        'name': user?.name ?? '',
        'phone': user?.phone ?? '',
        'address': user?.address ?? ''
      });
    });
    this.auth.userId.subscribe((userId) => {
      if (userId === undefined) return;    
      this.isAuth = userId!==null;
      this._isLoading.next(false);
    })

  }

  public testForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),

  });

  public submit() {
    const name = this.testForm.get('name')?.value ?? ''
    const phone = this.testForm.get('phone')?.value ?? ''
    const address = this.testForm.get('address')?.value ?? ''
    this.accountService.updateAccount({
      'name': name,
      'address': address,
      'phone': phone,
    })
    this.changeInfo()

  }
  public changeInfo() {
    this.isChange=!this.isChange;
  }


}
