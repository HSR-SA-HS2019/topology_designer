from django.urls import path
from .views import DeviceListView, DeviceDetailView

urlpatterns = [
    path('', DeviceListView.as_view()),
    path('<pk>', DeviceDetailView.as_view()),
]
