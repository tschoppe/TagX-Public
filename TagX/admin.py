# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from TagX.models import tagxUser

# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class tagxUserInline(admin.StackedInline):
    model = tagxUser
    can_delete = False
    verbose_name_plural = 'tagxUser'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (tagxUserInline, )

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)