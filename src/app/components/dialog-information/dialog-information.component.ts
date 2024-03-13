import { Component, Inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogInformationParams } from '@interfaces/app.interface';

@Component({
  selector: 'app-dialog-information',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-information.component.html',
  styleUrl: './dialog-information.component.scss'
})
export class DialogInformationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialog: DialogInformationParams,
  ) { }
}
