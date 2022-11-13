import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Groceries';
  showSideNav!: boolean;

  toggleSideNav() {
    console.log('Sidenav toggle')
    this.showSideNav = !this.showSideNav;
  }
}
