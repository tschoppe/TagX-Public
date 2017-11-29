from django import forms


# This class is for HTML forms. You must add the form in here in order to retrieve the information from it.

class Login(forms.Form):
    username = forms.CharField(label='username', max_length=100)
    password = forms.CharField(label='password', max_length=100)
