#api que pida y prediga datos atraves de la red neuronal model.h5
# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from json import dumps
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()

app = Flask(__name__)
api = Api(app)

class Prediccion(Resource):
    def get(self):
        model = load_model('/home/diego/Escritorio/Gs2/Geo-Prevention/DATOS/model.h5')
        l = request.args.get('l')
        t = request.args.get('t')
        tma = request.args.get('tma')
        tmi = request.args.get('tmi')
        tme = request.args.get('tme')
        r = request.args.get('r')
        vm = request.args.get('vm')
        p1 = request.args.get('p1')
        p2 = request.args.get('p2')
        p3 = request.args.get('p3')
        p4 = request.args.get('p4')
        p5 = request.args.get('p5')
        m = request.args.get('m')
        d = request.args.get('d')
        y = request.args.get('y')
        X = [[l,t,tma,tmi,tme,r,vm,p1,p2,p3,p4,p5,m,d,y]]
        print(X)
        X = sc_X.fit_transform(X)
        pred = model.predict(X)
        pred = pred.tolist()[0][0]
        print(pred)
        return jsonify(pred)

api.add_resource(Prediccion, '/prediccion') # Route_1

if __name__ == '__main__':
     app.run(port='5002')
