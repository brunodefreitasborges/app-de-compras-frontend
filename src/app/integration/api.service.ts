import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { Groceries, Grocery } from '../models/grocery-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private storage: Storage;

  constructor(private http: HttpClient) {
    this.storage = window.localStorage;
   }

  setInitialGroceries(): void {
    this.http.get<Groceries[]>('assets/groceries.json').subscribe(groceries => {
      this.storage.setItem('key', JSON.stringify(groceries));
  });
  }

  getGroceries(): Observable<Groceries[]> {
    const groceries: Groceries[] = JSON.parse(this.storage.getItem('key') || '[]');
    return of(groceries);
  }
}
