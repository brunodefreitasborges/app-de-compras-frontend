import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Grocery } from 'src/app/models/grocery-model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-grocery-item',
  templateUrl: './grocery-item.component.html',
  styleUrls: ['./grocery-item.component.scss'],
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
  @Input() id!: string;
  @Input() category!: string;
  @Input() product!: string;
  @Input() quantity!: number;
  @Input() price: number = 0.00
  @Input() checked!: boolean;

  @Output() onEdit: EventEmitter<Grocery> = new EventEmitter();
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onCheck: EventEmitter<Grocery> = new EventEmitter();

  checkIcon!: string;

  constructor() {}

   ngOnInit(): void {
    if (this.checked) {
      this.checkIcon = 'done'
    } else if (!this.checked) {
      this.checkIcon = 'radio_button_unchecked'
    }
   }


  edit() {
    this.onEdit.emit({
      id: this.id,
      category: this.category,
      product: this.product,
      quantity: this.quantity,
      price: this.price,
      checked: this.checked
    });
  }

  delete() {
    this.onDelete.emit();
  }

  getAnimationStateName() {
    return this.checked ? 'checked' : 'unchecked';
  }

  toggleChecked() {
    this.checked = !this.checked;
    this.onCheck.emit({
      id: this.id,
      category: this.category,
      product: this.product,
      quantity: this.quantity,
      price: this.price,
      checked: this.checked
    });
    if (this.checked) {
      this.checkIcon = 'done'
    } else if (!this.checked) {
      this.checkIcon = 'radio_button_unchecked'
    }
  }

}
