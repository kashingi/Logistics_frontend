import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-transfer-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './stock-transfer-view.html',
  styleUrl: './stock-transfer-view.scss',
})
export class StockTransferView {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
