import { Component } from '@angular/core';
import { StudentCrudComponent } from './components/student-crud/student-crud.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentCrudComponent],
  template: `<app-student-crud></app-student-crud>`,
  styles: []
})
export class AppComponent {
  title = 'Student Management System';
}