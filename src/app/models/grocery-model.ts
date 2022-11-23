
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

