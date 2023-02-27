import React, { useState, useEffect } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker,Popup,Circle } from "react-leaflet";
import "./Map.css";

function Map({ center, zoom }) {
  
const [storage, setStorage] = useState([]);
const [fires, setFires] = useState([]);

const cargarChinchetas = () => {
  setStorage([])
  for (let i = 0; i < localStorage.length; i++) {
      setStorage(storage => [...storage, {nombre:localStorage.key(i), coords: JSON.parse(localStorage.getItem(localStorage.key(i)))}])
  }
}
useEffect(() => {
  cargarChinchetas()
}, [])

useEffect(() => {
  if (storage.length > 0) {
    for (let i = 0; i < storage.length; i++) {
      const lat = storage[i].coords.latitude
      const lon = storage[i].coords.longitude
      const string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=ad31161ec98d566567a4eca12972a060`
      fetch(string)
        .then(response => response.json())
        .then(data => {
          let date = new Date((data.dt) * 1000)
          let l = data.coord.lat
          let t = data.coord.lon;
          let tma = data.main.temp_max;
          let tmi = data.main.temp_min;
          let tme = (data.main.temp_max + data.main.temp_min)/2;
          let r = data.wind ? data.wind.gust ? data.wind.gust : 0 : 0;
          let vm = data.wind ? data.wind.speed ? data.wind.speed : 0 : 0;
          let p1 = data.rain ? data.rain['1h'] : 0;
          let p2 = data.rain ? data.rain['1h'] : 0;
          let p3 = data.rain ? data.rain['1h'] : 0;
          let p4 = data.rain ? data.rain['1h'] : 0;
          let p5 = data.rain ? data.rain['1h'] : 0;
          let d = date.getDate();
          let m = date.getMonth();
          const url = `http://localhost:5002/prediccion?l=${l}&t=${t}&tma=${tma}&tmi=${tmi}&tme=${tme}&r=${r}&vm=${vm}&p1=${p1}&p2=${p2}&p3=${p3}&p4=${p4}&p5=${p5}&m=${m}&d=${d}`;
          fetch(url)
            .then(response => response.json())
            .then(data => {
              const fireProvability =  Math.trunc(data*100)
              setFires(fire => [...fire, {nombre:storage[i].nombre, coords: JSON.parse(localStorage.getItem(storage[i].nombre)), fire:fireProvability}])
            })
        })
    }
  }
}, [storage]);

  return (
    <div className="relative z-10 pt-20 sm:pt-0 bg-zinc-900">
    <div className="map sm:ml-24 ">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {
        fires.map(item => {
          return(
            <Marker position={[item.coords.latitude, item.coords.longitude]} key={item.nombre}>
              <Popup>
                {item.nombre}
                <br/>
                {item.fire}%
              </Popup>
              {
                item.fire > 50 &&
              <Circle center={[item.coords.latitude, item.coords.longitude]} radius={25000} pathOptions={{ color: 'red', fillColor: 'red' }}/>
              }
            </Marker>
          )
        })
        }
      </LeafletMap>
    </div>
    </div>
  );
}

export default Map;
