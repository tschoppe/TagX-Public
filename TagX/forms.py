from django import forms


# This class is for HTML forms. You must add the form in here in order to retrieve the information from it.

class LoginForm(forms.Form):
    username = forms.CharField(
        required = True,
        label = 'Username'
    )
    password = forms.CharField(
        required = True,
        label = 'Password',
        widget = forms.PasswordInput()
    )


class UserRegistrationForm(forms.Form):
    username = forms.CharField(
        required = True,
        label = 'Username'
    )
    password = forms.CharField(
        required = True,
        label = 'Password',
        widget = forms.PasswordInput()
    )


class SearchForm(forms.Form):
    search = forms.CharField(
        required = True,
        label = 'search'
    )
    criteria = forms.CharField(
        required = True,
        label = 'criteria'
    )


class tagForm(forms.Form):
    tag = forms.CharField(
        required=True,
        label='tag'
    )