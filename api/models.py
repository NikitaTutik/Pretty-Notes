from django.db import models
from django.contrib.auth.models import User

class Tag(models.Model):
    name = models.CharField(max_length=55, unique=True)

    def __str__(self):
        return self.name


class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name='tags')

    def __str__(self) -> str:
        return self.body[0:30]  
         