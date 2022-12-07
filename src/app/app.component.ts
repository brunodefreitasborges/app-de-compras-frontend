import { AddListDialogComponent } from './components/add-list-dialog/add-list-dialog.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from './services/loading.service';
import { AppStore } from './store/app.store';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'My Groceries';
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  loading$ = this.loader.loading$;
  showSideNav!: boolean;
  lists$ = this.store.getLists();
  selectedList: string = "";
  loadedList: string = "";


  constructor(
    private readonly keycloak: KeycloakService,
    public dialog: MatDialog,
    private store: AppStore,
    private loader: LoadingService) {
  }

  async ngOnInit() {

    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      console.log(await this.userProfile);
    }

    this.keycloak.keycloakEvents$.subscribe({
      next: (e) => {
        if (e.type == KeycloakEventType.OnTokenExpired) {
          this.keycloak.updateToken(20);
        } else {
          return;
        }
      }
    });

    this.store.fetchData();
    this.store.state$.subscribe(state => {
      this.loadedList = state.currentList;
      this.selectedList  = state.currentList;
    })
  }

  login(){
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
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
