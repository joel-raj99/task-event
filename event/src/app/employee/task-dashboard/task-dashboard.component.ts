import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task/task.service';
import { Task } from 'src/app/service/task/taskModel';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
  tasks: Task[] = [];
  userId: string | null = null;
  statusOptions: string[] = ['START', 'COMPLETED', 'CLOSED', 'REJECTED', 'INPROGRESS', 'ONHOLD', 'CANCELLED', 'DELAYED', 'PENDING', 'TESTED'];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = userId;
      this.loadTasks(userId);
    }
  }

  loadTasks(userId: string): void {
    this.taskService.gettask(userId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onClick(taskId: string, selectedStatus: string): void {
    this.taskService.updateTask(taskId, selectedStatus).subscribe(updatedTask => {
      // Assuming the updatedTask is returned after updating the status
      const index = this.tasks.findIndex(task => task._id === taskId);
      if (index !== -1) {
        // Assuming updatedTask has the same structure as Task model
        this.tasks[index] = updatedTask as Task; // Casting to Task type
      }
    });
  }
}
