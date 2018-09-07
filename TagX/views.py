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
from time import sleep

client = Elasticsearch(['https://tagx-3122626671.us-east-1.bonsaisearch.net:443'], http_auth=('ct4pntszfp', 'dwz5l5vzy2'), port=443, use_ssl=True, ca_certs=certifi.where())


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
                raise forms.ValidationError('Looks like that username already exists')
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
        return render(request, "TagX/my_systems.html", {
            'systems': systemQuery(request),
            'search': {
                'searchStr': searchStr,
                'criteria': criteria
            }
        })
    return HttpResponseRedirect('/')


def system(request, system_id):
    if request.method == 'GET' and request.user.is_authenticated:
        company = User.objects.get(username=request.user.username).tagxuser.company
        search = Search(using=client, index="devices") \
                .query("match", serialNumber=system_id)
        search = search[0:9999]
        response = search.execute()
        systems = {}
        for hit in response:
            dic = {}
            for val in hit:
                dic[val] = hit[val]
            systems[hit.serialNumber] = dic
        return render(request, "TagX/system.html", {
            'system': systems[system_id],
            'tags': systems[system_id]['tags']
            })
    return HttpResponseRedirect('/')


# route for rendering the Groups page.
def mygroups(request):
    if request.method == 'GET' and request.user.is_authenticated:
        groupSearch = Search(using=client, index="groups") \
                    .query("multi_match", query=str(request.user), fields=["owner", "users"])
        groupSearch = groupSearch[0:9999]
        groupResponse = [] if (len(groupSearch.execute()) == 0) else groupSearch.execute()
        company = User.objects.get(username=request.user.username).tagxuser.company
        allUsers = User.objects.all()
        users = []
        for user in allUsers:
            if(User.objects.get(username=user).tagxuser.company == company):
                users.append(user.username)
        groups = {}
        for group in groupResponse:
            groups[str(group.id)] = {
                "name": group.name,
                "owner": group.owner,
                "systems": group.systems,
                "users": group.users
            }
        return render(request, "TagX/mygroups.html", {
            'groups': groups,
            'systems': systemQuery(request),
            'users': users
            })
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
        return HttpResponseRedirect('/mysystems/')
    return HttpResponseRedirect('/')


# tagging function
def addTag(request, system_id):
    if request.method == 'POST' and request.user.is_authenticated:
        form = tagForm(request.POST)
        if form.is_valid():
            tagObj = form.cleaned_data
            tag = tagObj['tag']
        search = Search(using=client, index="devices").query("match", serialNumber=system_id)
        response = search.execute()
        tagList = []
        if response.hits[0].tags is None:
            tagList.append(tag)
        else:
            tagList = list(response.hits[0].tags)
            tagList.append(tag)
        client.update(index='devices', doc_type='doc', id=system_id, body={"doc": {"tags": tagList}})
        sleep(1)
        return HttpResponseRedirect("/system/" + system_id)
    return HttpResponseRedirect("/")

#remove tag
def removeTag(request, system_id):
    if request.method == 'POST' and request.user.is_authenticated:
        tag = request.POST['tag']
        tag = str(tag)
        search = Search(using=client, index="devices").query("match", serialNumber=system_id)
        response = search.execute()
        tagList = list(response.hits[0].tags)
        tagList.remove(tag)
        client.update(index='devices', doc_type='doc', id=system_id, body={"doc":{"tags": tagList}})
        return HttpResponseRedirect("/system/" + system_id)
    return HttpResponseRedirect("/")


#edit tag
def editTag(request, system_id):
    if request.method == 'POST' and request.user.is_authenticated:
        old = request.POST['old']
        new = request.POST['new']
        old = str(old)
        new = str(new)
        search = Search(using=client, index="devices").query("match", serialNumber=system_id)
        response = search.execute()
        tagList = list(response.hits[0].tags)
        index = tagList.index(old)
        tagList[index] = new
        client.update(index='devices', doc_type='doc', id=system_id, body={"doc": {"tags": tagList}})
        return HttpResponseRedirect("/system/" + system_id)
    return HttpResponseRedirect("/")


def newGroup(request):
    if request.method == 'POST' and request.user.is_authenticated:
        response = client.search(index='groups', body={
                    "query": { "match_all": {} },
                    "sort": {
                        "id": {
                            "order": "desc"
                        }
                    },
                    "size": 1
                })['hits']
        groupId = 0;
        for hit in response:
            if hit == "hits" and response[hit]:
                groupId = int(response[hit][0]['_id']) + 1
                print(groupId)
        client.index(index='groups', doc_type='doc', id=groupId, body={
                "name": request.POST['name'],
                "owner": str(request.user),
                "systems": json.loads(request.POST['systems']),
                "users": json.loads(request.POST['users']),
                "id": "{0:0>10}".format(int(groupId))
        })
        return HttpResponseRedirect('/mygroups/')
    return HttpResponseRedirect('/')


def editGroup(request, group_id):
    if request.method == 'POST' and request.user.is_authenticated:
        client.update(index='groups', doc_type='doc', id=int(group_id), body={
            "doc": {
                "name": request.POST['name'],
                "systems": json.loads(request.POST['systems']),
                "users": json.loads(request.POST['users'])
            }
        })
        return HttpResponseRedirect('/mygroups/')
    return HttpResponseRedirect('/')


def deleteGroup(request, group_id):
    if request.method == 'GET' and request.user.is_authenticated:
        client.delete(index='groups', doc_type='doc', id=int(group_id))
        sleep(1)
        return HttpResponseRedirect('/mygroups/')
    return HttpResponseRedirect('/')


# function to search for systems given a request. returns a dictionary 
def systemQuery(request):
    company = User.objects.get(username=request.user.username).tagxuser.company
    searchStr = request.GET.get('search', '')
    criteria = request.GET.get('criteria', '')
    search = Search(using=client, index="devices") \
            .query("match", companyName=company)
    if searchStr != '' and criteria == 'system_name':
        search = search.query("match_phrase_prefix", systemName=searchStr)
    elif searchStr != '' and criteria == 'operating_system':
        search = search.query("match_phrase_prefix", osVersion=searchStr)
    elif searchStr != '' and criteria == 'model':
        search = search.query("match_phrase_prefix", model=searchStr)
    elif searchStr != '' and criteria == 'location':
        search = search.query("match_phrase_prefix", location__country=searchStr)
    elif searchStr != '' and criteria == 'tags':
        search = search.query("match_phrase_prefix", tags=searchStr)
    search = search[0:9999]
    response = search.execute()
    systems = {}
    for hit in response:
        groupSearch = Search(using=client, index="groups") \
                    .query("match", systems=hit.serialNumber)
        groupSearch = groupSearch[0:9999]
        groupResponse = [] if (len(groupSearch.execute()) == 0) else groupSearch.execute()
        groups = []
        for group in groupResponse:
            groups.append(group.name)
        systems[hit.serialNumber] = {
                "name": hit.systemName, 
                "groups": groups,
                "osVersion": hit.osVersion,
                "model": hit.model,
                "location": hit["location.country"],
                "tags": [] if (hit.tags == None) else hit.tags
            }
    return systems
