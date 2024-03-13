import { Injectable } from '@angular/core';

import { Sale } from '@interfaces/sale.interface';

@Injectable({
  providedIn: 'root'
})
export default class SalesService {
  constructor() { }

  sales: Sale[] = [
    {
      id: 1,
      itemId: 1,
      transactionDate: new Date('2024-03-13').toLocaleDateString(),
      qty: 3,
      total: 1799.97,
    },
    {
      id: 2,
      itemId: 2,
      transactionDate: new Date('2024-03-14').toLocaleDateString(),
      qty: 1,
      total: 999.99,
    },
  ];

  getSales() {
    return this.sales;
  }
}
