import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false,
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  userId: number | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Lấy userId từ localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
      this.loadUserProfile();
    } else {
      this.isLoading = false;
      this.errorMessage = 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.';
    }
  }

  loadUserProfile(): void {
    if (this.userId === null) {
      this.isLoading = false;
      this.errorMessage = 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.';
      return;
    }

    this.isLoading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
        console.log('User profile loaded:', user);
      },
      error: (error) => {
        this.errorMessage = 'Lỗi khi tải thông tin người dùng. Vui lòng thử lại.';
        this.isLoading = false;
        console.error('Error loading user profile:', error);
      }
    });
  }

  editProfile(): void {
    // this.isEditing = true;
  }
}