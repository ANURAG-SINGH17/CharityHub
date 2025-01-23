import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ OrganizationData, cordinates }) => {
  const defaultPosition = [28.6139, 77.2090]; // Default location (Delhi)

  // Custom hook to handle map flyTo behavior
  const FlyTo = ({ location }) => {
    const map = useMap();

    useEffect(() => {
      if (location && location.length === 2) {
        map.flyTo(location, 12, {
          duration: 3, // Fly animation duration in seconds
        });
      }
    }, [location, map]);

    return null;
  };

  // Check if OrganizationData exists and is an array
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
        {/* Fly to cordinates prop */}
        <FlyTo location={cordinates} />
        
        {/* Render markers for each organization if data is available */}
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
