import { Component, ViewEncapsulation } from '@angular/core';
import { Grocery } from './models/grocery-model'

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Groceries';
  showLeftSideNav!: boolean;
  showRightSideNav!: boolean;

  groceries: Grocery[] = [
    {
      id: '1',
      category: 'Hortifruti',
      product: 'Banana',
      quantity: 1,
      price: 2.99,
      checked: false
    },
    {
      id: '2',
      category: 'Hortifruti',
      product: 'Laranja',
      quantity: 2,
      price: 2.99,
      checked: false
    },
    {
      id: '3',
      category: 'Hortifruti',
      product: 'Abacaxi',
      quantity: 3,
      price: 2.99,
      checked: false
    },
]

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
