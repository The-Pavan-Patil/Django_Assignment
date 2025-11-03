import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.services';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.css']
})
export class StudentCrudComponent implements OnInit {
  students: Student[] = [];
  studentForm!: FormGroup;
  currentView: 'list' | 'add' | 'edit' | 'view' = 'list';
  selectedStudent: Student | null = null;
  isSubmitting = false;
  alertMessage = '';
  alertType: 'success' | 'error' | '' = '';

  cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow'
  ];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadStudents();
  }

  initializeForm(): void {
    this.studentForm = this.fb.group({
      id: [null],
      student_name: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      is_active: [true]
    });
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.students = response.data;
          console.log('Students loaded:', this.students);
        } else {
          this.showAlert('Failed to load students: Invalid response format', 'error');
        }
      },
      error: (error) => {
        this.showAlert('Error loading students: ' + error.message, 'error');
        console.error('Error loading students:', error);
      }
    });
  }

  showAddForm(): void {
    this.currentView = 'add';
    this.studentForm.reset({ is_active: true });
  }

  showEditForm(student: Student): void {
    this.currentView = 'edit';
    this.selectedStudent = student;
    this.studentForm.patchValue(student);
  }

  showViewDetails(student: Student): void {
    this.currentView = 'view';
    this.selectedStudent = student;
  }

  showList(): void {
    this.currentView = 'list';
    this.selectedStudent = null;
    this.studentForm.reset({ is_active: true });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.markFormGroupTouched(this.studentForm);
      return;
    }

    this.isSubmitting = true;
    const studentData = this.studentForm.value;

    if (this.currentView === 'add') {
      this.studentService.createStudent(studentData).subscribe({
        next: (response) => {
          if (response.success) {
            this.showAlert('Student added successfully!', 'success');
            this.loadStudents();
            this.showList();
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          this.showAlert('Error adding student', 'error');
          console.error('Error:', error);
          this.isSubmitting = false;
        }
      });
    } else if (this.currentView === 'edit') {
      this.studentService.updateStudent(studentData).subscribe({
        next: (response) => {
          if (response.success) {
            this.showAlert('Student updated successfully!', 'success');
            this.loadStudents();
            this.showList();
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          this.showAlert('Error updating student', 'error');
          console.error('Error:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  onReset(): void {
    if (this.currentView === 'edit' && this.selectedStudent) {
      this.studentForm.patchValue(this.selectedStudent);
    } else {
      this.studentForm.reset({ is_active: true });
    }
  }

  onCancel(): void {
    this.showList();
  }

  onDelete(id: number, name: string): void {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      this.studentService.deleteStudent(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.showAlert('Student deleted successfully!', 'success');
            this.loadStudents();
          }
        },
        error: (error) => {
          this.showAlert('Error deleting student', 'error');
          console.error('Error:', error);
        }
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 4000);
  }

  get f() {
    return this.studentForm.controls;
  }
}