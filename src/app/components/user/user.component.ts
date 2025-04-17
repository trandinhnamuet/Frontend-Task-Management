import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
    userID: 0,
    userName: '',
    fullName: '',
    password: '',
    email: '',
    phoneNumber: '',
    dob: new Date(),
  };
  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log('✅ API Response:', data);
        this.users = data;
      },
      (error) => console.error('❌ API Error:', error)
    );
  }

  addUser(): void {
    if (
      this.newUser.userName.trim() &&
      this.newUser.email.trim() &&
      this.newUser.password.trim()
    ) {
      this.userService.createUser(this.newUser).subscribe(() => {
        this.loadUsers();
        this.resetNewUser();
      });
    }
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.userService
        .updateUser(this.selectedUser.userID, this.selectedUser)
        .subscribe(() => {
          this.loadUsers();
          this.selectedUser = null;
        });
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  trackByUserID(index: number, user: User): number {
    return user.userID;
  }

  resetNewUser(): void {
    this.newUser = {
      userID: 0,
      userName: '',
      fullName: '',
      password: '',
      email: '',
      phoneNumber: '',
      dob: new Date(),
    };
  }
}
