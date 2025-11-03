# Student CRUD Application

A full-stack web application for managing student records with Django REST Framework backend and Angular frontend.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete student records
- **RESTful API**: Django REST Framework powered backend
- **Modern Frontend**: Angular application with reactive forms
- **Responsive Design**: Tailwind CSS for styling
- **Database**: PostgreSQL database integration
- **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

### Backend
- **Django 5.2.7**: Web framework
- **Django REST Framework**: API development
- **PostgreSQL**: Database
- **CORS Headers**: Cross-origin support

### Frontend
- **Angular 20**: Frontend framework
- **TypeScript**: Programming language
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client

## Project Structure

```
student_crud/
├── backend/                    # Django backend
│   └── student_crud/
│       ├── manage.py
│       ├── student_crud/
│       │   ├── settings.py
│       │   ├── urls.py
│       │   └── ...
│       └── students/
│           ├── models.py       # Student model
│           ├── views.py        # API views
│           ├── serializers.py  # Data serialization
│           ├── urls.py         # URL routing
│           └── ...
├── frontend/                   # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   └── student-crud/
│   │   │   │       ├── student-crud.component.ts
│   │   │   │       ├── student-crud.component.html
│   │   │   │       └── student-crud.component.css
│   │   │   ├── models/
│   │   │   │   └── student.model.ts
│   │   │   ├── services/
│   │   │   │   └── student.services.ts
│   │   │   └── ...
│   └── ...
└── README.md
```

## Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL
- Angular CLI

## Installation & Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend/student_crud
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Database setup:**
   - Create PostgreSQL database named `student_db`
   - Update database credentials in `student_crud/settings.py` if needed
   - Run migrations:
     ```bash
     python manage.py makemigrations
     python manage.py migrate
     ```

5. **Run the backend server:**
   ```bash
   python manage.py runserver
   ```
   Server will start at `http://127.0.0.1:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the frontend server:**
   ```bash
   npm start
   ```
   Application will be available at `http://localhost:4200`

## API Endpoints

The backend provides a single API endpoint for all CRUD operations:

- **URL**: `/api/students/`
- **Methods**:
  - `GET`: Retrieve all students or specific student by ID
  - `POST`: Create a new student
  - `PUT`: Update an existing student
  - `DELETE`: Delete a student

### API Usage Examples

**Get all students:**
```bash
GET /api/students/
```

**Get specific student:**
```bash
GET /api/students/?id=1
```

**Create student:**
```bash
POST /api/students/
Content-Type: application/json

{
  "student_name": "John Doe",
  "city": "Mumbai",
  "address": "123 Main St",
  "birth_date": "2000-01-01",
  "is_active": true
}
```

**Update student:**
```bash
PUT /api/students/
Content-Type: application/json

{
  "id": 1,
  "student_name": "Jane Doe",
  "city": "Delhi",
  "address": "456 Oak St",
  "birth_date": "2000-01-01",
  "is_active": true
}
```

**Delete student:**
```bash
DELETE /api/students/?id=1
```

## Student Model

The Student model includes the following fields:

- `student_name`: CharField (max 100 chars)
- `city`: CharField (max 100 chars)
- `address`: TextField
- `birth_date`: DateField
- `is_active`: BooleanField (default: True)
- `created_at`: DateTimeField (auto-generated)
- `updated_at`: DateTimeField (auto-updated)

## Development

### Running Tests

**Backend tests:**
```bash
cd backend/student_crud
python manage.py test
```

**Frontend tests:**
```bash
cd frontend
npm test
```

### Building for Production

**Frontend build:**
```bash
cd frontend
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
