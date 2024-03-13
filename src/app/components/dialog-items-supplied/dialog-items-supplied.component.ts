import { Component, Inject, } from '@angular/core';

import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogItemsSuppliedParams } from '@interfaces/supplier.interface';
import { Inventory } from '@interfaces/inventory.interface';

@Component({
  selector: 'app-dialog-items-supplied',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-items-supplied.component.html',
  styleUrl: './dialog-items-supplied.component.scss'
})
export class DialogItemsSuppliedComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DialogItemsSuppliedParams,
  ) { }

  title: string = `Items Supplied from ${this.data.supplierName}`;
  itemsSupplied: Inventory[] = this.data.itemsSupplied;
}
