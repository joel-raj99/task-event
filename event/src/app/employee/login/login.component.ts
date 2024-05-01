import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AdminService } from '../../service/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userform!: FormGroup;
  loginError: string = '';

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.userform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.userform.valid) {
      this.loginError = ''; // Reset login error message
      this.adminService.employeeLogin(this.userform.value)
        .pipe(
          catchError(error => {
            this.loginError = 'Login failed. Please check your credentials.';
            return throwError(error); // Returning an observable with error
          })
        )
        .subscribe((response: any) => {
          if (response && response._id) {
            const userId = response._id; // Extracting user object ID from the response
            localStorage.setItem('userId', userId);
            console.log('User logged in successfully with ID:', userId);
            alert('User successfully logged in');
            this.router.navigate(['/task1']); // Navigating to desired route upon successful login
          } else {
            this.loginError = 'Login failed. Invalid response from server.';
          }
        });
    } else {
      // Mark all fields as touched to display validation errors
      this.userform.markAllAsTouched();
    }
  }
}
