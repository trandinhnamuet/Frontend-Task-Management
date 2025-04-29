import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { UserTasks } from '../models/user-tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5283/api/Task';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Lọc theo userId và showroomId
  getTasksByUserAndShowroom(userId?: number, showroomId?: number): Observable<Task[]> {
    let params = new HttpParams();

    if (userId) {
      params = params.append('userId', userId.toString());
    }
    if (showroomId) {
      params = params.append('showroomId', showroomId.toString());
    }

    return this.http.get<Task[]>(`${this.apiUrl}/filter`, { params });
  }

  createTaskWithUser(task: Task, userId: number): Observable<Task> {
    const payload = {
      task: task,
      userId: userId
    };
  
    return this.http.post<Task>(`${this.apiUrl}/create-with-user`, payload);
  }
  
  // Thêm phương thức mới: Lấy danh sách task theo vai trò của user
  getTasksByRole(userId: number): Observable<UserTasks[]> {
    return this.http.get<UserTasks[]>(`${this.apiUrl}/by-role/${userId}`);
  }

}
