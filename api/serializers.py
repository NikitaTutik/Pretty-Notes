from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    #author = serializers.CharField()
    class Meta:
        model = Note
        fields = '__all__'
