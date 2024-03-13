import { Component, EventEmitter, Inject, OnInit, } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import InventoryService from '@services/inventory/inventory.service';
import SupplierService from '@services/supplier/supplier.service';

import { Inventory } from '@interfaces/inventory.interface';
import { Supplier } from '@interfaces/supplier.interface';

@Component({
  selector: 'app-dialog-form-inventory',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-form-inventory.component.html',
  styleUrl: './dialog-form-inventory.component.scss'
})
export class DialogFormInventoryComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public item: Inventory,

    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private supplierService: SupplierService,
  ) { }

  onFinish = new EventEmitter();
  itemForm!: FormGroup;
  isEditMode: boolean = false;
  title: string = 'Add New Item';

  suppliers: Supplier[] = this.supplierService.getSuppliers();

  ngOnInit(): void {
    this.createForm();

    if (this.item) {
      this.isEditMode = true;
      this.title = `Edit ${this.item.name}`;

      this.itemForm.setValue({
        name: this.item.name,
        description: this.item.description,
        price: this.item.price,
        quantity: this.item.quantity,
        supplierId: this.item.supplierId,
      });
    }
  }

  createForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      supplierId: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.itemForm.valid) return;

    if (this.isEditMode) {
      this.inventoryService.updateItem({
        id: this.item.id,
        ...this.itemForm.value,
      });
    } else {
      this.inventoryService.addItem(this.itemForm.value);
    }

    this.onFinish.emit();
  }
}
