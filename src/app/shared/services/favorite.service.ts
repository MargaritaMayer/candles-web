import { Injectable } from "@angular/core";
import { CandlesService } from "./candles.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject, Observable, lastValueFrom } from "rxjs";
import { AuthService } from "./auth.service";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { FavoriteItem } from "../interfaces/favorite-item";
// import { AuthService } from "./auth.service";

  
@Injectable({providedIn: 'root'})
export class FavoriteService{
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


    private _favoriteItems = new BehaviorSubject<FavoriteItem[] | null>(null);
    
    private _favoriteItemsPromise: Promise<FavoriteItem[]> | null = null;

    private get favoriteItemsPromise(): Promise<FavoriteItem[]> {
        if (this._favoriteItemsPromise !== null) return this._favoriteItemsPromise;
        this._favoriteItemsPromise = this._loadFavoriteItems();
        return this._favoriteItemsPromise;
    }
    
    public get favoriteItems(): Observable<FavoriteItem[] | null> {
        return this._favoriteItems;
    }

    async _loadFavoriteItems(): Promise<FavoriteItem[]> {
        const collection = this.store.collection(`/users/${this._userId}/favorite`);
        const documentStream = await lastValueFrom(collection.get());
        const res: FavoriteItem[] = [];
        documentStream.forEach((d) => {
            const data: any = d.data();
            res.push({
                "id": d.id, 
                "idCandle": data.idCandle, 
                "wick": data.wick,
                "scent": data.scent,
                "packaging": data.packaging,
            });
        });
        const favoriteItems: FavoriteItem[] = [];

        res.forEach((d) => { if (d) {
            favoriteItems.push(d);
        }});
        this._favoriteItems.next(favoriteItems);
        return favoriteItems;
    }

    initialize() {
        this._favoriteItemsPromise = this._loadFavoriteItems();
    }



    async addFavoriteItem(item: FavoriteItem) {
        const favoriteItems: FavoriteItem[] = await this.favoriteItemsPromise;
        const favoriteItem: FavoriteItem | null = favoriteItems.find(i => 
            i.idCandle == item.idCandle && 
            i.wick === item.wick &&
            i.scent === item.scent &&
            i.packaging === item.packaging
        ) || null;
      
        if (favoriteItem) { 
            this.auth.showNotification('', 'Этот товар уже есть в Избранном')    
         }
        else {
            await this.store.collection(`/users/${this._userId}/favorite`).add({
                "idCandle": item.idCandle, 
                "wick": item.wick,
                "scent": item.scent,
                "packaging": item.packaging,
            });
            this.auth.showNotification("", "Товар добавлен в избранное");

            this.initialize();  
        }
    }

    public async deleteItem(id: string): Promise<void> {
        await this.store.collection(`/users/${this._userId}/favorite`).doc(id).delete();
        this.initialize(); 
    }

   
}



