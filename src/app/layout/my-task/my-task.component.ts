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

@Component({
  selector: 'app-my-task',
  standalone: true,
  imports: [FormsModule, MatTable, MatIcon, CommonModule, MatTableModule],
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
    private userService: UserService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const userId = Number(localStorage.getItem('userId'));  // Lấy userId từ localStorage
    

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
    if (this.newTask.taskName.trim() && this.newTask.taskDescription.trim()) {
      this.taskService.createTask(this.newTask).subscribe(() => {
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

    this.taskService.updateTask(updatedTask.taskID, updatedTask).subscribe((response) => {
      setTimeout(() => { // 🚀 Đẩy cập nhật ra ngoài animation frame
        console.log('🔄 Task Updated:', response);

        if (response) {
          this.tasks = this.tasks.map(t => t.taskID === response.taskID ? response : t);
        }
      }, 0);
    });
  }
}
