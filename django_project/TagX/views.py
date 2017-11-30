# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect
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
    return


# route for logging in a user
def login(request):
    if request.method == 'POST':
        form = Login(request.POST)
        # form['username'].value() can be used to get the username
        # form['password'].value() can be used to get the password
        if form.is_valid():
            # JsonResponse({'foo': 'bar'})
            return HttpResponseRedirect('/mysystems/')
    return HttpResponseRedirect('/')


# route for rendering the My Systems page.
def mysystems(request):
    if request.method == 'GET':
        # 'testData' is just random data right now, the real data will need to be retrieved from the databse.
        return render(request, "TagX/my_systems.html", {'testData': json.dumps(testData)})
    return


# route for rendering the System page.
def system(request):
    if request.method == 'GET':
        return render(request, "TagX/system.html")
    return

def search(self):
    #For Alpha only. Need more specific queries in future
    #Returns list of systems from companyName "Arkon"
    search = Search(using=client, index="devices").query("match", companyName="Arkon")
    response = search.execute()
    Arkon_systems = []
    for hit in response:
        Arkon_systems.append(hit)
    return Arkon_systems