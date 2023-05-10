import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICandlesApiService } from "../interfaces/i-candles-api-service";
import { Candle } from "../interfaces/candle";

const host = 'http://localhost:3000'

@Injectable({providedIn: 'root'})
export class CandlesApiService implements ICandlesApiService{
    constructor(private httpClient: HttpClient) {
    }
    getAll(): Observable<Candle[]> {
        return this.httpClient.get<Candle[]>(host);
    }
}