import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signForm!: FormGroup;

  constructor( private route: Router,private adminService: AdminService) {}

  ngOnInit() {
    this.signForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(5)])
    });
  }

  onSubmit() {
    if (this.signForm.valid) {
      this.adminService.adminSignup(this.signForm.value).subscribe(
        (response) => {
          alert('Admin account created successfully');
          this.signForm.reset();
          this.route.navigate(['/login1']);
        },
        (error) => {
          if (error.status === 400) {
            alert('Admin already exists');
          } else {
            alert('Something went wrong');
          }
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
  }
}
