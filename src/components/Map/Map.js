import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
const MAPTOKEN = process.env.REACT_APP_MAPTOKEN;

function Map() {
    const Map = ReactMapboxGl({
        accessToken: MAPTOKEN
    });

    const [userLocations, setUserLocations] = useState([]);

    useEffect(() => {
        async function fetchUserLocations() {
            try {
                const response = await axios.get('http://localhost:3001/users/usersMap')
                const { locations } = response.data;
                const geocodedLocations = await Promise.all(locations.map(geocodeLocation));
                console.log('soy geocode', geocodedLocations)
                setUserLocations(geocodedLocations);
                setUserLocations(geocodedLocations.filter(location => location));
                // console.log('soy las localizaciones', userLocations)
            } catch (error) {
                console.error("Error al obtener las ubicaciones de los usuarios:", error);
            }
        }

        fetchUserLocations();
    }, []);

    async function geocodeLocation(locationName) {
        if (locationName != null) {
            try {
                console.log('soy locationname', locationName)
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
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '70vh',
                width: '90vw'
            }}
            center={[-3.696875, 40.415581]}
            zoom={[3]}
        >
            {userLocations.map((location, index) => (
                <Layer key={`layer-${index}`} type="symbol" id={`marker-${index}`} layout={{ 'icon-image': 'marker-15' }}>
                    <Feature key={`feature-${index}`} coordinates={[location.longitude, location.latitude]} />
                </Layer>
            ))}
        </Map>
    );
}

export default Map;
