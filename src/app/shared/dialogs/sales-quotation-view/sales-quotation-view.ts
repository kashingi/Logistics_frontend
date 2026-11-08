import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-sales-quotation-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './sales-quotation-view.html',
  styleUrl: './sales-quotation-view.scss',
})
export class SalesQuotationView {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
