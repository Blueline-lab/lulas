import subprocess 
import os
import json
import datetime
import time
import re
import pytz
from pymongo import MongoClient


class Engine:
    def __init__(self, zone):
        self.timezone = pytz.timezone('Europe/Paris')
        self.filter = zone
        self.ip_list = []
        self.counter = 1
        mongo_address = os.environ.get('MONGO_ADDRESS')
        db = os.environ.get('DB')
        collect = os.environ.get('COLLECTION')
        port = os.environ.get("PORT")
        

        client = MongoClient(mongo_address, int(port))
        database = client[f"{db}"]
        self.collection = database[f"{collect}"]

        self.number_of_doc = self.collection.count_documents(self.filter)
        self.finder = self.collection.find(self.filter)

    def insert_json(self, filepath):
        with open(filepath, "r") as file:
            data = json.load(file)
        self.collection.insert_many(data)

    def ip_to_list(self):
        list_ip = []
        for i in self.finder:
            list_ip.append(i["ip_address"])
        self.ip_list = list_ip       
    
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
            
        print(f"{self.counter} / {len(self.ip_list)}")
        self.counter += 1
        
