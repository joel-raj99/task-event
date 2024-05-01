import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from '../task/taskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/api/task';

  constructor(private http: HttpClient) { }

  createtask(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createtask`, task)
      .pipe(
        catchError(error => {
          console.error('Error creating task:', error);
          return throwError(error);
        })
      );
  }
  gettask(userId: any): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/gettask/${userId}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching tasks:', error);
          return throwError(error);
        })
      );
  }

  updateTask(taskId: string,newStatus:string ): Observable<Task> {
    return this.http.put<any>(`${this.baseUrl}/update/${taskId}`, { status: newStatus });
  }

  getalltask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/getalltasks`)
      .pipe(
        catchError(error => {
          console.error('Error fetching all tasks:', error);
          return throwError(error);
        })
      );
  }
}
