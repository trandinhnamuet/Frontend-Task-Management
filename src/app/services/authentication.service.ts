import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginRequest {
  accountName: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  fullName: string;
  password: string;
  email: string;
  phoneNumber: string;
  dob: string; // dạng: "yyyy-MM-dd"
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:5283/api/Authentication';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // Đăng nhập
  login(request: LoginRequest): Observable<AuthResponse> {
    const formData = new FormData();
    formData.append('accountName', request.accountName);
    formData.append('password', request.password);

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, formData).pipe(
      tap((res) => {
        if (res.success && res.data) {
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          this.currentUserSubject.next(res.data);
        }
      })
    );
  }

  // Đăng ký
  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user);
  }

  // Đăng xuất
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Kiểm tra đã đăng nhập chưa
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Lấy người dùng hiện tại
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}
