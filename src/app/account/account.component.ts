import {ChangeDetectionStrategy, Component, OnInit, Output} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiCurrency} from '@taiga-ui/addon-commerce';
import {TuiDay, TuiTime} from '@taiga-ui/cdk';
import { AuthService } from '../shared/services/auth.service';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { AccountService } from '../shared/services/account.service';
import { Account } from '../shared/interfaces/account';

class User {
  constructor(readonly firstName: string, readonly lastName: string) {}

  toString(): string {
      return `${this.firstName} ${this.lastName}`;
  }
}

class Account1 {
  constructor(
      readonly id: string,
      readonly name: string,
      readonly amount: number,
      readonly currency: TuiCurrency,
      readonly cardSvg: string,
  ) {}
}

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
  
  constructor(
    private store: AngularFirestore,
    private auth: AuthService,
    private accountService: AccountService
  ) {
    this.auth.userId.subscribe((userId) => {
      if (userId === undefined) return;    
      this.isAuth = userId!==null;
      this._isLoading.next(false);
    })

  }




  

  readonly svgIcons = {
    common: `https://ng-web-apis.github.io/dist/assets/images/common.svg`,
    universal: `https://ng-web-apis.github.io/dist/assets/images/universal.svg`,
    intersection: `https://ng-web-apis.github.io/dist/assets/images/intersection-observer.svg`,
    mutation: `https://ng-web-apis.github.io/dist/assets/images/mutation-observer.svg`,
};

persons = [new User(`Roman`, `Sedov`), new User(`Alex`, `Inkin`)];

accounts = [
    new Account1(`1`, `Common`, 24876.55, TuiCurrency.Ruble, this.svgIcons.common),
    new Account1(`2`, `Universal`, 335, TuiCurrency.Dollar, this.svgIcons.universal),
    new Account1(
        `3`,
        `Intersection`,
        10000,
        TuiCurrency.Euro,
        this.svgIcons.intersection,
    ),
    new Account1(`4`, `Mutation`, 100, TuiCurrency.Pound, this.svgIcons.mutation),
];

testForm = new FormGroup({
    nameValue: new FormControl(``, Validators.required),
    textValue: new FormControl(``, Validators.required),
    passwordValue: new FormControl(``, Validators.required),
    phoneValue: new FormControl(``, Validators.required),
    moneyValue: new FormControl(`100`, Validators.required),
    periodValue: new FormControl(new TuiDay(2017, 2, 15), Validators.required),
    timeValue: new FormControl(new TuiTime(12, 30), Validators.required),
    personValue: new FormControl(this.persons[0]),
    quantityValue: new FormControl(50_000, Validators.required),
    radioValue: new FormControl(`with-commission`),
    accountWherefrom: new FormControl(null),
    accountWhere: new FormControl(null),
    checkboxValue: new FormControl(false),
    osnoValue: new FormControl(false),
    usnValue: new FormControl(false),
    eshnValue: new FormControl(false),
    envdValue: new FormControl(false),
    usn2Value: new FormControl(false),
    patentValue: new FormControl(false),
});
}