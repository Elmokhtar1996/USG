import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUri: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  // Get all employees
  getAdherant() {
    return this.http.get(`${this.baseUri}/adherant`);
  }
  getSection() {
    return this.http.get(`${this.baseUri}/section`);
  }
   
  getProtected(){

    return this.http.get(`${this.baseUri}/protected`);
  }

  
  
  }
