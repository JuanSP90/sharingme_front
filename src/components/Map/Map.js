import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPTOKEN = process.env.REACT_APP_MAPTOKEN;
const URLBACKEND = process.env.REACT_APP_URL_BACKEND;

const MapView = () => {

    const [userLocations, setUserLocations] = useState([]);

    useEffect(() => {
        async function fetchUserLocations() {
            try {
                const response = await axios.get(`${URLBACKEND}/users/usersMap`)
                const { locations } = response.data;
                const geocodedLocations = await Promise.all(locations.map(geocodeLocation));
                setUserLocations(geocodedLocations);
                setUserLocations(geocodedLocations.filter(location => location));
            } catch (error) {
                console.error("Error al obtener las ubicaciones de los usuarios:", error);
            }
        }

        fetchUserLocations();
    }, []);

    async function geocodeLocation(locationName) {
        if (locationName != null) {
            try {
                const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?access_token=${MAPTOKEN}`);
                const features = response.data.features;

                if (features.length > 0) {
                    const coordinates = features[0].center;
                    return { longitude: coordinates[0], latitude: coordinates[1] };
                } else {
                    console.log(`No se encontraron resultados para la ubicación: ${locationName}`);
                    return null;
                }
            } catch (error) {
                console.error(`Error al geocodificar la ubicación ${locationName}:`, error);
                return null;
            }
        }
    }

    return (
        <Map
            mapboxAccessToken={MAPTOKEN}
            initialViewState={{
                longitude: -3.696875,
                latitude: 40.415581,
                zoom: 3
            }}
            style={{ width: '90vw', height: '70vh' }}
            mapStyle="mapbox://styles/mapbox/streets-v9">

            {userLocations.map(location => (
                <Marker
                    key={`${location.longitude}-${location.latitude}`}
                    longitude={location.longitude}
                    latitude={location.latitude}
                >
                </Marker>)
            )}
        </Map>
    );
}

export default MapView;
