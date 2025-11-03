from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer

# Create your views here.


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def student_api(request):
    """
    Single API endpoint to handle all CRUD operations for students
    GET: List all students or get a specific student by ID
    POST: Create a new student
    PUT: Update an existing student
    DELETE: Delete a student
    """
    
    if request.method == 'GET':
        student_id = request.query_params.get('id', None)
        
        if student_id:
            try:
                student = Student.objects.get(pk=student_id)
                serializer = StudentSerializer(student)
                return Response({
                    'success': True,
                    'data': serializer.data
                }, status=status.HTTP_200_OK)
            except Student.DoesNotExist:
                return Response({
                    'success': False,
                    'message': 'Student not found'
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            students = Student.objects.all()
            serializer = StudentSerializer(students, many=True)
            return Response({
                'success': True,
                'data': serializer.data,
                'count': len(serializer.data)
            }, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'message': 'Student created successfully',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': 'Validation failed',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        student_id = request.data.get('id', None)
        
        if not student_id:
            return Response({
                'success': False,
                'message': 'Student ID is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            student = Student.objects.get(pk=student_id)
            serializer = StudentSerializer(student, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Student updated successfully',
                    'data': serializer.data
                }, status=status.HTTP_200_OK)
            return Response({
                'success': False,
                'message': 'Validation failed',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response({
                'success': False,
                'message': 'Student not found'
            }, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'DELETE':
        student_id = request.query_params.get('id', None)
        
        if not student_id:
            return Response({
                'success': False,
                'message': 'Student ID is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            student = Student.objects.get(pk=student_id)
            student_name = student.student_name
            student.delete()
            return Response({
                'success': True,
                'message': f'Student "{student_name}" deleted successfully'
            }, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({
                'success': False,
                'message': 'Student not found'
            }, status=status.HTTP_404_NOT_FOUND)