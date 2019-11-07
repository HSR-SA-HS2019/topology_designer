from django.db import models


class Device(models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    defaultName = models.CharField(max_length=50)
    icon = models.ImageField(
        upload_to='images/', default='images/NotFound.png')
