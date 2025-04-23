import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      userName: [''],
      fullName: [''],
      email: [''],
      password: [''],
      phoneNumber: [''],
      dob: ['']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;

      this.userService.createUser(user).subscribe({
        next: (res) => {
          console.log('Tạo tài khoản thành công:', res);
          // Có thể chuyển hướng hoặc hiển thị thông báo ở đây
        },
        error: (err) => {
          console.error('Lỗi khi tạo tài khoản:', err);
        }
      });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}