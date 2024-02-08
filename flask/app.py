from flask import Flask, render_template, request, jsonify
import datetime
import time
import os
import pytz
import pandas as pd
import json
import folium
from pymongo import MongoClient

timezone = pytz.timezone('Europe/Paris')
mongo_address = os.environ.get('MONGO_ADDRESS')
port = os.environ.get("PORT")

db0 = "cities"
collect0 = "cities_loc"
client = MongoClient(mongo_address, int(port))
database = client[f"{db0}"]
collection = database[f"{collect0}"]
all = collection.find({"country": "FR"})



def log_ip_client(date_time, ip):
        db = "web"
        collect = "client"
        client = MongoClient(mongo_address, int(port))
        database = client[f"{db}"]
        collection = database[f"{collect}"]
        collection.insert_one({"timestamp": date_time, "ip": ip})

app = Flask(__name__)

@app.route("/", methods=['GET'])
def base_point():
        date = datetime.datetime.now(tz=timezone).strftime("%Y-%m-%d-%H:%M")
        if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
                log_ip_client(date, request.environ['REMOTE_ADDR'])
        else:
                log_ip_client(date, request.environ['HTTP_X_FORWARDED_FOR']) # if behind a proxy
        print("__init__")

        print("___run___")

        map = folium.Map(location=[48.20, 2.10], zoom_start=5, control_scale=True)

        for i in all:
                folium.CircleMarker(
                location=[float(i["lat"]), float(i["lon"])],
                radius=2,
                fill=True,
                popup=folium.Popup("inline explicit Popup"),
                ).add_to(map)



        map.get_root().html.add_child(folium.Element("""
        <div style="position: fixed;
        top: 50px; left: 70px; width: 150px; height: 70px;
        background-color:orange; border:2px solid grey;z-index: 900;">
        <h5>Hello World!!!</h5>
        <button>Test Button</button>
        </div>
        """))
        return  map.get_root().render()



if __name__ == '__main__':
   app.run()
