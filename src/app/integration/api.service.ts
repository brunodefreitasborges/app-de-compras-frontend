import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
import { Grocery } from '../models/grocery-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'https://grocery-backend-production.up.railway.app/'

  constructor(private http: HttpClient) { }

  getGroceries(): Observable<Grocery[]> {
    return this.http.get<Grocery[]>(this.apiUrl);
  }

  addGrocery(grocery: Grocery): Observable<Grocery> {
    return this.http.post<Grocery>(this.apiUrl, grocery);
  }

  updateGrocery(grocery: Grocery, id: string): Observable<Grocery> {
    return this.http.put<Grocery>(this.apiUrl + id, grocery)
  }

  deleteGrocery(id: string) {
    return this.http.delete(this.apiUrl + id);
  }
}
