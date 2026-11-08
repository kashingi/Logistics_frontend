import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeliveryZoneService } from '../../../core/services/delivery-zone-service';
import { Snackbar } from '../../../core/services/snackbar';
import { DeliveryZoneDialog } from '../../../shared/dialogs/delivery-zone-dialog/delivery-zone-dialog';
import { DeliveryZoneView } from '../../../shared/dialogs/delivery-zone-view/delivery-zone-view';

@Component({
  selector: 'app-delivery-zone',
  imports: [
     CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './delivery-zone.html',
  styleUrl: './delivery-zone.scss',
})
export class DeliveryZone {

   zones: any[] = [];
  displayedColumns = ['name', 'locations', 'status', 'actions'];
  isLoading = false;

  constructor(
    private zoneService: DeliveryZoneService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.zoneService.getAllDeliveryZones().subscribe({
      next: (resp: any) => {
        this.zones = resp?.payLoad;
        this.cdr.markForCheck();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close');
      },
    });
  }

  openAdd(): void {
    const ref = this.dialog.open(DeliveryZoneDialog, {
      width: '550px',
      maxWidth: '95vw',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openEdit(item: any): void {
    const ref = this.dialog.open(DeliveryZoneDialog, {
      width: '550px',
      maxWidth: '95vw',
      data: { mode: 'edit', zone: item },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(DeliveryZoneView, {
      width: '500px',
      maxWidth: '95vw',
      data: item,
    });
  }

  toggleStatus(item: any): void {
    this.isLoading = false;
    const status = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.zoneService.updateStatus(item.id, status).subscribe({
      next: (resp: any) => {
        this.isLoading = true;
        this.snackBar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close')
      }
    });
  }
}
