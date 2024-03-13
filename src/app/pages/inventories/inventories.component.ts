import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DialogFormInventoryComponent } from '@components/dialog-form-inventory/dialog-form-inventory.component';

import InventoryService from '@services/inventory/inventory.service';
import SupplierService from '@services/supplier/supplier.service';
import AuthService from '@services/auth/auth.service';

import { Inventory } from '@interfaces/inventory.interface';
import { Roles } from '@interfaces/auth.interface';

@Component({
  selector: 'app-inventories',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './inventories.component.html',
  styleUrl: './inventories.component.scss'
})
export class InventoriesComponent {
  @ViewChild(MatTable)
  table: MatTable<Inventory> | undefined;

  constructor(
    public formItemDialog: MatDialog,
    private inventoryService: InventoryService,
    private supplierService: SupplierService,
    private authService: AuthService
  ) { }

  inventories: Inventory[] = this.inventoryService.getInventories();
  isStaff: boolean = this.authService.getUserRole() === Roles.STAFF;
  displayedColumns: string[] = ['position', 'name', 'price', 'supplier', 'action'];

  getSupplier(supplierId: number) {
    return this.supplierService.getSupplier(supplierId);
  }

  openFormItemDialog(data?: Inventory) {
    const dialogRef = this.formItemDialog.open(DialogFormInventoryComponent, { data });

    dialogRef.componentInstance.onFinish.subscribe(() => {
      this.formItemDialog.closeAll();
      this.refreshTable();
    });
  }

  refreshTable() {
    if (this.table) this.table.renderRows();
  }

  deleteItem(itemId: number) {
    this.inventories = this.inventoryService.deleteItem(itemId);
    this.refreshTable();
  }
}
