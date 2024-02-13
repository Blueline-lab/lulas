import io
import math
import os
import pathlib
import sys
import datetime
import time

import pyproj
import json
import uvicorn
import datashader as ds
from pyarrow import csv
import fastapi
import pandas as pd
from pandas.core.frame import DataFrame
from pandas import json_normalize
from colorcet import coolwarm
from datashader import transfer_functions as tf
from datashader.utils import lnglat_to_meters
from fastapi import FastAPI, Response, Request, Header
from fastapi.responses import FileResponse, HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pymongo import MongoClient
import pytz


#from PIL import Image, ImageDraw
from starlette.responses import FileResponse
mongo_address = os.environ.get("MONGO_ADDRESS")
port = os.environ.get("PORT")
timezone = pytz.timezone('Europe/Paris')
all_cats_colorkey = {10: 'blue', 20: 'green', 30: 'red', 40: 'orange', 50: 'purple'}
indexhtml = open('./w/index.html', 'r').read()

color_key = dict(d1='blue', d2='green', d3='red', d4='orange', d5='purple')


def log_ip_client(date_time, ip):
                db = "web"
                collect = "client"
                client = MongoClient(mongo_address, int(port))
                database = client[f"{db}"]
                collection = database[f"{collect}"]
                collection.insert_one({"timestamp": date_time, "ip": ip})

def tile2mercator(xtile, ytile, zoom):
    # takes the zoom and tile path and passes back the EPSG:3857
    # coordinates of the top left of the tile.
    # From Openstreetmap
    n = 2.0 ** zoom
    lon_deg = xtile / n * 360.0 - 180.0
    lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * ytile / n)))
    lat_deg = math.degrees(lat_rad)

    # Convert the results of the degree calulation above and convert
    # to meters for web map presentation
    mercator = lnglat_to_meters(lon_deg, lat_deg)
    return mercator


def generateatile(zoom, x, y):
    # The function takes the zoom and tile path from the web request,
    # and determines the top left and bottom right coordinates of the tile.
    # This information is used to query against the dataframe.
    xleft, yleft = tile2mercator(int(x), int(y), int(zoom))
    xright, yright = tile2mercator(int(x)+1, int(y)+1, int(zoom))
    condition = '(X >= {xleft}) & (X <= {xright}) & (Y <= {yleft}) & (Y >= {yright})'.format(
        xleft=xleft, yleft=yleft, xright=xright, yright=yright)
    frame = data.query(condition)
    # The dataframe query gets passed to Datashder to construct the graphic.
    # First the graphic is created, then the dataframe is passed to the Datashader aggregator.
    csv = ds.Canvas(plot_width=256, plot_height=256, x_range=(min(xleft, xright), max(
        xleft, xright)), y_range=(min(yleft, yright), max(yleft, yright)))
    agg = csv.points(frame, 'X', 'Y')
    
    # The image is created from the aggregate object, a color map and aggregation function.
    # Then the object is assighed to a bytestream and returned
    img = tf.Image(tf.shade(tf.spread(agg, px=1), cmap=color_status))
    img_io = img.to_bytesio('PNG')
    img_io.seek(0)
    bytes = img_io.read()
    return bytes




# Start the web server
app = FastAPI()

@app.on_event("startup")
async def startup_event():
    global data, indexhtml, color_status

    # Data =
    # value, value
    print("Loading data from file...")
    coords = []
    color_status = []
    client = MongoClient(mongo_address, int(port))
    database = client["lulas"]
    collection = database["nameservers_ipv4_status"]
    all = collection.find({})
    transformer = pyproj.Transformer.from_crs("epsg:4269", "epsg:3857")
    for i in all:
        try:
            if i["lat"] is not None:
                element = transformer.transform(float(i["lat"]), float(i["lon"]))
                color_status.append(i['color_status'])
                coords.append(element)
               
               
        except:
            pass

    
    
    data = pd.DataFrame.from_records(coords, columns =['X', 'Y'])
   
    
        

 

@app.get("/", response_class=HTMLResponse)
async def root():
    return indexhtml


@app.get("/tiles/{zoom}/{x}/{y}.png")
async def gentile(zoom, x, y):
    results = generateatile(zoom, x, y)
    return Response(content=results, media_type="image/png")

app.mount("/lib", StaticFiles(directory="./w/lib"), name="lib")
app.mount("/static", StaticFiles(directory="./static"), name="static")

