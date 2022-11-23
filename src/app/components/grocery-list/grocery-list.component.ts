import { Component, Input, OnInit } from '@angular/core';
import { Grocery } from 'src/app/models/grocery-model';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {
  @Input() category!: string;
  @Input() groceries!: Grocery[];

  constructor() { }

  ngOnInit(): void {
  }

}
