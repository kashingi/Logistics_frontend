import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-delivery-zone-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDivider
],
  templateUrl: './delivery-zone-view.html',
  styleUrl: './delivery-zone-view.scss',
})
export class DeliveryZoneView {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
