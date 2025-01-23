import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker icon images
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

// Define custom default icon
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Set the default icon globally
L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ OrganizationData, cordinates }) => {
  const defaultPosition = [28.6139, 77.2090]; // Default location (Delhi)

  const FlyTo = ({ location }) => {
    const map = useMap();

    useEffect(() => {
      if (location && location.length === 2) {
        map.flyTo(location, 12, { duration: 3 });
      }
    }, [location, map]);

    return null;
  };

  if (!Array.isArray(OrganizationData)) {
    return <div>Error: OrganizationData is not available.</div>;
  }

  return (
    <div className='h-full w-full'>
      <MapContainer center={defaultPosition} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <FlyTo location={cordinates} />
        {OrganizationData.length > 0 ? (
          OrganizationData.map(marker => (
            <Marker key={marker.id} position={marker.position}>
              <Popup>{marker.name}</Popup>
            </Marker>
          ))
        ) : (
          <div>No organizations to display.</div>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
