import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student, ApiResponse } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8002/api/students/';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<ApiResponse<Student[]>> {
    return this.http.get<ApiResponse<Student[]>>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getStudent(id: number): Observable<ApiResponse<Student>> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<ApiResponse<Student>>(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  createStudent(student: Student): Observable<ApiResponse<Student>> {
    return this.http.post<ApiResponse<Student>>(this.apiUrl, student).pipe(
      catchError(this.handleError)
    );
  }

  updateStudent(student: Student): Observable<ApiResponse<Student>> {
    return this.http.put<ApiResponse<Student>>(this.apiUrl, student).pipe(
      catchError(this.handleError)
    );
  }

  deleteStudent(id: number): Observable<ApiResponse<null>> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<ApiResponse<null>>(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}
