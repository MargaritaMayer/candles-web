import { Injectable } from "@angular/core";
import { CandlesService } from "./candles.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject, Observable, lastValueFrom } from "rxjs";
import { AuthService } from "./auth.service";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Account } from "../interfaces/account";

  
@Injectable({providedIn: 'root'})
export class AccountService{
    constructor( 
        private store: AngularFirestore,
        private auth: AuthService
    ) {
        this.auth.userId.subscribe((userId) => {
            if (!userId) return;
            this._userId = userId;
            this.initialize();
        })
    }

    private _userId: String | null = null;
    private _account = new BehaviorSubject<Account | null>(null);
    private _accountPromise: Promise<Account> | null = null;

    private get accountPromise(): Promise<Account> {
        if (this._accountPromise !== null) return this._accountPromise;
        this._accountPromise = this._loadAccount();
        return this._accountPromise;
    }

    public get account(): Observable<Account | null> {
        return this._account;
    }

    async _loadAccount(): Promise<Account> {
        const userInfo = this.store.collection(`/users/${this._userId}/info`).doc("info");

        const documentSnapshot = await lastValueFrom(userInfo.get());
        const data: any = documentSnapshot.data();

        let account: Account = ({
            "name": data?.name ?? '',
            "address": data?.address ?? '',
            "phone": data?.phone ?? '',
        });

     
        this._account.next(account);
        return account;
    }

    initialize() {
        this._accountPromise = this._loadAccount();
    }


    public async updateAccount(account: Account): Promise<void> {
        await this.store.collection(`/users/${this._userId}/info`).doc('info').update({
            "name": account.name,
            "address": account.address,
            "phone": account.phone,
        });
        this.initialize();
    }
}



