import { Component } from '@angular/core';
import { ShowroomService } from '../../services/showroom.service';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Showroom } from '../../models/showroom.model';
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';


@Component({
  selector: 'app-my-task',
  standalone: true,
  imports: [FormsModule, MatTable, MatIcon, CommonModule, MatTableModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './my-task.component.html',
  styleUrl: './my-task.component.scss'
})
export class MyTaskComponent {
showrooms: Showroom[] = [];
  selectedShowroom: any;

  tasks: Task[] = [];
  users: User[] = [];
  newTask: Task = {
    taskID: 0,
    taskName: '',
    taskDescription: '',
    isFinished: false,
    creationTime: new Date().toISOString(),
    finishedTime: null,
  };
  selectedTask: Task | null = null;
  selectedUser: any;

  constructor(private showroomService: ShowroomService, 
    private taskService: TaskService,
    private userService: UserService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const userId = Number(localStorage.getItem('userId')) || -1 ;  // Lấy userId từ localStorage
    

    // Gọi API với các tham số userId và showroomId
    this.taskService.getTasksByUserAndShowroom(userId, 0).subscribe(
      (data) => {
        console.log('✅ API Response:', data);
        this.tasks = data;
      },
      (error) => console.error('❌ API Error:', error)
    );
  }

  addTask(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (this.newTask.taskName.trim() && this.newTask.taskDescription.trim()) {
      this.taskService.createTaskWithUser(this.newTask, userId).subscribe(() => {
        this.loadTasks();
        this.newTask = {
          taskID: 0,
          taskName: '',
          taskDescription: '',
          isFinished: false,
          creationTime: new Date().toISOString(),
          finishedTime: null,
        };
      });
    }
  }
  

  editTask(task: Task): void {
    this.selectedTask = { ...task };
  }

  updateTask(): void {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask.taskID, this.selectedTask).subscribe(() => {
        this.loadTasks();
        this.selectedTask = null;
      });
    }
  }
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  toggleFinished(task: Task): void {
    console.log('🔄 Toggling Task:', task);
    const updatedTask = { ...task, isFinished: task.isFinished };
    updatedTask.finishedTime = updatedTask.isFinished ? new Date().toISOString() : null; // Cập nhật thời gian hoàn thành nếu task đã hoàn thành

    this.taskService.updateTask(updatedTask.taskID, updatedTask).subscribe((response) => {
      setTimeout(() => { // 🚀 Đẩy cập nhật ra ngoài animation frame
        console.log('🔄 Task Updated:', response);

        if (response) {
          this.tasks = this.tasks.map(t => t.taskID === response.taskID ? response : t);
        }
      }, 0);
    });
  }

  //Hàm mở dialog để tạo task mới:-------------------------------------------------------------------------------------------
  openAddDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {
        task: {
          taskID: 0,
          taskName: '',
          taskDescription: '',
          isFinished: false,
          creationTime: new Date().toISOString(),
          finishedTime: null
        }
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = Number(localStorage.getItem('userId'));
        console.log('🔄 Creating Task:', result);
        this.taskService.createTaskWithUser(result, userId).subscribe(() => this.loadTasks());
      }
    });
  }
  
  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { task }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('🔄 Updating Task:', result);
        this.taskService.updateTask(result.taskID, result).subscribe(() => this.loadTasks());
      }
    });
  }
  
}
