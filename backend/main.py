from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

ORS_API_KEY = os.getenv("ORS_API_KEY")

class RouteRequest(BaseModel):
    address: str
    distance: float

@app.post("/route")
def get_route(req: RouteRequest):
    geo_url = f"https://nominatim.openstreetmap.org/search?format=json&q={req.address}"
    headers = { "User-Agent": "walkrouteapp/1.0" }
    geo_res = requests.get(geo_url, headers=headers).json()
    if not geo_res:
        return {"error": "Address not found"}
    lat = float(geo_res[0]['lat'])
    lon = float(geo_res[0]['lon'])

    body = {
        "coordinates": [[lon, lat]],
        "options": {
            "round_trip": {
                "length": int(req.distance * 1000),
                "seed": 2
            }
        }
    }
    headers = {
        "Authorization": ORS_API_KEY,
        "Content-Type": "application/json"
    }
    ors_url = "https://api.openrouteservice.org/v2/directions/foot-walking/geojson"
    ors_res = requests.post(ors_url, json=body, headers=headers).json()

    coords = ors_res['features'][0]['geometry']['coordinates']
    route = [[latlng[1], latlng[0]] for latlng in coords]
    return {"route": route}
