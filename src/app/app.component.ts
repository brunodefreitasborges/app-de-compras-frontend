import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from './components/dialog/dialog.component';
import { Grocery } from './models/grocery-model'
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
  showLeftSideNav!: boolean;
  showRightSideNav!: boolean;
  hortifruti!: Grocery[];
  mercearia!: Grocery[];
  limpeza!: Grocery[];
  acougue!: Grocery[];

  constructor(
    private store: AppStore,
    private loader: LoadingService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.fetchData();
    this.store.getGroceries().subscribe((groceries) => {
      this.hortifruti = groceries.filter((grocery) => grocery.category === 'Hortifruti');
      this.mercearia = groceries.filter((grocery) => grocery.category === 'Mercearia');
      this.limpeza = groceries.filter((grocery) => grocery.category === 'Limpeza');
      this.acougue = groceries.filter((grocery) => grocery.category === 'Acougue');
    })
  }

  // Dialog Logic
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Store Manipulation Logic
  onEdit() {
    this.openDialog();
  }

  onDelete(groceryId: string) {
    this.store.deleteGrocery(groceryId);
  }



  // Side Navs Logic
  toggleSideNavs() {
    if(this.showLeftSideNav) {
      this.showLeftSideNav = !this.showLeftSideNav;
    } else if(this.showRightSideNav) {
      this.showRightSideNav = !this.showRightSideNav;
    }
  }

  toggleLeftSideNav() {
    this.showLeftSideNav = !this.showLeftSideNav;
  }

  toggleRightSideNav() {
    this.showRightSideNav = !this.showRightSideNav;
  }
}
