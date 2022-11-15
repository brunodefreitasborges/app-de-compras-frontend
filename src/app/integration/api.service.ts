import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
import { Grocery } from '../models/grocery-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getGroceries(): Observable<Grocery[]> {
    return this.http.get<Grocery[]>(`https://grocery-backend-production.up.railway.app/`);
  }
}
