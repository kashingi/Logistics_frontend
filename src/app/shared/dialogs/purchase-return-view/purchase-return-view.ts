import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-purchase-return-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDivider
],
  templateUrl: './purchase-return-view.html',
  styleUrl: './purchase-return-view.scss',
})
export class PurchaseReturnView {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
