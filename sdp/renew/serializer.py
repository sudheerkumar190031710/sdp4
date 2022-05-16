
from dataclasses import field
from rest_framework import serializers
from yaml import serialize
from . models import *
from django.contrib.auth.models import User
  
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email','password','first_name','last_name']
    
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields="__all__"