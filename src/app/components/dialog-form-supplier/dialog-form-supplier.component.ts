import { Component, EventEmitter, Inject, OnInit, } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import SupplierService from '@services/supplier/supplier.service';
import InventoryService from '@services/inventory/inventory.service';

import { Inventory } from '@interfaces/inventory.interface';
import { Supplier } from '@interfaces/supplier.interface';

@Component({
  selector: 'app-dialog-form-supplier',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './dialog-form-supplier.component.html',
  styleUrl: './dialog-form-supplier.component.scss'
})
export class DialogFormSupplierComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public item: Supplier,
    
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private inventoryService: InventoryService,
  ) { }
  
  onFinish = new EventEmitter();
  supplierForm!: FormGroup;
  isEditMode: boolean = false;
  title: string = 'Add Supplier';

  inventories: Inventory[] = this.inventoryService.getInventories();

  ngOnInit(): void {
    this.createForm();

    if (this.item) {
      this.isEditMode = true;
      this.title = `Edit ${this.item.name}`;

      this.supplierForm.setValue({
        name: this.item.name,
        contact: this.item.contact,
        itemsSupplied: this.item.itemsSupplied,
      });
    }
  }

  createForm() {
    this.supplierForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      itemsSupplied: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.supplierForm.valid) return;

    if (this.isEditMode) {
      this.supplierService.updateSupplier({
        id: this.item.id,
        ...this.supplierForm.value,
      });
    } else {
      this.supplierService.addSupplier(this.supplierForm.value);
    }

    this.onFinish.emit();
  }
}
