import { Injectable } from "@angular/core";
import { CandlesService } from "./candles.service";
import { CartItem } from "../interfaces/cart-Item";

  
@Injectable({providedIn: 'root'})
export class CartService{
    constructor(public candlesService: CandlesService) {}

    private _cartItems: CartItem[] = [];
    private _summary = 0;

    public countryCurrency: Promise<void> = fetch("https://restcountries.com/v2/all").then(
    response => {
        if (!response.ok) { throw new Error(response.statusText) }
        return response.json()
        }).then(res => {
        for (let i=0; i < res.length; i+=1) {
            res[i] = {name: res[i].name, code: res[i].currencies ? res[i].currencies[0].symbol : ''}}});

   

    get cartItems(): CartItem[] {
        return this._cartItems;
    }

    get summary(): number {
        return this._summary;
    }
    
    private updateSummary(): void {
        this._summary = this._cartItems.reduce((sum, cartItem) => 
            (this.candlesService.getCandleById(cartItem.candleId)?.price ?? 0)
            *cartItem.count + sum, 0);
    }

    public addCartItem(item: CartItem): void {
        const cartItem: CartItem | undefined = this._cartItems.find(i => i.candleId === item.candleId)
        if (cartItem) { cartItem.count += item.count; }
        else { this._cartItems.push(item); }
        this.updateSummary();      
    }

    public deleteItem(candleId: number): void {
        this._cartItems = this._cartItems.filter(cartItem => cartItem.candleId !== candleId);
        this.updateSummary(); 
    }

    public updateCount(cartItem: CartItem): void {
        this.cartItems.forEach(item => {
            if (item.candleId === cartItem.candleId){ 
              item.count = cartItem.count; 
        }})
        this.updateSummary();
    }
}



