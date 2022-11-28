import { Injectable } from '@angular/core';
import { Groceries, Grocery, GroceryList } from '../models/grocery-model';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import { ApiService } from '../integration/api.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface AppState {
  currentList: String,
  groceries: GroceryList[];
}

const initialState: AppState = {
  currentList: '',
  groceries: [],
};

@Injectable()
export class AppStore extends ComponentStore<AppState> {
  error = new BehaviorSubject<any>({});

  constructor(private apiService : ApiService) {
    super(initialState);
   }

   fetchData = this.effect((dataFetch$: Observable<void>) => {
    return dataFetch$.pipe(
      switchMap(() => this.apiService.getGroceries().pipe(
        tapResponse(
          (groceries: GroceryList[]) => {
            this.setGroceries(groceries)
          },

          (error: HttpErrorResponse) => console.error(error)
        )
      ))
    )
   });

   setGroceries = this.updater(
    (state, groceries: GroceryList[]) => ({...state, groceries})
   );

   setCurrentList = this.updater(
    (state, currentList: String) => ({...state, currentList})
   );

   // Get the groceries for the current selected list
   getGroceries = (): Observable<Groceries[] | undefined> => {
    return this.select(
      this.state$,
      (state) => state.groceries.find(list => list.listName === state.currentList)?.groceryList
    );

   }

   getLists = (): Observable<String[]> => {
    return this.select(state => state.groceries.map(grocery => grocery.listName));
   }
}
