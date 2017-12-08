# Setting up local elasticsearch DB

Disclaimer: Windows users may need to make a few changes but I will note all I know

## 1. Download required software
You will need logstash, elasticsearch and kibana for complete setup and functionality
Logstash: https://www.elastic.co/downloads/logstash
Elasticsearch: https://www.elastic.co/downloads/elasticsearch
Kibana: https://www.elastic.co/downloads/kibana

Unzip these files into a directory that will be easy to access

## 2. Populating the DB
This will be done using the logstash config file. Checkout the dev branch and navigate to tag-x/ESDB
copy the test.config file to somewhere on your computer as you will have to make changes we do not want pushed to dev

Change path from "." to the location of the CSV also in tag-x/ESDB.
  for example path=>"/Users/tylerschoppe/Documents/School/CS/320/tag-x/ESDB/Systems.csv"
  
Next erase the host user and password from the output section.
Replace the hosts with: hosts => "http://localhost:9200"

IT IS IMPERATIVE YOU DO THIS TO NOT MESS UP THE OFFICIAL HOSTED DB!!!

navigate to the directory containing logstash, kibana and elasticsearch
change to the elasticsearch directory and run bin/elasticsearch (.bat for windows users)
keep this running and in a new terminal/cmd window and switch to the logstash directory
run bin/logstash -f <path to config file"

example: bin/logstash -f /Users/tylerschoppe/Documents/School/CS/320/tag-x/ESDB/test.config
*Use the path to the copied and edited logstash config file you recently made*
This will run for 10 seconds to a few minutes depending on your computer

You now have a populated ESDB!

## 3. Adding groups to DB
Switch to the kibana directory and run bin/kibana
open a browser and go to localhost:5601

On the left click dev tools and run these two scripts from the console

PUT groups
{}


PUT groups/_mapping/doc
{
  "properties": {
    "users":{
      "type": "keyword"
    },
    "systems":{
      "type": "keyword"
    },
    "owner":{
      "type": "keyword"
    }
  }
}

The database is now up to date

## 4. Branch and change views.py
The whole reason for this local DB is for testing without serious consequences
To ensure this create a branch of dev so none of the current code is in danger
in views.py you will find an elasticsearch object called client. comment this line out and replace it with client = Elasticsearch()
this will connect to the local elasticsearch db instead of the hosted DB so PLEASE DO THIS

## 5. Notes
You only need to run logstash once. After that elasticsearch must be running for testing, kibana does not but can be helpful
Please Slack me if you have any questions!!!!!
