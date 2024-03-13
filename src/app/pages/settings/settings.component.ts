import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DialogInformationComponent } from '@components/dialog-information/dialog-information.component';

import InventoryService from '@services/inventory/inventory.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  constructor(
    public dialogInformation: MatDialog,
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
  ) { }

  settingForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.settingForm = this.formBuilder.group({
      stockWarning: ['', [Validators.required, Validators.min(1)]],
    });

    this.settingForm.setValue({
      stockWarning: this.getStockWarning(),
    });
  }

  getStockWarning() {
    return this.inventoryService.getStockWarning();
  }

  setStockWarning(stockWarning: number) {
    return this.inventoryService.setStockWarning(stockWarning);
  }

  onSubmit() {
    if (!this.settingForm.valid) return;

    this.setStockWarning(this.settingForm.value.stockWarning);
    this.showDialogInformation();
  }

  showDialogInformation() {
    this.dialogInformation.open(DialogInformationComponent, {
      data: {
        title: 'Settings Updated',
        description: 'New setting has been applied.'
      }
    });
  }
}
