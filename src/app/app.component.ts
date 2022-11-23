import { Component, ViewEncapsulation } from '@angular/core';
import { LoadingService } from './services/loading.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Groceries';
  loading$ = this.loader.loading$;
  showSideNav!: boolean;


  constructor(
    private loader: LoadingService) {
  }

  // Side Nav Logic
  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

}
