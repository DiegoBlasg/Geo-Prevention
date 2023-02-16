import React, { useState, useEffect } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker } from "react-leaflet";
import "./Map.css";

function Map({ center, zoom }) {
  
const [storage, setStorage] = useState([]);

const cargarChinchetas = () => {
  setStorage([])
  for (let i = 0; i < localStorage.length; i++) {
      setStorage(storage => [...storage, {nombre:localStorage.key(i), coords: JSON.parse(localStorage.getItem(localStorage.key(i)))}])
  }
}
useEffect(() => {
  cargarChinchetas()
}, [])
  return (
    <div className="map ml-24">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {storage.map(item => {
          return(
            <Marker position={[item.coords.latitude, item.coords.longitude]}>
            </Marker>
          )
        })}
      </LeafletMap>
    </div>
  );
}

export default Map;
