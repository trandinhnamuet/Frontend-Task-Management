import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    taskID: 0,
    taskName: '',
    taskDescription: '',
    isFinished: false,
    creationTime: new Date().toISOString(),
    finishedTime: null,
  };
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
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

  trackByTaskID(index: number, task: Task): number {
    return task.taskID;
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
