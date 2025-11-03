from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'student_name', 'city', 'address', 'birth_date', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_student_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Student name cannot be empty")
        return value

    def validate_city(self, value):
        if not value.strip():
            raise serializers.ValidationError("City cannot be empty")
        return value