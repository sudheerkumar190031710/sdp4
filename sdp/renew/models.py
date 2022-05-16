from distutils.command.upload import upload
from email.policy import default
from operator import mod
from django.db import models

# Create your models here.
class Post(models.Model):
    user=models.CharField(max_length=30,blank=True,null=True)
    name=models.CharField(max_length=20,blank=True,null=True)
    description=models.TextField(blank=True,null=True)
    type=models.CharField(max_length=15,blank=True,null=True)
    brand=models.CharField(max_length=15,blank=True,null=True)
    year=models.PositiveSmallIntegerField(blank=True,null=True)
    condition=models.CharField(max_length=8,blank=True,null=True)
    place=models.CharField(max_length=20,blank=True,null=True)
    price=models.PositiveBigIntegerField(blank=True,null=True)
    img=models.ImageField(upload_to="post/",default='def.jpg')
