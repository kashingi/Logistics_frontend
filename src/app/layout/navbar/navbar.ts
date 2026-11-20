import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { TokenUser } from '../../core/models/user';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {

  @Output() toggleSidebar = new EventEmitter<void>();
  readonly user: TokenUser | null;

  constructor(
    private authService: Auth,
    private router: Router
  ) {
    this.user = this.authService.getUserDetails();
  }

  get userEmail(): string {
    return this.user?.email ?? (this.user?.sub?.includes('@') ? this.user.sub : '');
  }

  get userRole(): string {
    const role = this.user?.role ?? this.user?.roles;
    return Array.isArray(role) ? role.join(', ') : role ?? '';
  }

  get userInitials(): string {
    const name = this.user?.fullName ?? this.user?.name ?? this.user?.username;
    const source = name || this.userEmail.split('@')[0] || 'User';
    const initials = source
      .trim()
      .split(/[\s._-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0])
      .join('');
    return initials.toUpperCase() || 'U';
  }

  onToggle(): void {
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
