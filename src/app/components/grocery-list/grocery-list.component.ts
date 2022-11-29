
import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterContentInit,
} from '@angular/core';
import { Grocery, GroceryStyle } from 'src/app/models/grocery-model';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss'],
})
export class GroceryListComponent implements AfterContentInit {
  @Input() category!: string;
  @Input() groceries!: Grocery[];
  icons: Map<String, GroceryStyle> = new Map();
  @Output() edit: EventEmitter<Grocery> = new EventEmitter();
  @Output() delete: EventEmitter<Grocery> = new EventEmitter();
  @Output() check: EventEmitter<Grocery> = new EventEmitter();

  // Method to calculate how many groceries are checked
  getChecked(groceries: Grocery[]): number {
    let checked = 0;
    groceries.forEach((grocery) => {
      if (grocery.checked) {
        checked++;
      }
    });
    return checked;
  }

  constructor() {}

  ngAfterContentInit(): void {
    this.icons.set('limpeza', { color: 'text-blue-500', icon: 'cleaning_services' });
    this.icons.set('mercearia', { color: 'text-yellow-300', icon: 'egg' });
    this.icons.set('cereais_e_graos', { color: 'text-yellow-600', icon: 'grain' });
    this.icons.set('congelados_e_frios', { color: 'text-red-500', icon: 'ac_unit' });
    this.icons.set('higiene', { color: 'text-blue-800', icon: 'wash' });
    this.icons.set('padaria', { color: 'text-orange-200', icon: 'bakery_dining' });
    this.icons.set('enlatados', { color: 'text-red-900', icon: 'view_kanban' });
    this.icons.set('hortifruti', { color: 'text-green-500', icon: 'spa' });
    this.icons.set('bebidas', { color: 'text-purple-500', icon: 'liquor' });
    this.icons.set('papelaria', { color: 'text-yellow-100', icon: 'receipt_long' });
    this.icons.set('outros', { color: 'text-black', icon: 'shopping_bag' });
  }

  onEdit(grocery: Grocery) {
    this.edit.emit(grocery);
  }

  onDelete(grocery: Grocery) {
    this.delete.emit(grocery);
  }

  onCheck(grocery: Grocery) {
    this.check.emit(grocery);
  }

  capitalizeWords(wordString: String) {
    return wordString
      .split('_')
      .map((word) => {
        if (word.length == 1) {
          return word;
        } else {
          return word[0].toUpperCase() + word.slice(1);
        }
      })
      .join(' ');
  }
}
