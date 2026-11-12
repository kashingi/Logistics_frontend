import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delivery-view.html',
  styleUrl: './delivery-view.scss',
})
export class DeliveryView {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
