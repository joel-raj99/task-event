import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin/admin.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      title: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.adminService.employeeSignup(this.userForm.value).subscribe(
        (response: any) => {
          console.log(response); // Log the entire response object to check its structure
       
          this.router.navigate(['/create-task']);

        },
        (error) => {
          console.error(error);
          alert('Error occurred while creating user. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
  }

}  
