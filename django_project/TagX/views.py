# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render


def index(request):
    return render(request, "TagX/login.html")


def mysystems(request):
    return render(request, "TagX/my_systems.html")


def system(request):
    return render(request, "TagX/system.html")
