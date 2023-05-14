import { Injectable } from "@angular/core";
import { CandlesService } from "./candles.service";
import { CartItem } from "../interfaces/cart-item";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject, lastValueFrom } from "rxjs";
import { AuthService } from "./auth.service";

  
@Injectable({providedIn: 'root'})
export class CartService{
    constructor(public candlesService: CandlesService,
        private store: AngularFirestore,
        private auth: AuthService) {console.log(this);}

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

        // await this.auth.login('rita.mayer2001@gmail.com', '12345678');
        // this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).add({"idCandle": "ID1", "count": 500, "color": 9});
        // this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).doc("w6NfpTr746vhRyvdqgBc").update({"count": 12});
        // this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).doc("w6NfpTr746vhRyvdqgBc").delete();


        const collection = this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`);
        const documentStream = await lastValueFrom(collection.get());
        const cartItems: CartItem[] = [];
        documentStream.forEach((d) => {
            const data: any = d.data();
            cartItems.push({"id": d.id, 
            "idCandle": data.idCandle, 
            "count": data.count, 
            "wick": data.wick,
            "scent": data.scent,
            "packaging": data.packaging,

        });
        });
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
    }

    public addCartItem(item: CartItem): void {
        
        const cartItem: CartItem | undefined = this._cartItems.find(i => {
            i.idCandle === item.idCandle && 
            i.wick === item.wick &&
            i.scent === item.scent &&
            i.packaging === item.packaging
        })
        if (cartItem) { this.updateCount(item.id, item.count+cartItem.count) }
        else { 
            this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).add({
                "idCandle": item.idCandle, 
                "count": item.count,
                "wick": item.wick,
                "scent": item.scent,
                "packaging": item.packaging,
            });
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



