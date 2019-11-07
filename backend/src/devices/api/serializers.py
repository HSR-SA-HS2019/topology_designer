from rest_framework import serializers
from devices.models import Device


class DeviceSerializer(serializers.ModelSerializer):

    icon = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = Device
        fields = ('name', 'type', 'default_name', 'icon')
