import { Component, ViewChild } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTable, MatTableModule } from '@angular/material/table';

import InventoryService from '@services/inventory/inventory.service';
import SupplierService from '@services/supplier/supplier.service';
import SalesService from '@services/sales/sales.service';

import { Inventory } from '@interfaces/inventory.interface';
import { Sale } from '@interfaces/sale.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild(MatTable)
  salesTable: MatTable<Sale> | undefined;

  constructor(
    private inventoryService: InventoryService,
    private supplierService: SupplierService,
    private salesService: SalesService,
  ) { }

  stocksItem: Inventory[] = this.inventoryService.getStocksOnWarning();
  sales: Sale[] = this.salesService.getSales();

  displayedSalesColumns: string[] = ['position', 'item', 'date', 'qty', 'total'];

  getSupplier(suppliedId: number) {
    return this.supplierService.getSupplier(suppliedId);
  }

  getItem(itemId: number) {
    return this.inventoryService.getItem(itemId);
  }

  totalSold() {
    return this.sales.reduce(function (acc, obj) { return acc + obj.qty; }, 0);
  }

  totalRevenue() {
    return this.sales.reduce(function (acc, obj) { return acc + obj.total; }, 0);
  }
}
