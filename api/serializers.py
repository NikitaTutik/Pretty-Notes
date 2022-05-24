from rest_framework import serializers
from .models import Note,Tag

class TagSerializer(serializers.ModelSerializer):
    names = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='tag'
     )

    class Meta:
        model = Tag


class NoteSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    tags = serializers.SlugRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = Note
        fields = '__all__'
