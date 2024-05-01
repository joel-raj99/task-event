import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
private baseUrl: string = 'http://localhost:3000/api/event'
  constructor(private http: HttpClient) { }

  createEvents() {
    return this.http.get(`${this.baseUrl}/createevent`);
  }
  getEvent() {
    return this.http.get(`${this.baseUrl}/getevent`);
  }

}
