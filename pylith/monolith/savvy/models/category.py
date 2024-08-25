from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    title = models.CharField(max_length=255)
    color = models.CharField(max_length=7)  # For hex colors like '#FFFFFF'
    icon = models.CharField(max_length=255, blank=True, null=True)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
