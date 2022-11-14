import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-grocery-item',
  templateUrl: './grocery-item.component.html',
  styleUrls: ['./grocery-item.component.scss']
})
export class GroceryItemComponent implements OnInit {
  @Input() id!: string;
  @Input() category!: string;
  @Input() product!: string;
  @Input() quantity!: number;
  @Input() price: number = 0.00
  @Input() checked: boolean = false;

  checkIcon: string = 'radio_button_unchecked';

  constructor() { }

  ngOnInit(): void {
  }

  toggleChecked() {
    this.checked = !this.checked;
    if (this.checked) {
      this.checkIcon = 'done'
    } else if (!this.checked) {
      this.checkIcon = 'radio_button_unchecked'
    }
  }

}
