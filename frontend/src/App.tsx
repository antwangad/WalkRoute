import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface LatLng {
  lat: number;
  lng: number;
}

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const App: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [distance, setDistance] = useState<number>(2);
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('http://localhost:8000/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, distance })
    });
    const data = await res.json();
    setRouteCoords(data.route.map((coord: [number, number]) => ({ lat: coord[0], lng: coord[1] })));
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Walk Route</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="border p-2 mr-2"
        />
        <input
          type="number"
          min="0.5"
          step="0.1"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="border p-2 mr-2 w-24"
        /> km
        <button type="submit" className="bg-blue-600 text-white p-2 ml-2">Go</button>
      </form>

      {loading && <p>Loading route...</p>}

      {routeCoords.length > 0 && (
        <MapContainer center={routeCoords[0]} zoom={15} style={{ height: '500px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline positions={routeCoords.map(p => [p.lat, p.lng])} color="blue" />
          <Marker position={[routeCoords[0].lat, routeCoords[0].lng]} icon={customIcon}>
            <Popup>Start/End</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default App;