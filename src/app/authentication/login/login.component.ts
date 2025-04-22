import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, LoginRequest } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.loginForm = this.fb.group({
      accountName: [''],
      password: [''],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(123123)
      const { accountName, password } = this.loginForm.value;

      const loginData: LoginRequest = {
        accountName: accountName,
        password: password
      };

      this.authService.login(loginData).subscribe({
        next: (res) => {
          if (res.success) {
            localStorage.setItem('userId', res.data.userID);
            this.router.navigate(['/']); // hoặc '/dashboard', '/tasks', tuỳ bạn định tuyến
            console.log('Đăng nhập thành công:', res.data.userID);
          } else {
            this.errorMessage = res.message || 'Đăng nhập thất bại.';
          }
        },
        error: () => {
          this.errorMessage = 'Không thể kết nối máy chủ. Vui lòng thử lại.';
        }
      });
    }
  }
}
