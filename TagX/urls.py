from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^mysystems/$', views.mysystems, name='mysystems'),
    url(r'^mysystems/(?P<search>)(&P<criteria>)/$', views.mysystems, name='mysystemsSearch'),
    url(r'^system/(?P<system_id>[\w\-]+)/$', views.system, name='system'),
    url(r'^system/(?P<system_id>\d+)/$', views.system, name='system'),
    url(r'^system/(?P<system_id>[\w\-]+)/addTag/$', views.addTag, name='addTag'),
    url(r'^system/(?P<system_id>[\w\-]+)/editTag/$', views.editTag, name='editTag'),
    url(r'^system/(?P<system_id>[\w\-]+)/removeTag/$', views.removeTag, name='removeTag'),
    url(r'^login/$', views.login, name='login'),
    url(r'^logout/$', views.logout, name='logout'),
    url(r'^mygroups/$', views.mygroups, name='mygroups'),
    url(r'^search/$', views.search, name='search'),
    url(r'^groups/new/$', views.newGroup, name='newGroup'),
    url(r'^groups/edit/(?P<group_id>[\w\-]+)/$', views.editGroup, name='editGroup'),
    url(r'^groups/delete/(?P<group_id>[\w\-]+)/$', views.deleteGroup, name='deleteGroup'),
]

