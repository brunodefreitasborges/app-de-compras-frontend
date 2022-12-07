import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Grocery } from 'src/app/models/grocery-model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-grocery-item',
  templateUrl: './grocery-item.component.html',
  animations: [
    trigger('checkedState', [
      transition('unchecked <=> checked', [
      animate('200ms', keyframes([
        style({transform: 'scale(1)', offset: 0}),
        style({transform: 'scale(1.1)', offset: 0.5}),
        style({transform: 'scale(1)', offset: 1})
      ])),
    ])
    ])
  ]
})
export class GroceryItemComponent implements OnInit {
  @Input() grocery!: Grocery;

  @Output() onEdit: EventEmitter<Grocery> = new EventEmitter();
  @Output() onDelete: EventEmitter<Grocery> = new EventEmitter();
  @Output() onCheck: EventEmitter<Grocery> = new EventEmitter();

  checkIcon!: string;

  constructor() {}

   ngOnInit(): void {
    if (this.grocery.checked) {
      this.checkIcon = 'done'
    } else if (!this.grocery.checked) {
      this.checkIcon = 'radio_button_unchecked'
    }
   }

  getAnimationStateName() {
    return this.grocery.checked ? 'checked' : 'unchecked';
  }

  edit() {
    this.onEdit.emit({
      category: this.grocery.category,
      product: this.grocery.product,
      quantity: this.grocery.quantity,
      price: this.grocery.price,
      checked: this.grocery.checked
    });
  }

  delete() {
    this.onDelete.emit({
      category: this.grocery.category,
      product: this.grocery.product,
      quantity: this.grocery.quantity,
      price: this.grocery.price,
      checked: this.grocery.checked
    });
  }

  toggleChecked() {
    this.grocery.checked = !this.grocery.checked;
    async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      this.onCheck.emit({
        category: this.grocery.category,
        product: this.grocery.product,
        quantity: this.grocery.quantity,
        price: this.grocery.price,
        checked: this.grocery.checked
      });
    }
    if (this.grocery.checked) {
      this.checkIcon = 'done'
    } else if (!this.grocery.checked) {
      this.checkIcon = 'radio_button_unchecked'
    }
  }

}
