import { AddListDialogComponent } from './components/add-list-dialog/add-list-dialog.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from './services/loading.service';
import { AppStore } from './store/app.store';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('listItemAnimation', [
      transition('unchecked <=> checked', [
      animate('200ms', keyframes([
        style({transform: 'scale(1)', offset: 0}),
        style({transform: 'scale(1.1)', offset: 0.5}),
        style({transform: 'scale(1)', offset: 1})
      ])),
    ])
    ])

  ],
})
export class AppComponent implements OnInit {
  title = 'My Groceries';
  loading$ = this.loader.loading$;
  showSideNav!: boolean;
  lists$ = this.store.getLists();
  selectedList: string = "";
  loadedList: string = "";


  constructor(
    public dialog: MatDialog,
    private store: AppStore,
    private loader: LoadingService) {
  }

  ngOnInit(): void {
    this.store.fetchData()
  }

  selectList(list: string) {
    this.selectedList = list;
  }

  loadList() {
    this.loadedList = this.selectedList;
    this.store.setCurrentList(this.loadedList);
    this.toggleSideNav();
  }

  addList() {
    this.openDialog();
  }

  removeList() {
    this.store.removeList(this.selectedList);
  }

// Dialog Logic
openDialog(): void {
  const dialogRef = this.dialog.open(AddListDialogComponent, {
    disableClose: true,
    width: '250px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result != undefined) {
      this.store.addList(result);
    } else {
      console.log('Dialog closed')
    }
  });
}

  // Side Nav Logic
  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

}
