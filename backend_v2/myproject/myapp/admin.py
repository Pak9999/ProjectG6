from django.contrib import admin
from .models import *
from .forms import ArticleForm

class ArticleAdmin(admin.ModelAdmin):
    form = ArticleForm

admin.site.register(Article, ArticleAdmin)
