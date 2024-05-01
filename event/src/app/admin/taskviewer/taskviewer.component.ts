// taskviewer.component.ts
import { Component, OnInit } from '@angular/core';
import { Task } from '../../service/task/taskModel';
import { TaskService } from 'src/app/service/task/task.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { Employee } from '../../service/employee/employeeModel';

@Component({
  selector: 'app-taskviewer',
  templateUrl: './taskviewer.component.html',
  styleUrls: ['./taskviewer.component.css'],
})
export class TaskviewerComponent implements OnInit {
  tasks: Task[] = [];
  employees: Employee[] = [];
  Task: any;

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
    this.fetchEmployees(); // Call method to fetch employees
  }

  fetchTasks(): void {
    this.taskService.getalltask().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  fetchEmployees(): void {
    // Method to fetch employees
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        console.log('Retrieved employees:', employees);
        this.employees = employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  getEmployeeFullName(employeeId: number): string {
    const employee = this.employees.find((emp) => emp.id === employeeId);
    return employee ? employee.fullName : 'Unknown'; // Return full name if employee is found, otherwise return 'Unknown'
  }
}
