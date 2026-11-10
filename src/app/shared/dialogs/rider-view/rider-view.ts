import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-rider-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDivider
],
  templateUrl: './rider-view.html',
  styleUrl: './rider-view.scss',
})
export class RiderView {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
