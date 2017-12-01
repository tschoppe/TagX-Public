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

In Windows, the equivalent command is:

```
\path\to\env\Scripts\activate.bat
```

The virtual environment is created in the current directory you are in. So, if you name it "tagx_env," you can type .\tagx_env\Scripts\activate.bat.

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


## Setting up React.js

Run the following commands in your tag-x directory to get React.js up and running for the application.

(These are Mac commands)

```
npm install --save-dev jquery react react-dom webpack@2.1.0-beta.22 webpack-bundle-tracker babel-loader babel-core babel-preset-es2015 babel-preset-react
```
```
sudo pip install django-webpack-loader
```
```
npm install create-react-class --save-dev
```
```
npm install --save django-react-csrftoken
```