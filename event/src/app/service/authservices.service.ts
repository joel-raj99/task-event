import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  loggedInUserId$: Observable<string | null> = this.loggedInUserIdSubject.asObservable();

  constructor() {
    // You might have authentication logic here to determine the logged-in user
    // For the sake of example, let's assume we have a function to get the user ID
    const userId = this.getLoggedInUserIdFromLocalStorage();
    if (userId) {
      this.loggedInUserIdSubject.next(userId);
    }
  }

  // Function to set the logged-in user ID
  setLoggedInUserId(userId: string): void {
    localStorage.setItem('loggedInUserId', userId);
    this.loggedInUserIdSubject.next(userId);
  }

  // Function to clear the logged-in user ID (logout)
  clearLoggedInUserId(): void {
    localStorage.removeItem('loggedInUserId');
    this.loggedInUserIdSubject.next(null);
  }

  // Function to get the logged-in user ID
  getLoggedInUserId(): string | null {
    return localStorage.getItem('loggedInUserId');
  }

  // Example function to get the logged-in user ID from local storage
  private getLoggedInUserIdFromLocalStorage(): string | null {
    return localStorage.getItem('loggedInUserId');
  }
}
