import { Injectable } from "@angular/core";
import { CandlesService } from "./candles.service";
import { CartItem } from "../interfaces/cart-item";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { lastValueFrom } from "rxjs";
import { AuthService } from "./auth.service";

  
@Injectable({providedIn: 'root'})
export class CartService{
    constructor(public candlesService: CandlesService,
        private store: AngularFirestore,
        private auth: AuthService) {}

    private _cartItems: CartItem[] = [];
    private _summary = 0;   

    get cartItems(): CartItem[] {
        return this._cartItems;
    }

    get summary(): number {
        return this._summary;
    }

    async initialize() {
        const collection = this.store.collection('/cart');
        const documentStream = await lastValueFrom(collection.get());
        const cartItems: CartItem[] = [];
        documentStream.forEach((d) => {
            const data: any = d.data();
            cartItems.push({"id": d.id, "idCandle": data.idCandle, "count": data.count, 'color': data.color});
        });
        cartItems.forEach((d) => { if (d) {
            this.cartItems.push(d);
        }});
        this.updateSummary()
    }
    
    private updateSummary(): void {
        
        this._summary = this._cartItems.reduce((sum, cartItem) => 
            (this.candlesService.getCandleById(cartItem.idCandle)?.price ?? 0)
            *cartItem.count + sum, 0);
    }

    public addCartItem(item: CartItem): void {
        
        const cartItem: CartItem | undefined = this._cartItems.find(i => {
            i.idCandle === item.idCandle && i.color === item.color
        })
        if (cartItem) { this.updateCount(item.id, item.count+cartItem.count) }
        else { 
            this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).add({
                "idCandle": item.idCandle, "count": item.count, "color": item.color});
        }
    }

    public deleteItem(idCartItem: string): void {
        this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).doc(idCartItem).delete();
        this.initialize(); 
    }

    public updateCount(idCartItem: string, count: number): void {
        this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).doc(idCartItem).update({"count": count});
        this.initialize();
    }
}



