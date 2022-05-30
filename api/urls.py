from django.urls import include, path
from .views import NoteView, NoteCreate, NoteUpdate, NoteDelete, TagsView

urlpatterns = [
    path('notes/', NoteView.as_view()),
    path('notes/create/', NoteCreate.as_view()),
    path('notes/<int:pk>/', NoteUpdate.as_view()),
    path('notes/<int:pk>/delete', NoteDelete.as_view()),
    path('notes/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('notes/tags/', TagsView.as_view()),
    
]