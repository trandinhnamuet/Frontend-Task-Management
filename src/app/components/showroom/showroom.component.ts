import { Component, OnInit } from '@angular/core';
import { ShowroomService } from '../../services/showroom.service';
import { Showroom } from '../../models/showroom.model';

@Component({
  selector: 'app-showroom',
  standalone: false,
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css'],
})
export class ShowroomComponent implements OnInit {
  showrooms: Showroom[] = [];
  newShowroom: Showroom = { showroomID: 0, showroomName: '' };
  selectedShowroom: Showroom | null = null;

  constructor(private showroomService: ShowroomService) {}

  ngOnInit(): void {
    this.loadShowrooms();
  }

  loadShowrooms(): void {
    this.showroomService.getShowrooms().subscribe(
      (data) => {
        console.log('✅ API Response:', data); // Kiểm tra dữ liệu nhận được từ API
        this.showrooms = data;
      },
      (error) => console.error('❌ API Error:', error)
    );
  }
  

  addShowroom(): void {
    if (this.newShowroom.showroomName.trim()) {
      this.showroomService.createShowroom(this.newShowroom).subscribe(() => {
        this.loadShowrooms();
        this.newShowroom = { showroomID: 0, showroomName: '' };
      });
    }
  }
  
  editShowroom(showroom: Showroom): void {
    this.selectedShowroom = { ...showroom }; // Tạo bản sao showroom để chỉnh sửa
  }
  
  updateShowroom(): void {
    if (this.selectedShowroom) {
      this.showroomService.updateShowroom(this.selectedShowroom.showroomID, this.selectedShowroom)
        .subscribe(() => {
          this.loadShowrooms();
          this.selectedShowroom = null; // Reset form sau khi cập nhật
        });
    }
  }
  

  deleteShowroom(id: number): void {
    this.showroomService.deleteShowroom(id).subscribe(() => this.loadShowrooms());
  }
}
