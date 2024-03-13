import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';

import { DialogFormSupplierComponent } from '@components/dialog-form-supplier/dialog-form-supplier.component';
import { DialogItemsSuppliedComponent } from '@components/dialog-items-supplied/dialog-items-supplied.component';

import SupplierService from '@services/supplier/supplier.service';

import { Supplier, DialogItemsSuppliedParams } from '@interfaces/supplier.interface';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
})
export class SuppliersComponent {
  @ViewChild(MatTable)
  table: MatTable<Supplier> | undefined;

  constructor(
    public formItemDialog: MatDialog,
    public itemsSuppliedDialog: MatDialog,
    private supplierService: SupplierService,
  ) { }

  suppliers: Supplier[] = this.supplierService.getSuppliers();
  displayedColumns: string[] = ['position', 'name', 'contact', 'itemsSupplied', 'action'];

  getItemsSupplied(itemsSupplied: number[]) {
    return this.supplierService.getItemsSupplied(itemsSupplied);
  }

  openFormItemDialog(data?: Supplier) {
    const dialogRef = this.formItemDialog.open(DialogFormSupplierComponent, { data });

    dialogRef.componentInstance.onFinish.subscribe(() => {
      this.formItemDialog.closeAll();
      this.refreshTable();
    });
  }

  viewItemsSupplied(supplier: Supplier) {
    const data: DialogItemsSuppliedParams = {
      supplierName: supplier.name,
      itemsSupplied: this.getItemsSupplied(supplier.itemsSupplied),
    };

    this.itemsSuppliedDialog.open(DialogItemsSuppliedComponent, { data });
  }

  refreshTable() {
    if (this.table) this.table.renderRows();
  }

  deleteItem(itemId: number) {
    this.suppliers = this.supplierService.deleteSupplier(itemId);
    this.refreshTable();
  }
}
