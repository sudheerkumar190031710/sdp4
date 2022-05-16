from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework.views import APIView
from yaml import serialize
from .models import *
from rest_framework.response import Response
from .serializer import UserSerializer,PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password

# Create your views here.
class UserView(APIView):
    
    serializer_class = UserSerializer
  
    def get(self, request):
        a = [ {"UserName": a.username,"Email": a.email,"password":a.password,"First Name":a.first_name,"Last Name":a.last_name} 
        for a in User.objects.all()]
        return Response(a)
  
    def post(self, request):
  
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            password = serializer.validated_data.get('password')
            serializer.validated_data['password']=make_password(password)
            serializer.save()
            return  Response(serializer.data)

class PostView(APIView):
    serializer_class= PostSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get(self,request):
        a = [ {"User": a.user,"Name": a.name,"Description":a.description,"Type":a.type,"Brand":a.brand,"Year":a.year,"Condition":a.condition,"Place":a.place,"Price":a.price,"Image":a.img.url} 
        for a in Post.objects.all()]
        return Response(a)
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)
        else:
            print('error', PostSerializer.errors)
            return Response(PostSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

def home(request):
    #user = User.objects.create_user("sudheer","v.sudheerkumar91@gmail.com","root")
    #user.save()
    return HttpResponse("<h1>sudheer</h1>")

