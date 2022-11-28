import { Injectable } from '@angular/core';
import { Groceries, Grocery, GroceryList } from '../models/grocery-model';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import { ApiService } from '../integration/api.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface AppState {
  currentList: string,
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

   updateGroceries = this.updater(
    (state, grocerieList: GroceryList) => ({...state, groceries: [...state.groceries, grocerieList]})
   );

   setCurrentList = this.updater(
    (state, currentList: string) => ({...state, currentList})
   );

   // Get the groceries for the current selected list
   getGroceries = (): Observable<Groceries[] | undefined> => {
    return this.select(
      this.state$,
      (state) => state.groceries.find(list => list.listName === state.currentList)?.groceryList
    );
   }

   getLists = (): Observable<string[]> => {
    return this.select(state => state.groceries.map(grocery => grocery.listName));
   }

   addList = this.effect((list$: Observable<string>) => {
    return list$.pipe(
      switchMap((list) => this.apiService.addList(list).pipe(
        tapResponse(
          (groceries: GroceryList) => {
            this.updateGroceries(groceries)
          },
          (error: HttpErrorResponse) => console.error(error)
        )
      ))
    )
   });

   removeList = this.effect((list$: Observable<string>) => {
    return list$.pipe(
      switchMap((list) => this.apiService.deleteList(list).pipe(
        tapResponse(
          () => {
            this.setState(
              (state) => ({...state, groceries: state.groceries.filter(grocery => grocery.listName != list)})
            );
            this.select(state => state.groceries).subscribe(data => console.log(data));
          },
          (error: HttpErrorResponse) => console.error(error)
        )
      ))
    )
   });
}
