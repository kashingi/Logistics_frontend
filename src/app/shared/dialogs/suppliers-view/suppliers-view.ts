import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-suppliers-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './suppliers-view.html',
  styleUrl: './suppliers-view.scss',
})
export class SuppliersView {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
