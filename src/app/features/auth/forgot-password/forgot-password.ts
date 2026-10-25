import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { Snackbar } from '../../../core/services/snackbar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-forgot-password',
  imports: [
     CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {

  forgotPasswordForm!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth,
    private router: Router,
    private snackbar: Snackbar
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {

    this.isLoading = true;
    const email = this.forgotPasswordForm.value.email;

    this.authService.forgotPassword(email).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        console.log('Password reset link sent:', resp);
        this.snackbar.success(resp?.message, 'Close');
        this.router.navigate(['/']);
        this.forgotPasswordForm.reset();
      },
      error: (err: any) => {
        this.isLoading = false;
        console.log("Error occured : ", err);
        this.snackbar.danger(err?.error?.message, 'Close');
      },
    });
  }

}
