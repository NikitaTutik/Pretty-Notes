from rest_framework import serializers
from .models import Note,Tag

class TagSerializer(serializers.ModelSerializer):
    name = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='tags'
     )

    class Meta:
        model = Tag

    def __str__(self):
        return 'Tag[id: {id}, text: {text}]'.format(
            id=self.id, names=self.name)


class NoteSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    tags = serializers.SlugRelatedField(
        many=True,
        required=False,
        queryset=Tag.objects.all(),
        slug_field='name'
    )

    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)

    class Meta:
        model = Note
        fields = '__all__'
