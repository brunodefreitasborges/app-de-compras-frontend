import { Injectable } from '@angular/core';
import { Grocery } from '../models/grocery-model';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import { ApiService } from '../integration/api.service';
import { Observable, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface Groceries {
  groceries: Grocery[];
}

const initialState: Groceries = {
  groceries: []
};

@Injectable()
export class AppStore extends ComponentStore<Groceries> {


  constructor(private apiService : ApiService) {
    super(initialState);
   }

   addGrocery(grocery: Grocery) {
    this.setState(state => {
      return {
        ...state,
        groceries: [...state.groceries, grocery]
      }
    })
   }

   updateGrocery = this.updater((state: Groceries, grocery: Grocery) => {
    return {
      ...state,
      groceries: state.groceries.map(groceryToUpdate => {
        if(grocery.id === groceryToUpdate.id) {
          return grocery;
        }
          return groceryToUpdate;
      })
    }
   })

   deleteGrocery = this.updater((state: Groceries, groceryId: string) => {
    return {
      ...state,
      groceries: state.groceries.filter(groceryToDelete => {
        if(groceryToDelete.id === groceryId) {
          return false;
        }
          return true;
      })
    }
   })

   fetchData = this.effect((dataFetch$: Observable<void>) => {
    return dataFetch$.pipe(
      switchMap(() => this.apiService.getGroceries().pipe(
        tapResponse(
          (groceries: Grocery[]) => this.setGroceries(groceries),
          (error: HttpErrorResponse) => console.log(error)
        )
      ))
    )
   });

   setGroceries = this.updater(
    (state, groceries: Grocery[]) => ({...state, groceries})
   );

   getGroceries = (): Observable<Grocery[]> => {
    return this.select(
      state => state.groceries
    )
   }
}
