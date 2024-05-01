import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../service/task/task.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  statusOptions = ['START', 'COMPLETED', 'CLOSED', 'REJECTED', 'INPROGRESS', 'MOVE TO TESTED', 'IN-TESTING', 'HALT'];
  employees: any[] = [];
  formattedDate!: string | null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      assignedto: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      startdate: ['', Validators.required], // Corrected form control name
      duedate:['', Validators.required]
    });

    // Fetch employees and populate dropdown
    this.employeeService.getEmployees().subscribe(users => {
      console.log('Retrieved users:', users); // Debug log for retrieved users
      this.employees = users.map(user => ({
        value: user._id,
        fullName: `${user.fullname}` // Adjust this according to your user data structure
      }));
    });

    // Initialize the date
    const fromDate= new Date();
    this.formattedDate = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Form is valid');
      alert('form in valid');
      const formData = { ...this.taskForm.value };
      formData.startdate = this.datePipe.transform(formData.startdate, 'yyyy-MM-dd'); // Format start date
      formData.duedate = this.datePipe.transform(formData.duedate, 'yyyy-MM-dd'); // Format due date
  
      this.taskService.createtask(formData).subscribe(
        (response) => {
          console.log(response);
          alert('Task created successfully');
        },
        (error) => {
          console.error('Error creating task:', error);
          alert('Failed to create the task');
        }
      );
    } else {
      console.log('Form is invalid');
      alert('form in invalid');
    }
  }
}
