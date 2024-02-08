import subprocess 
import os
import json
import datetime
import time
import re
import pytz
from pymongo import MongoClient


class Lulas:
    def __init__(self, filters):
        self.timezone = pytz.timezone('Europe/Paris')
        
        mongo_address = os.environ.get('MONGO_ADDRESS')
        db = os.environ.get('DB')
        collect = os.environ.get('COLLECTION')
        port = os.environ.get("PORT")
        
        client = MongoClient(mongo_address, int(port))
        database = client[f"{db}"]
        self.collection = database[f"{collect}"]

        self.ip_list = []
        self.counter = 1
        self.sys_max_threads = int(os.environ.get('SYS_THREAD_MAX'))
        self.number_of_pool = 1
        
        self.finder = self.collection.find(filters)

 

    def insert_json(self, filepath):
        with open(filepath, "r") as file:
            data = json.load(file)
        self.collection.insert_many(data)

    def ip_to_list(self):
        list_ip = []
        for i in self.finder:
            list_ip.append(i["ip_address"])
        self.ip_list = list_ip

    def display_progress(self):
        print(f"{self.counter} / {len(self.ip_list)}")
        self.counter += 1

    
    def command(self, ip):  
        try:
            
            c = subprocess.check_output(["ping", "-c", "1", ip])
            icmp = c.decode("utf-8")
            date = datetime.datetime.now(tz=self.timezone).strftime("%Y-%m-%d-%H:%M")
            ms = re.search(r'time=(.*?)ms', icmp).group(1)
            ms_update_up = {"measures": f"{date} :{ms}"}
            dt = {"checked_at": f"{date}"}
            up ={"up/down": "up"}
            self.collection.find_one_and_update({"ip_address" : ip}, {"$set": dt}, upsert = True)
            self.collection.find_one_and_update({"ip_address" : ip}, {"$set": up}, upsert = True)
            self.collection.find_one_and_update({"ip_address" : ip}, {"$push":  ms_update_up}, upsert = True)
           
            
        except:
            date = datetime.datetime.now(tz=self.timezone).strftime("%Y-%m-%d-%H:%M")
            dt = {"checked_at": f"{date}"}
            down = {"up/down": "down"}
            ms_update_down = {"measures": f"{date} :down"}
            self.collection.find_one_and_update({"ip_address" : ip}, {"$set": dt}, upsert = True)
            self.collection.find_one_and_update({"ip_address" : ip}, {"$set": down}, upsert = True)
            self.collection.find_one_and_update({"ip_address" : ip}, {"$push": ms_update_down}, upsert = True)
              
            
        self.display_progress()
