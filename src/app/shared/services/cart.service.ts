import { Injectable } from "@angular/core";
import { CandlesService } from "./candles.service";
import { CartItem } from "../interfaces/cart-item";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject, Observable, lastValueFrom } from "rxjs";
import { AuthService } from "./auth.service";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
// import { AuthService } from "./auth.service";

  
@Injectable({providedIn: 'root'})
export class CartService{
    constructor( 
        private store: AngularFirestore,
        private auth: AuthService
    ) {
        this.auth.currentUser.subscribe((currentUser) => {
            if (!currentUser) return;
            this._userId = currentUser.user.uid;
            this.initialize();
        })
    }
    private _userId: String | null = null;


    private _cartItems = new BehaviorSubject<CartItem[] | null>(null);
    
    private _cartItemsPromise: Promise<CartItem[]> | null = null;

    private get cartItemsPromise(): Promise<CartItem[]> {
        if (this._cartItemsPromise !== null) return this._cartItemsPromise;
        this._cartItemsPromise = this._loadCartItems();
        return this._cartItemsPromise;
    }
    
    public get cartItems(): Observable<CartItem[] | null> {
        return this._cartItems;
    }

    async _loadCartItems(): Promise<CartItem[]> {
        const collection = this.store.collection(`/users/${this._userId}/cart`);
        const documentStream = await lastValueFrom(collection.get());
        const res: CartItem[] = [];
        documentStream.forEach((d) => {
            const data: any = d.data();
            res.push({
                "id": d.id, 
                "idCandle": data.idCandle, 
                "count": data.count, 
                "wick": data.wick,
                "scent": data.scent,
                "packaging": data.packaging,
            });
        });
        const cartItems: CartItem[] = [];

        res.forEach((d) => { if (d) {
            cartItems.push(d);
        }});
        this._cartItems.next(cartItems);
        return cartItems;
    }

    initialize() {
        this._cartItemsPromise = this._loadCartItems();
    }



    async addCartItem(item: CartItem) {
        const cartItems: CartItem[] = await this.cartItemsPromise;
        const cartItem: CartItem | null = cartItems.find(i => 
            i.idCandle == item.idCandle && 
            i.wick === item.wick &&
            i.scent === item.scent &&
            i.packaging === item.packaging
        ) || null;
      
        if (cartItem) { 
            await this.updateCount(cartItem.id, item.count+cartItem.count) }
        else {
            await this.store.collection(`/users/${this._userId}/cart`).add({
                "idCandle": item.idCandle, 
                "count": item.count,
                "wick": item.wick,
                "scent": item.scent,
                "packaging": item.packaging,
            });
            this.initialize();  
        }
    }

    public async deleteItem(id: string): Promise<void> {
        await this.store.collection(`/users/${this._userId}/cart`).doc(id).delete();
        this.initialize(); 
    }

    public async updateCount(id: string, count: number): Promise<void> {
        await this.store.collection(`/users/${this._userId}/cart`).doc(id).update({"count": count});
        this.initialize();
    }
}



