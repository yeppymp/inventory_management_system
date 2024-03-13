import { Inventory } from './inventory.interface';

export interface Supplier {
  id: number;
  name: string;
  contact: string;
  itemsSupplied: number[];
}

export interface DialogItemsSuppliedParams {
  supplierName: string;
  itemsSupplied: Inventory[];
}
