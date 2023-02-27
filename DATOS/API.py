# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Resource, Api
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
from geopy.geocoders import Nominatim
from pickle import load
import os

# Creamos la aplicación de Flask
app = Flask(__name__)
api = Api(app)

# Agregamos la funcionalidad CORS
CORS(app)

# Definimos las clases que implementan nuestras rutas


class Prediccion(Resource):
    def get(self):
        # Cargamos el modelo y los pesos guardados
        model = load_model(
            r'C:\Users\diego\Desktop\geo-prevention\Geo-Prevention\DATOS\model.h5')
        model.load_weights(
            r'C:\Users\diego\Desktop\geo-prevention\Geo-Prevention\DATOS\weights.h5')

        # Obtenemos los parámetros de la petición GET
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
       # y = float(request.args.get('y'))

        # Creamos un array numpy con los parámetros
        X = np.array(
            [[l, t, tma, tmi, tme, r, vm, p1, p2, p3, p4, p5, m, d]])

        # Cargamos el escalador utilizado para el entrenamiento del modelo y transformamos los datos
        sc = load(open(
            r'C:\Users\diego\Desktop\geo-prevention\Geo-Prevention\DATOS\scaler.pkl', 'rb'))
        X = sc.transform(X)

        # Realizamos la predicción con el modelo cargado
        pred = model.predict(X)
        pred = pred.tolist()[0][0]

        # Devolvemos la predicción en formato JSON
        return jsonify(pred)


class Coordenadas(Resource):
    def get(self):
        # Creamos una instancia del objeto geolocator y obtenemos las coordenadas a partir del nombre del lugar
        geolocator = Nominatim(user_agent="zaragoza")
        location = geolocator.geocode(str(request.args.get('place')))

        # Devolvemos las coordenadas en formato JSON
        return jsonify([{"latitude": location.latitude, "longitude": location.longitude}])


# Agregamos las rutas a la aplicación
api.add_resource(Prediccion, '/prediccion')
api.add_resource(Coordenadas, '/coordenadas')

if __name__ == '__main__':
    app.run(port='5002')
