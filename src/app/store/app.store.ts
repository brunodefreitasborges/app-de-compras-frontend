import { Injectable } from '@angular/core';
import { Groceries, Grocery, GroceryList } from '../models/grocery-model';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import { ApiService } from '../integration/api.service';
import { Observable, switchMap } from 'rxjs';
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
  currentListId: string = '';

  constructor(private apiService : ApiService) {
    super(initialState);
    this.setCurrentListId;
   }

   fetchData = this.effect((dataFetch$: Observable<void>) => {
    return dataFetch$.pipe(
      switchMap(() => this.apiService.getGroceries().pipe(
        tapResponse(
          (groceries: GroceryList[]) => {
            this.setGroceries(groceries);
            this.setCurrentList(groceries.length > 0 ? groceries[groceries.length - 1].listName : '');
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
    (state, groceryList: GroceryList) => ({...state, groceries: [...state.groceries, groceryList]})
   );

   // Get the groceries for the current selected list
   getGroceries = (): Observable<Groceries[] | undefined> => {
    return this.select(
      this.state$,
      (state) => state.groceries.find(list => list.listName === state.currentList)?.groceryList
    );
   };

   addGrocery = this.effect((grocery$: Observable<Grocery>) => {
    return grocery$.pipe(
      switchMap((grocery: Grocery) => this.apiService.addGrocery(grocery, this.currentListId).pipe(
        tapResponse(
          (groceryList: GroceryList) => {
            this.patchState(state => {
              return {
                ...state,
                groceries: [...state.groceries.filter(list => list.listName !== groceryList.listName), groceryList]
              }
            });
          },
          (error: HttpErrorResponse) => console.error(error)
        )
      ))
    )
   });

   updateGrocery = this.effect((grocery$: Observable<Grocery>) => {
    return grocery$.pipe(
      switchMap((grocery: Grocery) => this.apiService.updateGrocery(grocery, this.currentListId).pipe(
        tapResponse(
          (groceryList: GroceryList) => {
            this.patchState(state => {
              return {
                ...state,
                groceries: [...state.groceries.filter(list => list.listName !== groceryList.listName), groceryList]
              }
            });
          },
          (error: HttpErrorResponse) => console.error(error)
        )
      ))
    )
   });

   deleteGrocery = this.effect((grocery$: Observable<Grocery>) => {
    return grocery$.pipe(
      switchMap((grocery: Grocery) => this.apiService.deleteGrocery(grocery, this.currentListId).pipe(
        tapResponse(
          (groceryList: GroceryList) => {
            this.patchState(state => {
              return {
                ...state,
                groceries: [...state.groceries.filter(list => list.listName !== groceryList.listName), groceryList]
              }
            });
          },
          (error: HttpErrorResponse) => console.error(error)
        )
      ))
    )
   });

   setCurrentList =  this.updater(
    (state, currentList: string) => ({...state, currentList})
   );

   setCurrentListId = this.select(
    (state) => state.groceries.find(list => list.listName === state.currentList)?.id
   ).subscribe((id) => {
    this.currentListId = id!;
  });

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
          },
          (error: HttpErrorResponse) => console.error(error)
        )
      ))
    )
   });
}
