import { DialogErrorComponent } from './components/dialog-error/dialog-error.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable} from 'rxjs';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import { Grocery } from './models/grocery-model';
import { LoadingService } from './services/loading.service';
import { AppStore } from './store/app.store';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'My Groceries';
  loading$ = this.loader.loading$;
  showSideNav!: boolean;
  hortifruti$!: Observable<Grocery[]>;
  mercearia$!: Observable<Grocery[]>;
  limpeza$!: Observable<Grocery[]>;
  acougue$!: Observable<Grocery[]>;

  errors: [{}] = [{}];

  constructor(
    private store: AppStore,
    private loader: LoadingService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.fetchData();
    this.hortifruti$ = this.store.getGroceries('hortifruti');
    this.mercearia$ = this.store.getGroceries('mercearia');
    this.limpeza$ = this.store.getGroceries('limpeza');
    this.acougue$ = this.store.getGroceries('acougue');
    this.store.error.subscribe(error => {
      this.errors.pop();
      this.errors.push(error);
    });
    console.log(this.errors)
  }

  // Dialog Logic
  openDialog(flag: string, grocery: Grocery): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      disableClose: true,
      width: '250px',
      data: {
        flag: flag,
        id: grocery.id,
        category: grocery.category,
        product: grocery.product,
        quantity: grocery.quantity,
        price: grocery.price,
        checked: grocery.checked
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === undefined) {
        return;
      } else {
        if(result.flag === 'create') {
          this.onAddGrocery(result.data);
        } else if(result.flag === 'update') {
          this.onUpdateGrocery(result.data);
        }
      }
    });
  }

  openErrorDialog(): void {
    const dialogRef = this.dialog.open(DialogErrorComponent)
  }

  // Store Manipulation Logic
  add() {
    this.openDialog('create', {
      id: '',
      category: '',
      product: '',
      quantity: 0,
      price: 0,
      checked: false
    });
  }

  edit(grocery: Grocery) {
    this.openDialog('update', grocery)
   }

  onAddGrocery(grocery: Grocery) {
    this.store.addGrocery(grocery)
  }

  onUpdateGrocery(grocery: Grocery) {
    this.store.updateGrocery(grocery);
  }

  onDelete(groceryId: string) {
    this.store.deleteGrocery(groceryId);
  }

  checked(grocery: Grocery) {
    this.store.updateGrocery(grocery);
  }

  // Side Nav Logic
  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

}
