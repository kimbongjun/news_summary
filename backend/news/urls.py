from django.urls import path
from .views import NewsSummaryView

urlpatterns = [
    path('', NewsSummaryView.as_view()),
]
