import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable } from 'rxjs';
import { Groceries, GroceryList } from '../models/grocery-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) {
   }

  getGroceries(): Observable<GroceryList[]> {

    return this.http.get<GroceryList[]>('http://localhost:8080/api/v1');
  }

}
