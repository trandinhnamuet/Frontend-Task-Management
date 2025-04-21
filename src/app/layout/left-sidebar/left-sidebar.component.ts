import { Component } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  standalone: false,
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {
  isHovered = false;

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
}
