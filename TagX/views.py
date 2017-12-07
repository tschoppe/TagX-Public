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
import certifi

client = Elasticsearch(['https://52619ac88756f0b041fbc28723b9f81d.us-east-1.aws.found.io:9243'], http_auth=('elastic', '9eRZdikmjjmMWJjpaf8zoo7U'), port=443, use_ssl=True, ca_certs=certifi.where())

testData = {
    "Group 1": {
        "users": ["userOne", "user2", "user3"],
        "systems": ["system1", "system2", "system3"]
    },
    "Group 2": {
        "users": ["user1", "user2", "user3"],
        "systems": ["system1", "system2", "system3"]
    },
    "Group 3": {
        "users": ["user1", "user2", "user3"],
        "systems": ["system1", "system2", "system3"]
    },
    "Group 4": {
        "users": ["user1", "user2", "user3"],
        "systems": ["system1", "system2", "system3"]
    },
    "Group 5": {
        "users": ["user1", "user2", "user3"],
        "systems": ["system1", "system2", "system3"]
    },
    "Group 6": {
        "users": ["user1", "user2", "user3"],
        "systems": ["system1", "system2", "system3"]
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
    if request.method == 'POST' and request.user.is_authenticated:
        auth_logout(request)
    return HttpResponseRedirect('/')


# route for rendering the My Systems page.
def mysystems(request):
    if request.method == 'GET' and request.user.is_authenticated:
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
                    "tags": hit.tags
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


def system(request, system_id):
    if request.method == 'GET' and request.user.is_authenticated:
        url = "\"" + str(request.path) + "\""
        return render(request, "TagX/system.html", {'url': url, 'id': system_id})
    return HttpResponseRedirect('/')


# route for rendering the Groups page.
def mygroups(request):
    if request.method == 'GET' and request.user.is_authenticated:
        return render(request, "TagX/mygroups.html", {'url': str(request.path), 'testData': json.dumps(testData)})
    return HttpResponseRedirect('/')


# post request for performing a search
def search(request):
    if request.method == 'POST' and request.user.is_authenticated:
        form = SearchForm(request.POST)
        if form.is_valid():
            searchObj = form.cleaned_data
            search = searchObj['search']
            criteria = searchObj['criteria']
            return HttpResponseRedirect('/mysystems/?search=%s&criteria=%s' % (search, criteria))
    return HttpResponseRedirect('/')


# tagging function
def addTag(request, SN, tag):
    if request.method == 'PUT' and request.user.is_authenticated:
        search = Search(using=client, index="devices").query("match", serialNumber=SN)
        response = search.execute()
        list = []
        if response.hits[0].tags is None:
            list.append(tag)
        else:
            list = response.hits[0].tags
            list.append(tag)
        client.update(index='devices', doc_type='doc', id=SN, body={"doc": {"tags": list}})
    return

#remove tag
def removeTag(request, SN, tag):
    if request.method == 'DELETE' and request.user.is_authenticated:
        search = Search(using=client, index="devices").query("match", serialNumber=SN)
        response = search.execute()
        list = []
        list.remove(tag)
        client.update(index='devices', doc_type='doc', id=SN, body={"doc":{"tags": list}})
    return


#edit tag
def editTag(request, SN, oldTag, newTag):
    if request.method == 'PUT' and request.user.is_authenticated:
        search = Search(using=client, index="devices").query("match", serialNumber=SN)
        response = search.execute()
        list = response.hits[0].tags
        index = list.index(oldTag)
        list[index] = newTag
        client.update(index='devices', doc_type='doc', id=SN, body={"doc": {"tags": list}})
    return
