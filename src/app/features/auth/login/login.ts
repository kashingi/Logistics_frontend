import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Auth } from '../../../core/services/auth';
import { Snackbar } from '../../../core/services/snackbar';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  loginForm!: FormGroup;
  hidePassword = true;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private snackbar: Snackbar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    
    this.isLoading = true;
    this.errorMessage = '';
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(loginData).subscribe({
      next: (resp: any) => {
        console.log("Login successful:", resp);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
        this.snackbar.success("Welcome back!", "Close");
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message;
        this.snackbar.danger(err?.error?.message, "Close");
      },
    });
  }
}
