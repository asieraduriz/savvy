from django.db import models
from django.contrib.auth.models import User
from .category import Category

DAYS = 'days'
WEEKS = 'weeks'
MONTHS = 'months'
YEARS = 'years'
INTERVAL_CHOICES = [
    (DAYS, 'Days'),
    (WEEKS, 'Weeks'),
    (MONTHS, 'Months'),
    (YEARS, 'Years')
]

ACTIVE = 'active'
ARCHIVED = 'archived'
STATUS_CHOICES = [
    (ACTIVE, 'Active'),
    (ARCHIVED, 'Archived')
]

class Subscription(models.Model):
    title = models.CharField(max_length=255)
    charged_amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    start_date = models.DateField()
    
    interval = models.CharField(max_length=10, choices=INTERVAL_CHOICES)
    every = models.PositiveIntegerField()
    
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title