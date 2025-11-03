from django.db import models

# Create your models here.


class Student(models.Model):
    student_name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    address = models.TextField()
    birth_date = models.DateField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'students'
        ordering = ['-created_at']

    def __str__(self):
        return self.student_name