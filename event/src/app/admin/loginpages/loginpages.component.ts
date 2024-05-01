import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpages',
  templateUrl: './loginpages.component.html',
  styleUrls: ['./loginpages.component.css']
})
export class LoginpagesComponent {
  loginForm!: FormGroup;

  constructor(private adminService: AdminService,private route:Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(8)])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      
      this.adminService.adminLogin(this.loginForm.value).subscribe(
        (response) => {
          const adminId = response._id; // Extracting admin object ID from the response
          localStorage.setItem('adminId', adminId);
          console.log('admin created successfully with ID:', adminId);
          console.log(response); 
          alert('admin successfully logged in');  // Log the response for debugging
          this.route.navigate(['/admin']);
        },
        (error) => {
          console.error(error); // Log the error for debugging
          alert('Error occurred while logging in. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
  }
}


