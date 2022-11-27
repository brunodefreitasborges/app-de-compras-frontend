
export interface GroceryList {
  id: string;
  listName: string;
  groceryList: Groceries[]
}

export interface Groceries {
  category: string,
  groceries: Grocery[];
}

export interface Grocery {
  id: string,
  category: string,
  product: string,
  quantity: number,
  price: number,
  checked: boolean
}

