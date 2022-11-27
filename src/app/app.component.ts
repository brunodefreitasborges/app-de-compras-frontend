import { Component, ViewEncapsulation } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { AppStore } from './store/app.store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Groceries';
  loading$ = this.loader.loading$;
  showSideNav!: boolean;
  lists$ = this.store.getLists();


  constructor(
    private store: AppStore,
    private loader: LoadingService) {
  }

  // Side Nav Logic
  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

}
