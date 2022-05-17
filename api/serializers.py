from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    author_name= serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Note
        fields = '__all__'
