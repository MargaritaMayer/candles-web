import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candle } from './shared/interfaces/candle';
import { Observable, lastValueFrom } from 'rxjs';

import { authState } from '@angular/fire/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
 
  styleUrls: ['./app.component.less']
})
export class AppComponent{
  // item$: Observable<Candle[]>;
  
  // firestore: Firestore = inject(Firestore);

  // async getCollection(collection: AngularFirestoreCollection<unknown>): Promise<Candle[]> {
  //   const documentStream = await lastValueFrom(collection.get());
  //   const res: Candle[] = [];
  //   documentStream.forEach((d) => {
  //     const data: any = d.data();
  //     res.push({"id": d.id, "title": data.title, "price": data.price, "imgs": data.imgs});
  //   });
  //   return res;
  // }

  // async main(): Promise<void> {
  //   await this.auth.login('rita.mayer2001@gmail.com', '12345678');
  //   this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).add({"idCandle": "dfsd", "count": 5, "color": 9});
  //   this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).doc("w6NfpTr746vhRyvdqgBc").update({"count": 12});
  //   this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`).doc("w6NfpTr746vhRyvdqgBc").delete();

  //   console.log(await this.getCollection(this.store.collection('/candles')));
  //   console.log(await this.getCollection(this.store.collection(`/users/${this.auth.currentUser?.user.uid}/cart`)));
  //   // console.log(await (await this.getCollection(this.store.collection('/candles'))).forEach((d) => console.log(d)));

  // }

  // constructor(private store: AngularFirestore, private auth: AuthService) {
    // this.main();
    

    // todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    // inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    // done = this.store.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;

 
  // }
  

}