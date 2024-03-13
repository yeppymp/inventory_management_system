import { Injectable } from '@angular/core';

import InventoryService from '@services/inventory/inventory.service';

import { Inventory } from '@interfaces/inventory.interface';
import { Supplier } from '@interfaces/supplier.interface';

@Injectable({
  providedIn: 'root',
})
export default class SupplierService {
  private suppliers: Supplier[] = [
    { id: 1, name: 'Supplier A', contact: '123-456-7890', itemsSupplied: [1, 2] },
    { id: 2, name: 'Supplier B', contact: '987-654-3210', itemsSupplied: [3] },
  ];

  constructor(
    private inventoryService: InventoryService,
  ) { }

  getSuppliers() {
    return this.suppliers;
  }

  getSupplier(id: number) {
    return this.suppliers.find((s) => s.id === id);
  }

  getItemsSupplied(itemsSupplied: number[]) {
    const items: Inventory[] = [];

    itemsSupplied.map((itemId) => {
      const itemFound = this.inventoryService.getItem(itemId);
      if (itemFound) items.push(itemFound);
    });

    return items;
  }

  addSupplier(supplier: Supplier) {
    this.suppliers.push(supplier);
    return this.suppliers;
  }

  updateSupplier(updatedSupplier: Supplier) {
    const index = this.suppliers.findIndex((s) => s.id === updatedSupplier.id);

    if (index !== -1) {
      this.suppliers[index] = updatedSupplier;
    }

    return this.suppliers;
  }

  deleteSupplier(id: number) {
    this.suppliers = this.suppliers.filter((s) => s.id !== id);
    return this.suppliers;
  }
}
