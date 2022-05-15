from .models import Note
from .serializers import NoteSerializer
from rest_framework import generics, permissions

class NoteView(generics.ListAPIView):
    serializer_class = NoteSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)



class NoteCreate(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class NoteUpdate(generics.RetrieveUpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class NoteDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
