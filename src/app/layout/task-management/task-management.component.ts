import { Component } from '@angular/core';
import { ShowroomService } from '../../services/showroom.service';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Showroom } from '../../models/showroom.model';

@Component({
  selector: 'app-task-management',
  standalone: false,
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.scss'
})
export class TaskManagementComponent {

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
    this.loadShowrooms();
    this.loadTasks();
    this.loadUsers();
  }

  loadShowrooms(): void {
    this.showroomService.getShowrooms().subscribe(
      (data) => {
        console.log('✅ API Response:', data);
        this.showrooms = data;

        // Thêm showroom rỗng vào đầu mảng
        this.showrooms.unshift({
          showroomID: 0,
          showroomName: 'Tất cả'
        });

        if (this.showrooms.length > 0) {
          this.selectedShowroom = this.showrooms[0].showroomID;
        }
      },
      (error) => console.error('❌ API Error:', error)
    );
  }

  loadTasks(): void {
    const userId = this.selectedUser || 0;  // Nếu chưa chọn user, mặc định là 0
    const showroomId = this.selectedShowroom || 0;  // Nếu chưa chọn showroom, mặc định là 0

    console.log('🔄 Loading tasks with userId:', userId, 'and showroomId:', showroomId);

    // Gọi API với các tham số userId và showroomId
    this.taskService.getTasksByUserAndShowroom(userId, showroomId).subscribe(
      (data) => {
        console.log('✅ API Response:', data);
        this.tasks = data;
      },
      (error) => console.error('❌ API Error:', error)
    );
  }
  

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log('✅ API Response:', data);
        this.users = data;

        // Thêm user rỗng vào đầu mảng
        this.users.unshift({
          userID: 0,
          userName: '',
          fullName: 'Tất cả',
          email: '',
          password: '',
          phoneNumber: '',
          dob: new Date(),
        });

        if (this.users.length > 0) {
          this.selectedUser = this.users[0].userID;
        }
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
