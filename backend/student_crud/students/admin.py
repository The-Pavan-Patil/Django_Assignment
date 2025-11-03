from django.contrib import admin
from .models import Student

# Register your models here.


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['id', 'student_name', 'city', 'birth_date', 'is_active', 'created_at']
    list_filter = ['is_active', 'city', 'created_at']
    search_fields = ['student_name', 'city', 'address']
    ordering = ['-created_at']