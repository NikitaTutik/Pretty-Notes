from .models import Note, Tag
from .serializers import NoteSerializer, TagSerializer
from rest_framework import generics, permissions
from django.core.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend


class NoteView(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tags__name']

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            raise PermissionDenied()
        return Note.objects.filter(author=self.request.user)
        

class NoteCreate(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def create(self, request, *args, **kwargs):
        tags = []
        for tag in request.data['tags'].split():
            Tag.objects.get_or_create(name=tag)
            tags.append(tag)
        request.data['tags'] = tags
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class NoteUpdate(generics.RetrieveUpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def update(self, request, *args, **kwargs):
        tags = []
        for tag in request.data['tags'].split():
            Tag.objects.get_or_create(name=tag)
            tags.append(tag)
        request.data['tags'] = tags
        return super().update(request, *args, **kwargs)


class NoteDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class TagsView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']

