import subprocess
import os
import json
import datetime
import time
import re
import pytz
from pymongo import MongoClient
from colorcet import rainbow




class Engine:
    def __init__(self, zone):
        self.timezone = pytz.timezone('Europe/Paris')
        self.filter = zone
        self.ip_list = []
        self.counter = 1
        self.color_status = rainbow
        self.nutriscore = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
        self.categories =[
            list(range(0, 30)),
            list(range(30, 60)),
            list(range(60, 100)),
            list(range(100, 150)),
            list(range(150, 200)),
            list(range(200, 250)),
            list(range(250, 300)),
            list(range(300, 400)),
            list(range(400, 600)),
            list(range(600, 800))]

        mongo_address = os.environ.get('MONGO_ADDRESS')
        db = os.environ.get('DB')
        collect = os.environ.get('COLLECTION')
        port = os.environ.get("PORT")


        client = MongoClient(mongo_address, int(port))
        database = client[f"{db}"]
        self.collection = database[f"{collect}"]

        country_db = client["cities"]
        self.country_collection = country_db["cities_loc"]

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

    def city_positionning(self, ip):
        city_object = self.collection.find_one({"ip_address" : ip})
        coord_for_the_city = self.country_collection.find_one({"name": city_object["city"]})
        if coord_for_the_city is not None:
            self.collection.find_one_and_update({"ip_address" : ip}, {"$set": {"lat": coord_for_the_city["lat"] }}, upsert = True)
            self.collection.find_one_and_update({"ip_address" : ip}, {"$set": {"lon": coord_for_the_city["lon"] }}, upsert = True)


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


            color_status = ""
            int_ms = int(float(ms))
            for c in self.categories:
                for element in c:
                    if int_ms == element:
                        pos = self.categories.index(c)
                        color_status = self.nutriscore[pos]
            if int_ms >= 800:
                color_status = "k"

            self.collection.find_one_and_update({"ip_address" : ip}, {"$set": {"color_status": color_status}}, upsert = True)

            self.city_positionning(ip)



        except Exception as e:
            #print(e)
            date = datetime.datetime.now(tz=self.timezone).strftime("%Y-%m-%d-%H:%M")
            dt = {"checked_at": f"{date}"}
            down = {"up/down": "down"}
            ms_update_down = {"measures": f"{date} :down"}
            self.collection.find_one_and_update({"ip_address" : ip}, {"$set": dt}, upsert = True)
            self.collection.find_one_and_update({"ip_address" : ip}, {"$set": down}, upsert = True)
            self.collection.find_one_and_update({"ip_address" : ip}, {"$push": ms_update_down}, upsert = True)
            city_object = self.collection.find_one({"ip_address" : ip})
            if city_object["city"] is not None:
                coord_for_the_city = self.country_collection.find_one({"name": city_object["city"]})
                self.collection.find_one_and_update({"ip_address" : ip}, {"$set": {"lat": coord_for_the_city["lat"] }}, upsert = True)
                self.collection.find_one_and_update({"ip_address" : ip}, {"$set": {"lon": coord_for_the_city["lon"] }}, upsert = True)
            self.collection.find_one_and_update({"ip_address" : ip}, {"$set": {"color_status": "z"}}, upsert = True)

        print(f"{self.counter} / {len(self.ip_list)}")
        self.counter += 1
