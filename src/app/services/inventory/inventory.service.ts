import { Injectable } from '@angular/core';

import { Inventory } from '@interfaces/inventory.interface';

@Injectable({
  providedIn: 'root',
})
export default class InventoryService {
  inventories: Inventory[] = [
    {
      id: 1,
      name: "Smartphone X",
      description: "High-performance smartphone with advanced features",
      quantity: 5,
      price: 599.99,
      supplierId: 1,
    },
    {
      id: 2,
      name: "Laptop Pro",
      description: "Powerful and portable laptop for professional use",
      quantity: 100,
      price: 999.99,
      supplierId: 1,
    },
    {
      id: 3,
      name: "Smart Watch Elite",
      description: "Sleek and stylish smartwatch with fitness tracking",
      quantity: 75,
      price: 199.99,
      supplierId: 2,
    },
  ];
  stockWarning: number = 10;

  getInventories() {
    return this.inventories;
  }

  getItem(id: number) {
    const item = this.inventories.find((i) => i.id === id);
    return item;
  }

  getStocksOnWarning() {
    return this.inventories.filter((item) => item.quantity <= this.stockWarning);
  }

  getStockWarning() {
    return this.stockWarning;
  }

  setStockWarning(stockWarning: number) {
    this.stockWarning = stockWarning;
    return this.stockWarning;
  }

  addItem(item: Inventory) {
    this.inventories.push(item);
    return this.inventories;
  }

  updateItem(updatedItem: Inventory) {
    const index = this.inventories.findIndex((item) => item.id === updatedItem.id);

    if (index !== -1) {
      this.inventories[index] = updatedItem;
    }

    return this.inventories;
  }

  deleteItem(id: number) {
    this.inventories = this.inventories.filter((item) => item.id !== id);
    return this.inventories;
  }
}
