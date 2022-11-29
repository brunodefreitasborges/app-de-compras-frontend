import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Grocery } from 'src/app/models/grocery-model';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {
  @Input() category!: string;
  @Input() groceries!: Grocery[];
  @Output() edit: EventEmitter<Grocery> = new EventEmitter();
  @Output() delete: EventEmitter<Grocery> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(grocery: Grocery) {
    this.edit.emit(grocery);
  }

  onDelete(grocery: Grocery) {
    this.delete.emit(grocery);
  }



}
