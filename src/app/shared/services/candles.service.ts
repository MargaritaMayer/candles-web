import { Inject, Injectable } from "@angular/core";
import { Candle } from "../interfaces/candle";
import { Firestore, collectionData, collection, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Observable, lastValueFrom } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { BehaviorSubject } from 'rxjs';
import { CartItem } from "../interfaces/cart-item";

@Injectable({providedIn: 'root'})
export class CandlesService{

    constructor(private store: AngularFirestore) {}

    private _candles: Promise<Candle[]> | null = null;
    private _summary: number = 0;


    public get candles(): Promise<Candle[]> {
        if (this._candles !== null) return this._candles;
        this._candles = this._loadCandles();
        return this._candles;
    }

    async _loadCandles(): Promise<Candle[]> {
        const collection = this.store.collection('/candles');
        const documentStream = await lastValueFrom(collection.get());
        const res: Candle[] = [];
        documentStream.forEach((d) => {
            const data: any = d.data();
            res.push({"id": d.id, "title": data.title, "price": data.price, "imgs": data.imgs, 'isAvailable': data.isAvailable});
        });
        const candles: Candle[] = [];
        res.forEach((d) => { if (d) {
            candles.push(d);
        }});
        return candles;
    }

    initialize() {
        this._candles = this._loadCandles();
    }

    public async calculateCartSum(cartItems: CartItem[]) {
        const candles = await this.candles;
        this._summary = cartItems.reduce((sum, cartItem) => {
            const price = candles.find(c => c.id === cartItem.idCandle)?.price ?? 0;
            return price*cartItem.count + sum;
        }, 0);
        return this._summary;
    } 
}