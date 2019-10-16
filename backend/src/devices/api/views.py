from rest_framework.generics import ListAPIView, RetrieveAPIView
from devices.models import Device
from .serializers import DeviceSerializer


class DeviceListView(ListAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer


class DeviceDetailView(RetrieveAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
