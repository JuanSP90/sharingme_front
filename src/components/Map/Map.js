import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapWithMarkers = ({ users }) => {

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    const center = users.length > 0 ? users[0].geolocation : { lat: 0, lng: 0 };

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
        >
            {users.map((user, index) => (
                <Marker
                    key={index}
                    position={
                        // JSON.parse
                        (user.geolocation)}
                    title={user.userName}
                />
            ))}
        </GoogleMap>

    );
};

export default MapWithMarkers;
