# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django import forms
from .forms import *
import json
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
import json

client = Elasticsearch()


# This is just sample test data for systems. The real data will need to be retrieved from the databse.
testData = {
    "system1": {
        "name": "System 1",
        "group": "Group 1",
        "basic1": "Basic 1",
        "basic2": "Basic 2",
        "basic3": "Basic 3",
        "tags": ["tag1", "tag2", "tag3"]
    },
    "system2": {
        "name": "System 2",
        "group": "Group 2",
        "basic1": "Basic 1",
        "basic2": "Basic 2",
        "basic3": "Basic 3",
        "tags": ["tag1", "tag2", "tag3"]
    },
    "system3": {
        "name": "System 3",
        "group": "Group 3",
        "basic1": "Basic 1",
        "basic2": "Basic 2",
        "basic3": "Basic 3",
        "tags": ["tag1", "tag2", "tag3"]
    },
    "system4": {
        "name": "System 4",
        "group": "Group 4",
        "basic1": "Basic 1",
        "basic2": "Basic 2",
        "basic3": "Basic 3",
        "tags": ["tag1", "tag2", "tag3"]
    }
}


# route for loading the initial homepage, which is the login page in this case.
def index(request):
    if request.method == 'GET':
        return render(request, "TagX/login.html")
    return None


# route for logging in a user
def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            userObj = form.cleaned_data
            username = userObj['username']
            password =  userObj['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                auth_login(request, user)
                return HttpResponseRedirect('/mysystems/')
    return HttpResponseRedirect('/')


def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            userObj = form.cleaned_data
            username = userObj['username']
            password =  userObj['password']
            if not (User.objects.filter(username=username).exists()):
                User.objects.create_user(username, password)
                user = authenticate(username = username, password = password)
                auth_login(request, user)
                return HttpResponseRedirect('/mysystems/')
            else:
                raise forms.ValidationError('Looks like a username already exists')
    return HttpResponseRedirect('/')


def logout(request):
    if request.method == 'POST' and request.user.is_authenticated():
        auth_logout(request)
    return HttpResponseRedirect('/')


# route for rendering the My Systems page.
def mysystems(request):
    if request.method == 'GET' and request.user.is_authenticated():
        print(request.user)
        # 'testData' is just random data right now, the real data will need to be retrieved from the databse.
        return render(request, "TagX/my_systems.html", {'testData': json.dumps(testData)})
    return HttpResponseRedirect('/')


# route for rendering the System page.
def system(request):
    if request.method == 'GET' and request.user.is_authenticated():
        return render(request, "TagX/system.html")
    return HttpResponseRedirect('/')


def search(self):
    #For Alpha only. Need more specific queries in future
    #Returns list of systems from companyName "Arkon"
    search = Search(using=client, index="devices").query("match", companyName="Arkon")
    response = search.execute()
    Arkon_systems = []
    for hit in response:
        Arkon_systems.append(hit)
    return Arkon_systems