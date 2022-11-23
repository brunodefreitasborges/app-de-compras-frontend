import { Injectable } from '@angular/core';
import { Groceries, Grocery } from '../models/grocery-model';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import { ApiService } from '../integration/api.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface AppState {
  groceries: Groceries[];
}

const initialState: AppState = {
  groceries: []
};

@Injectable()
export class AppStore extends ComponentStore<AppState> {
  error = new BehaviorSubject<any>({});

  constructor(private apiService : ApiService) {
    super(initialState);
   }

   setInitialLocalStorage() {
    this.apiService.setInitialGroceries();
   }

   fetchData = this.effect((dataFetch$: Observable<void>) => {
    return dataFetch$.pipe(
      switchMap(() => this.apiService.getGroceries().pipe(
        tapResponse(
          (groceries: Groceries[]) => this.setGroceries(groceries),
          (error: HttpErrorResponse) => console.error(error)
        )
      ))
    )
   });

   setGroceries = this.updater(
    (state, groceries: Groceries[]) => ({...state, groceries})
   );

   getGroceries = (): Observable<Groceries[]> => {
    return this.select(state => state.groceries);
   }


}
