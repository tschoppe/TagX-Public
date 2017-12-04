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
        searchStr = request.GET.get('search', '')
        criteria = request.GET.get('criteria', '')
        search = Search(using=client, index="devices") \
                .query("match", companyName="Arkon")
        if searchStr != '' and criteria == 'system_name':
            search = search.query("match", systemName=searchStr)
        elif searchStr != '' and criteria == 'operating_system':
            search = search.query("match", osVersion=searchStr)
        elif searchStr != '' and criteria == 'location':
            search = search.query("match", location__country=searchStr)
        elif searchStr != '' and criteria == 'tags':
            search = search.query("match", companyName="Arkon")
        response = search.execute()
        systems = {}
        for hit in response:
            systems[hit.serialNumber] = {
                    "name": hit.systemName, 
                    "groups": [],
                    "osVersion": hit.osVersion,
                    "model": hit.model,
                    "location": hit["location.country"],
                    "tags": ["tag1", "tag2", "tag3"]
                }
        return render(request, "TagX/my_systems.html", {
            'url': str(request.path), 
            'systems': json.dumps(systems),
            'search': {
                'searchStr': searchStr,
                'criteria': criteria
            }
        })
    return HttpResponseRedirect('/')


# route for rendering the System page.
def system(request):
    if request.method == 'GET' and request.user.is_authenticated():
        return render(request, "TagX/system.html", {'url': str(request.path)})
    return HttpResponseRedirect('/')


# route for rendering the Groups page.
def mygroups(request):
    if request.method == 'GET' and request.user.is_authenticated():
        return render(request, "TagX/mygroups.html", {'url': str(request.path), 'testData': json.dumps(testData)})
    return HttpResponseRedirect('/')


# route for rendering the Admin page.
def administration(request):
    if request.method == 'GET' and request.user.is_authenticated():
        return render(request, "TagX/administration.html", {'url': str(request.path)})
    return HttpResponseRedirect('/')


# post request for performing a search
def search(request):
    if request.method == 'POST' and request.user.is_authenticated():
        form = SearchForm(request.POST)
        if form.is_valid():
            searchObj = form.cleaned_data
            search = searchObj['search']
            criteria = searchObj['criteria']
            return HttpResponseRedirect('/mysystems/?search=%s&criteria=%s' % (search, criteria))
    return HttpResponseRedirect('/')



# route we will use for alpha release
def elastic(self):
    #For Alpha only. Need more specific queries in future
    #Returns list of systems from companyName "Arkon"
    search = Search(using=client, index="devices").query("match", companyName="Arkon")
    response = search.execute()
    Arkon_systems = []
    for hit in response:
        Arkon_systems.append({"systemName": hit.systemName, "serialNumber": hit.serialNumber})
    return JsonResponse({"systems": Arkon_systems})
