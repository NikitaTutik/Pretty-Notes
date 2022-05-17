from .models import Note
from .serializers import NoteSerializer
from rest_framework import generics, permissions
from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import User

class NoteView(generics.ListAPIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(self.request.user.id)
        if not self.request.user.is_authenticated:
            raise PermissionDenied()
        return Note.objects.filter(author=self.request.user)
        

class NoteCreate(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def post(self, request, *args, **kwargs):
        data=request.data
        return Note.objects.create(body=data['body'], author=User.objects.get(pk=request.user.id))


class NoteUpdate(generics.RetrieveUpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class NoteDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
