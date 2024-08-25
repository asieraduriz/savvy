from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Category model
class Category(models.Model):
    title = models.CharField(max_length=255)
    color = models.CharField(max_length=7)  # For hex colors like '#FFFFFF'
    icon = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title

# One-time expense model
class Expense(models.Model):
    title = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    charged_date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

# Subscription model
class Subscription(models.Model):
    WEEKLY = 'weekly'
    MONTHLY = 'monthly'
    YEARLY = 'yearly'
    INTERVAL_CHOICES = [
        (WEEKLY, 'Weekly'),
        (MONTHLY, 'Monthly'),
        (YEARLY, 'Yearly')
    ]

    title = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    start_date = models.DateField()
    interval = models.CharField(max_length=10, choices=INTERVAL_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

# SubscriptionCharge model for tracking individual charges of a subscription
class SubscriptionCharge(models.Model):
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    charge_date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.subscription.title} - {self.charge_date}"

# Goal model
class Goal(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    expense = models.ForeignKey(Expense, on_delete=models.SET_NULL, null=True, blank=True)
    subscription = models.ForeignKey(Subscription, on_delete=models.SET_NULL, null=True, blank=True)
    monthly_target = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

# ExpenseHistory model to track changes
class ExpenseHistory(models.Model):
    expense = models.ForeignKey(Expense, on_delete=models.CASCADE, null=True, blank=True)
    subscription_charge = models.ForeignKey(SubscriptionCharge, on_delete=models.CASCADE, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    update_date = models.DateTimeField(auto_now_add=True)
    change_description = models.TextField()

    def __str__(self):
        return f"History for {self.expense or self.subscription_charge}"
