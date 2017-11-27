# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect
from .forms import Login

import json

from django.shortcuts import render

from django.views.decorators.http import require_http_methods

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


@require_http_methods(["GET"])
def index(request):
    print(request.method)
    return render(request, "TagX/login.html")


@require_http_methods(["POST"])
def login(request):
    if request.method == 'POST':
        form = Login(request.POST)
        if form.is_valid() and form['username'].value() == 'Nick' and form['password'].value() == 'Rose':
            # JsonResponse({'foo': 'bar'})
            return HttpResponseRedirect('/mysystems/')
    return HttpResponseRedirect('/')


@require_http_methods(["GET", "POST"])
def mysystems(request):
    return render(request, "TagX/my_systems.html", {'testData': json.dumps(testData)})


def system(request):
    return render(request, "TagX/system.html")
