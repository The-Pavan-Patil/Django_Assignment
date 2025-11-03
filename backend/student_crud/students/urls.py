from django.urls import path
from . import views

urlpatterns = [
    path('api/students/', views.student_api, name='student-api'),
]