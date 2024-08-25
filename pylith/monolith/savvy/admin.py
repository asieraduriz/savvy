from django.contrib import admin

from .models import Category, Expense, OneTimeExpense, SubscriptionCharge, Subscription, Goal, MonthlySpendingLimitCategory, MonthlySpendingLimitTitle

# Register your models here.
admin.site.register(Category)
admin.site.register(Expense)
admin.site.register(OneTimeExpense)
admin.site.register(SubscriptionCharge)
admin.site.register(Subscription)
admin.site.register(Goal)
admin.site.register(MonthlySpendingLimitCategory)
admin.site.register(MonthlySpendingLimitTitle)