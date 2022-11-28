import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable, tap } from 'rxjs';
import { Groceries, GroceryList } from '../models/grocery-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) {
   }

  getGroceries(): Observable<GroceryList[]> {
    return this.http.get<GroceryList[]>('http://localhost:8080/api/v1')
  }

  addList(listName: string): Observable<GroceryList> {
    const newList: GroceryList = {
      listName: listName,
    }
    return this.http.post<GroceryList>('http://localhost:8080/api/v1', newList)
  }

  deleteList(list: string): Observable<void>{
    return this.http.delete<void>(`http://localhost:8080/api/v1/${list}`);
  }

}
