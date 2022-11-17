import { Injectable } from '@angular/core';
import { Grocery } from '../models/grocery-model';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import { ApiService } from '../integration/api.service';
import { BehaviorSubject, concatMap, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface Groceries {
  groceries: Grocery[];
}

const initialState: Groceries = {
  groceries: [],
};

@Injectable()
export class AppStore extends ComponentStore<Groceries> {
  error = new BehaviorSubject<any>({});

  constructor(private apiService : ApiService) {
    super(initialState);
   }

  addGrocery = this.effect<Grocery>((grocery$) =>
  grocery$.pipe(
    concatMap((grocery) =>
    this.apiService.addGrocery(grocery).pipe(
      tapResponse(
        () => this.fetchData(),
        (error: HttpErrorResponse) => console.error(error))
  ))));

  updateGrocery = this.effect<Grocery>((grocery$) =>
  grocery$.pipe(
    concatMap((grocery) =>
    this.apiService.updateGrocery(grocery, grocery.id).pipe(
      tapResponse(
        () => this.fetchData(),
        (error: HttpErrorResponse) => console.error(error)
      )
    ))
  ))

  deleteGrocery = this.effect<string>((groceryId$) =>
  groceryId$.pipe(
    concatMap((groceryId) =>
    this.apiService.deleteGrocery(groceryId).pipe(
      tapResponse(
        () => this.fetchData(),
        (error: HttpErrorResponse) => console.error(error)
      )
    ))
  ))

   fetchData = this.effect((dataFetch$: Observable<void>) => {
    return dataFetch$.pipe(
      switchMap(() => this.apiService.getGroceries().pipe(
        tapResponse(
          (groceries: Grocery[]) => this.setGroceries(groceries),
          (error: HttpErrorResponse) => console.error(error)
        )
      ))
    )
   });

   setGroceries = this.updater(
    (state, groceries: Grocery[]) => ({...state, groceries})
   );

   getGroceries = (category: string): Observable<Grocery[]> => {
    return this.select(
      state => state.groceries
    ).pipe(map((groceries) => {
      return groceries.filter(grocery => grocery.category === category)
    }))
   }
}
