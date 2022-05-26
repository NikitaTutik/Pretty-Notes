from re import L
from django.test import tag
from .models import Note, Tag
from .serializers import NoteSerializer
from rest_framework import generics, permissions
from django.core.exceptions import PermissionDenied
from django.http import HttpRequest
from rest_framework.request import Request

class NoteView(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

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


class NoteDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
