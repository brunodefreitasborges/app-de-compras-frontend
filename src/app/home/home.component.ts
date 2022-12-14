import { AfterContentInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from '../components/dialog-form/dialog-form.component';
import { Groceries, Grocery } from '../models/grocery-model';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterContentInit {
  groceries$ = this.store.getGroceries();
  categories: string[] | undefined = [];

  constructor(private store: AppStore, public dialog: MatDialog) {}

  trackByFn(index: number, groceryList: Groceries) {
    return groceryList.category;
  }

  ngAfterContentInit(): void {
    this.groceries$.subscribe((groceries) => {
      this.categories = groceries?.map((grocery) => grocery.category);
    });
  }

  // Dialog Logic
  openDialog(
    flag: string,
    categories: string[] | undefined,
    grocery: Grocery
  ): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      disableClose: true,
      width: '250px',
      data: {
        flag: flag,
        categories: categories,
        grocery: grocery,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        console.log(result);
        return;
      } else {
        if (result.flag === 'create') {
          this.addGrocery(result.data);
        } else if (result.flag === 'update') {
          this.updateGrocery(result.data);
        }
      }
    });
  }

  add() {
    this.openDialog('create', this.categories, {
      category: '',
      product: '',
      quantity: 0,
      price: 0,
      checked: false,
    });
  }

  edit(grocery: Grocery) {
    this.openDialog('update', this.categories, grocery);
  }

  // Store Manipulation Logic
  addGrocery(grocery: Grocery) {
    this.store.addGrocery(grocery);
  }

  updateGrocery(grocery: Grocery) {
    this.store.updateGrocery(grocery);
  }

  deleteGrocery(grocery: Grocery) {
    this.store.deleteGrocery(grocery);
  }
}
