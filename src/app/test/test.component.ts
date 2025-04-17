import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: false,
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  // Khởi tạo FormGroup
  calendarForm = new FormGroup({
    calendarType: new FormControl('', Validators.required),
    firstDay: new FormControl('', Validators.required),
    lastDay: new FormControl('', Validators.required),
  }, { validators: this.dateRangeValidator });

  // Dữ liệu giả cho calendarData
  calendarData: any[] = [
    {
      calendarType: 'Work',
      firstDay: new Date('2025-03-01'), // Ngày 1/3/2025
      lastDay: new Date('2025-03-05'),  // Ngày 5/3/2025
    },
    {
      calendarType: 'Holiday',
      firstDay: new Date('2025-04-10'), // Ngày 10/4/2025
      lastDay: new Date('2025-04-15'),  // Ngày 15/4/2025
    },
    {
      calendarType: 'Event',
      firstDay: new Date('2025-05-20'), // Ngày 20/5/2025
      lastDay: new Date('2025-05-22'),  // Ngày 22/5/2025
    },
  ];

  // Validator tùy chỉnh để kiểm tra lastDay > firstDay
  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const firstDay = control.get('firstDay')?.value;
    const lastDay = control.get('lastDay')?.value;

    if (firstDay && lastDay && new Date(lastDay) <= new Date(firstDay)) {
      return { invalidDateRange: true };
    }
    return null;
  }

  // Hàm xử lý khi submit form
  onSubmit() {
    if (this.calendarForm.valid) {
      this.calendarData.push(this.calendarForm.value); // Thêm dữ liệu mới vào bảng
      this.calendarForm.reset(); // Đặt lại form
      console.log('Dữ liệu bảng:', this.calendarData);
    } else {
      console.log('Form không hợp lệ');
    }
  }

  hasDateRangeError(): boolean {
    return this.calendarForm.errors?.['invalidDateRange'] === true;
  } 
}
