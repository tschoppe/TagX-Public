# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse, HttpResponseRedirect
from .forms import Login

from django.shortcuts import render

from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def index(request):
    print(request.method)
    return render(request, "TagX/login.html")


@require_http_methods(["POST"])
def login(request):
    if request.method == 'POST':
        form = Login(request.POST)
        if form.is_valid() and form['username'].value() == 'Nick' and form['password'].value() == 'Rose':
            return HttpResponseRedirect('/mysystems/')
    return HttpResponseRedirect('/')


@require_http_methods(["GET", "POST"])
def mysystems(request):
    return render(request, "TagX/my_systems.html")


def system(request):
    return render(request, "TagX/system.html")
