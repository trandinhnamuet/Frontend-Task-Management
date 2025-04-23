import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  fullName: string = '';

  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        const currentUser = JSON.parse(userString);
        this.fullName = currentUser.fullName || '';
      } catch (error) {
        console.error('Lỗi khi parse currentUser từ localStorage:', error);
      }
    }
  }

  logout() {  
    localStorage.clear();
  }
}
