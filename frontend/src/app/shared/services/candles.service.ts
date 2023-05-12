import { Inject, Injectable } from "@angular/core";
import { Candle } from "../interfaces/candle";
import { Firestore, collectionData, collection, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Observable, lastValueFrom } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

  



@Injectable({providedIn: 'root'})
export class CandlesService{

    constructor(private store: AngularFirestore) {}
    
    private _candles: Candle[] = [];
      
    public get candles(): Candle[] {
        console.log("candles: ", this._candles)
        return this._candles;
    }

    async initialize() {
        const collection = this.store.collection('/candles');
        const documentStream = await lastValueFrom(collection.get());
        const res: Candle[] = [];
        documentStream.forEach((d) => {
        const data: any = d.data();
        res.push({"id": d.id, "title": data.title, "price": data.price, "imgs": data.imgs});
        });
        res.forEach((d) => { if (d) {
            this._candles.push(d);
        }});
    }

    public getCandleById(id: string): Candle | undefined {
        return this._candles.find(c => c.id === id);
    }
}