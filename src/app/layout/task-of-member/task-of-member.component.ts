import { Component } from '@angular/core';
import { UserTasks } from '../../models/user-tasks.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-of-member',
  standalone: false,
  templateUrl: './task-of-member.component.html',
  styleUrl: './task-of-member.component.scss'
})
export class TaskOfMemberComponent {
  displayedColumns: string[] = ['taskID', 'taskName', 'taskDescription', 'isFinished', 'creationTime', 'finishedTime'];
  userTasks: UserTasks[] = [];
  isLoading = true;
  userId: number | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
      this.loadTasksByRole();
    } else {
      this.isLoading = false;
      console.error('User ID not found in localStorage. Please log in.');
    }
  }

  loadTasksByRole(): void {
    if (this.userId === null) {
      console.error('Cannot load tasks: userId is null');
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.taskService.getTasksByRole(this.userId).subscribe({
      next: (userTasks) => {
        this.userTasks = userTasks;
        this.isLoading = false;
        console.log('User tasks loaded:', userTasks);
      },
      error: (error) => {
        console.error('Error loading user tasks:', error);
        this.isLoading = false;
      }
    });
  }
}