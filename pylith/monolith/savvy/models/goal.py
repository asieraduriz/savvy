from django.db import models
from .category import Category

class Goal(models.Model):
    title = models.CharField(max_length=100)

class MonthlySpendingLimit(Goal):
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()

class MonthlySpendingLimitCategory(MonthlySpendingLimit):
    categoryLink = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)

class MonthlySpendingLimitTitle(MonthlySpendingLimit):
    expenseTitleLink = models.CharField(max_length=255)
    