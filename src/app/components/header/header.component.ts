import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() showLeftSideNav: EventEmitter<boolean> = new EventEmitter();
  @Output() showRightSideNav: EventEmitter<boolean> = new EventEmitter();
  showLeftSideNavBool: boolean = false;
  showRightSideNavBool: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleLeftSideNav() {
    this.showLeftSideNav.emit();
    this.showLeftSideNavBool = !this.showLeftSideNavBool;
  }

  toggleRightSideNav() {
    this.showRightSideNav.emit();
    this.showRightSideNavBool = !this.showRightSideNavBool;
  }

}
