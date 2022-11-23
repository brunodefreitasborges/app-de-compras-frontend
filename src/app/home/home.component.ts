import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogFormComponent } from '../components/dialog-form/dialog-form.component';
import {  Grocery } from '../models/grocery-model';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  groceries$ = this.store.getGroceries();
  categories: string[] = [];

  constructor(
    private store: AppStore,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.store.setInitialLocalStorage();
    this.store.fetchData();
  }

  ngAfterViewInit(): void {
    this.groceries$.subscribe(groceries => {
      this.categories = groceries.map(grocery => grocery.category);
      this.categories = [...new Set(this.categories)];
    });
  }

  // Filter groceries logic



  // Dialog Logic
  openDialog(flag: string, categories: string[], grocery: Grocery): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      disableClose: true,
      width: '250px',
      data: {
        flag: flag,
        categories: categories,
        grocery: grocery
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === undefined) {
        return;
      } else {
        this.addGrocery(result.data.grocery);
      }
    });
  }

  add() {
    this.openDialog('create',
    this.categories,
    {
      id: '',
      category: '',
      product: '',
      quantity: 0,
      price: 0,
      checked: false
    });
  }

  edit(grocery: Grocery) {
    this.openDialog('update', this.categories, grocery)
   }

  // Store Manipulation Logic
   addGrocery(grocery: Grocery) {
  

   }




}
