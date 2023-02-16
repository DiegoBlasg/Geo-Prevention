# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Resource, Api
from json import dumps
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
from geopy.geocoders import Nominatim
sc_X = StandardScaler()

app = Flask(__name__)
api = Api(app)
CORS(app)


class Prediccion(Resource):
    def get(self):
        model = load_model(
            r'C:\Users\diego\Desktop\geo-prevention\Geo-Prevention\DATOS\model.h5')
        l = float(request.args.get('l'))
        t = float(request.args.get('t'))
        tma = float(request.args.get('tma'))
        tmi = float(request.args.get('tmi'))
        tme = float(request.args.get('tme'))
        r = float(request.args.get('r'))
        vm = float(request.args.get('vm'))
        p1 = float(request.args.get('p1'))
        p2 = float(request.args.get('p2'))
        p3 = float(request.args.get('p3'))
        p4 = float(request.args.get('p4'))
        p5 = float(request.args.get('p5'))
        m = float(request.args.get('m'))
        d = float(request.args.get('d'))
        y = float(request.args.get('y'))
        X = np.array(
            [[l, t, tma, tmi, tme, r, vm, p1, p2, p3, p4, p5, m, d, y]])
        X = (X - X.mean()) / X.std()
        pred = model.predict(X)
        pred = pred.tolist()[0][0]
        print(pred)
        return jsonify(pred)


class Coordenadas(Resource):
    def get(self):
        geolocator = Nominatim(user_agent="zaragoza")
        location = geolocator.geocode(str(request.args.get('place')))
        print(location.latitude, location.longitude)
        return jsonify([{"latitude": location.latitude, "longitude": location.longitude}])


api.add_resource(Prediccion, '/prediccion')  # Route_1
api.add_resource(Coordenadas, '/coordenadas')  # Route_1

if __name__ == '__main__':
    app.run(port='5002')
