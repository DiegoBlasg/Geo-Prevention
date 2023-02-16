
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import { useEffect, useState } from "react";
const Places = () => {

const [chincheta, setChincheta] = useState(null);
const [search, setsearch] = useState(null);
const [coords, setCoords] = useState(null);
const [storage, setStorage] = useState([]);

const consulta = () => {
    let string = `http://localhost:5002/coordenadas?place=${search}`
    fetch(string)
    .then(res => res.json())
    .then(data => {
        setCoords(data[0]);
    })
}
const cargarChinchetas = () => {
    setStorage([])
    for (let i = 0; i < localStorage.length; i++) {
        setStorage(storage => [...storage, {nombre:localStorage.key(i), coords: JSON.parse(localStorage.getItem(localStorage.key(i)))}])
    }
}
const crearChincheta = () => {
    localStorage.setItem(search, JSON.stringify(coords));
    setChincheta(false)
    cargarChinchetas()
}
const borrarChincheta = (nombre) => {
    localStorage.removeItem(nombre);
    cargarChinchetas()
}
useEffect(() => {
    cargarChinchetas()
}, [])

  return (
    <div className="ml-24">
        <div className=" max-w-2xl mx-auto">
            <div className="flex items-center">
                <div className="relative w-full mt-10">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input onChange={(e) => [setsearch(e.target.value), setCoords(false)]} type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  " placeholder="Search any place" required/>
                    
                </div>
                <div onClick={consulta} className="cursor-pointer mt-10 inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-zinc-700 rounded-lg border border-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300">
                    <svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    Search
                </div>
            </div>
        <div className="flex flex-col justify-center items-center mt-3">
        </div>
        {
            coords &&
            <div onClick={() => setChincheta(!chincheta)} className="rounded-lg cursor-pointer flex justify-center items-center bg-zinc-800 text-white font-bold text-xl mb-3">
            
                <h1 className="py-2 mr-3">CHINCHETA</h1>
                {
                    chincheta ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                }
            </div>
        }
            </div>
            {
                chincheta && coords &&
                <>
                <div className="flex flex-col justify-center items-center mt-3">
                    <div className="border p-5">
                        <div className="flex justify-center items-center mb-3">
                            <div className="flex items-center">
                                <h1 className="font-bold">{search}</h1>                    
                            </div>
                        </div> 
                        <div className="text-center mb-3">
                                <p className="font-bold">{coords.latitude}, {coords.longitude}</p>
                        </div>
                        <div className="text-center">
                            <div onClick={crearChincheta} className="cursor-pointer inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-zinc-700 rounded-lg border border-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300">
                                Crear
                            </div>
                        </div>
                    </div>
                </div>

        
        
        <div className="map mx-24 mt-5">
        <LeafletMap center={{ lat: 40, lng: -3}} zoom={6}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {
                coords &&
                <Marker position={[coords.latitude, coords.longitude]}>
                </Marker>
            }
        </LeafletMap>
        </div>
        </>
        
    }
            <div onClick={() => setChincheta(!chincheta)} className="mt-4 rounded-lg cursor-pointer flex justify-center items-center text-zinc-900 font-bold text-xl mb-3">
                <h1 className="py-2 mr-3">CHINCHETAS</h1>
            </div>
            {
                storage.length > 0 &&
                storage.map(item => {
                    return(
                        <div className="flex justify-center items-center mb-4 bordermx-40 rounded-xl p-2" key={item.nombre}>
                            <div className="mx-2 p-3 bg-zinc-800 text-white rounded-xl"><h1>{item.nombre}</h1></div>
                            <div className="mx-2 flex p-3 bg-zinc-300  text-zinc-800 rounded-xl">
                                <h1>{item.coords.latitude}, {item.coords.longitude}</h1>
                            </div>
                            <div className="mx-2 p-3 cursor-pointer bg-red-600 text-white rounded-xl" onClick={() => borrarChincheta(item.nombre)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </div>
                        </div>
                    )
                })
            }
    </div>
  );
};

export default Places;
