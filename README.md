# TagX
A powerful HPE tagging system. A BBB product.


## Getting Started 

These are the steps to get the project up and running locally

These instructions were all run on Mac. If you have a PC it might work or you might be on your own. Good luck.

Make sure you have already cloned the repo before starting.

### 1. Install virtualenv

From your home directory, run the following command to install virtualenv

```
sudo pip install virtualenv
```

You can check if it was installed properly by running:

```
virtualenv --version
```

### 2. Create virtual environment

Run the following command (no arrow brackets) to create a virtual environment. You can call the environment whatever you want (i.e. tagX_env)

```
virtualenv <env_name>
```

This virtual environment is where you will be doing everything related to django. Every time you want to run anything django related you will need to actuvate this environment (next step).

### 3. Activate virtual environment

Run the following command (no arrow brackets) to activate your virtual environment

```
source <env_name>/bin/activate
```

You can deactivate this environment by simply typing:

```
deactivate
```

### 4. Install Django

Run the following command to install django. Make sure your virtual environment is activated.

```
pip install django
```

You can test that it installed correctly by running:

```
python -m django --version
```



## Running the Application

The initial setup is now complete, and you wont need to do it again. Follow these further instructions to get the application running in your browser.

### 1. cd to this repo's directory on your computer

```
cd tag-x
```

### 2. cd to the django-project's directory

```
cd django-project
```

### 3. Run the server 

Run the following command to get the django development server running locally

```
python manage.py runserver
```

### 4. Go to localhost url in browser

Copy the url listed after you ran the previous command and go to that address in your browser. The url should be:

```
http://127.0.0.1:8000/
```

You should now have the application up and running
