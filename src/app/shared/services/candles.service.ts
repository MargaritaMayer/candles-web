import { Inject, Injectable } from "@angular/core";
import { Candle } from "../interfaces/candle";
import { Firestore, collectionData, collection, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Observable, lastValueFrom } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CandlesService{

    constructor(private store: AngularFirestore) {}
    
    private _candles: Candle[] = [];
    private  _isLoading$ = new BehaviorSubject(true);
      
    public get candles(): Candle[] {
        this.initialize();
        return this._candles;
    }

    public get isLoading(): BehaviorSubject<boolean> {
        return this._isLoading$;
    }

    async initialize() {
        console.log("was here");
        // const collection = this.store.collection('/candles');
        // const documentStream = await lastValueFrom(collection.get());
        // const res: Candle[] = [];
        // documentStream.forEach((d) => {
        // const data: any = d.data();
        // res.push({"id": d.id, "title": data.title, "price": data.price, "imgs": data.imgs});
        // });
        // this._candles = [];
        // res.forEach((d) => { if (d) {
        //     this._candles.push(d);
        // }});
        this._isLoading$.next(false);
    }

    public getCandleById(id: string): Candle | undefined {
        return this._candles.find(c => c.id === id);
    }
}