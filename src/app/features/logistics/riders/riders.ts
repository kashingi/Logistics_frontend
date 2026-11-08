import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RiderService } from '../../../core/services/rider-service';
import { Snackbar } from '../../../core/services/snackbar';
import { RiderDialog } from '../../../shared/dialogs/rider-dialog/rider-dialog';
import { RiderView } from '../../../shared/dialogs/rider-view/rider-view';

@Component({
  selector: 'app-riders',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './riders.html',
  styleUrl: './riders.scss',
})
export class Riders {

  riders: any[] = [];
  displayedColumns = ['name', 'phone', 'vehicleType', 'zone', 'status', 'available', 'actions'];
  isLoading = false;

  constructor(
    private riderService: RiderService,
    private dialog: MatDialog,
    private snackbar: Snackbar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.riderService.getAllRiders().subscribe({
      next: (resp: any) => {
        this.riders = resp?.payLoad;
        this.cdr.markForCheck();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close');
      },
    });
  }

  openAdd(): void {
    const ref = this.dialog.open(RiderDialog, {
      width: '700px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openEdit(item: any): void {
    const ref = this.dialog.open(RiderDialog, {
      width: '700px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { mode: 'edit', rider: item },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(RiderView, {
      width: '550px',
      maxWidth: '95vw',
      data: item,
    });
  }

  toggleStatus(item: any): void {
    this.isLoading = true;
    const status = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.riderService.updateRiderStatus(item.id, status).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackbar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close')
      }
    });
  }
}
