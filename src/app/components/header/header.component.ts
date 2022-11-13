import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() showSideNav: EventEmitter<boolean> = new EventEmitter();
  showSideNavBool: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.showSideNav.emit();
    this.showSideNavBool = !this.showSideNavBool;
  }

}
