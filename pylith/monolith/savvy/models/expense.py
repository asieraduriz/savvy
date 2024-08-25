
from django.contrib.auth.models import User
from django.db import models
from .subscription import Subscription
from .category import Category

class Expense(models.Model):
    title = models.CharField(max_length=255)
    charged_amount = models.DecimalField(max_digits=10, decimal_places=2)
    charged_date = models.DateField()
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.title}: {self.charged_amount}"

class OneTimeExpense(Expense):
    def __str__(self):
        return f"One-Time Expense - {self.title}: {self.amount}"

class SubscriptionCharge(Expense):
    subscription = models.ForeignKey(Subscription, on_delete=models.DO_NOTHING)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return f"Subscription Charge - {self.title}: {self.amount} ({self.period_start_date} to {self.period_end_date})"
