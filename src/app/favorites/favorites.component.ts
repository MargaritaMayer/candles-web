import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FavoriteService } from '../shared/services/favorite.service';
import { CandlesService } from '../shared/services/candles.service';
import { AuthService } from '../shared/services/auth.service';
import { Candle } from '../shared/interfaces/candle';
import { FavoriteItem } from '../shared/interfaces/favorite-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {

  constructor(
    public favoriteService: FavoriteService,
    public candlesService: CandlesService,
    private changeDetectorRef: ChangeDetectorRef,
    public auth: AuthService,
  ) {
    this.auth.userId.subscribe((userId) => {
      if (userId === undefined) {
        return;
      }
      this.isAuth = userId!==null;
      if (userId===null) {
        this._isLoading.next(false);
      }
    })
  }


  public candles: {
    'candles-1': Candle[];
    'candles-2': Candle[];
} | null = null;

  public favoriteItems: FavoriteItem[] | null = null;

  public isAuth: boolean = false;


  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public get isLoading(): Observable<boolean>{
    return this._isLoading
  }




  async ngOnInit(): Promise<void> {
    this.candles = await this.candlesService.candles;

    this.favoriteService.favoriteItems.subscribe(
      async (favoriteItems) => {
        if (favoriteItems === null) return;
        this.favoriteItems = favoriteItems
        this._isLoading.next(false);

      }
      );
      this.changeDetectorRef.detectChanges();
  }

  public deleteFavorite(id: string) {
    if (!this.favoriteItems) return;
    this.favoriteService.deleteItem(id);
  }
  testValue = new FormControl(true);


  public getCandle(favoriteItem: FavoriteItem) {
    return this.candles?.['candles-1'].find(candle => candle.id === favoriteItem.idCandle)
  }


 }
