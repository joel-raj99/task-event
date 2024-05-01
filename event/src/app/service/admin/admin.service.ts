import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // Admin endpoints
  adminSignup(admin: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/adminsignup`, admin);
  }

  adminLogin(admin: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/adminlogin`, admin);
  }

  adminLogout(admin: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/adminlogout`, admin);
  }

  // Employee endpoints
  employeeSignup(userForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employeesignup`, userForm);
  }

  employeeLogin(employee: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employeelogin`, employee);
  }

  employeeLogout(employee: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employeelogout`, employee);
  }
}
