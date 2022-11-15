import { animate, keyframes, query, state, style, transition, trigger } from '@angular/animations';
import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

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
export class GroceryItemComponent {
  @Input() id!: string;
  @Input() category!: string;
  @Input() product!: string;
  @Input() quantity!: number;
  @Input() price: number = 0.00
  @Input() checked: boolean = false;
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<string> = new EventEmitter();

  checkIcon: string = 'radio_button_unchecked';

  constructor() { }

  edit() {
    this.onEdit.emit();
  }

  delete() {
    this.onDelete.emit();
  }

  getAnimationStateName() {
    return this.checked ? 'checked' : 'unchecked';
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
