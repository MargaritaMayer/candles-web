import { Injectable } from "@angular/core";
import { CandlesService } from "./candles.service";
import { CartItem } from "../interfaces/cart-item";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject, lastValueFrom } from "rxjs";
import { AuthService } from "./auth.service";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
// import { AuthService } from "./auth.service";

  
@Injectable({providedIn: 'root'})
export class CartService{
    constructor(public candlesService: CandlesService,
        private store: AngularFirestore,
        private auth: AuthService,
        
        ) {}

    private _cartItems: CartItem[] = [];
    private _summary = 0;   
    private  _isLoading$ = new BehaviorSubject(true);

    public get cartItems(): CartItem[] {
        return this._cartItems;
    }

    public get summary(): number {
        return this._summary;
    }

    public get isLoading(): BehaviorSubject<boolean> {
        return this._isLoading$;
    }

    async initialize() {
        const collection = this.store.collection(`/users/ofPmqALnSZSqo0ZXigKCKlyNNhh1/cart`);
        const documentStream = await lastValueFrom(collection.get());
        const cartItems: CartItem[] = [];
        documentStream.forEach((d) => {
            const data: any = d.data();
            cartItems.push({
                "id": d.id, 
                "idCandle": data.idCandle, 
                "count": data.count, 
                "wick": data.wick,
                "scent": data.scent,
                "packaging": data.packaging,
            });
        });
        this._cartItems = [];
        cartItems.forEach((d) => { if (d) {
            this.cartItems.push(d);
        }});
        this.updateSummary()
        this._isLoading$.next(false);
    }
    
    private updateSummary(): void {
        
        this._summary = this._cartItems.reduce((sum, cartItem) => 
            (this.candlesService.getCandleById(cartItem.idCandle)?.price ?? 0)
            *cartItem.count + sum, 0);
        console.log(this._summary)
    }

    public addCartItem(item: CartItem): void {
        
        const cartItem: CartItem | undefined = this._cartItems.find(i => 
            i.idCandle == item.idCandle && 
            i.wick === item.wick &&
            i.scent === item.scent &&
            i.packaging === item.packaging
        )
      
        if (cartItem) { this.updateCount(cartItem.id, item.count+cartItem.count) }
        else { 
            this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).add({
                "idCandle": item.idCandle, 
                "count": item.count,
                "wick": item.wick,
                "scent": item.scent,
                "packaging": item.packaging,
            });
        
            this.initialize();  
        }
    }

    public deleteItem(id: string): void {
        this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).doc(id).delete();
        this.initialize(); 
    }

    public updateCount(id: string, count: number): void {
        this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).doc(id).update({"count": count});
        this.initialize();
    }
}



