import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol"; // Import plugin
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Define the custom icon
const customIconUrl = process.env.PUBLIC_URL + "/delivery-truck.png"; // Adjust the path to your custom icon
const customIcon = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Mapping = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [sharedLocations, setSharedLocations] = useState([]);
  const firebaseConfig = {
    apiKey: "AIzaSyAu-Ajy8QENGR3VfNNUh7mv8Cotuz1sv6I",
    authDomain: "sawe9ji-2c444.firebaseapp.com",
    databaseURL:
      "https://sawe9ji-2c444-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sawe9ji-2c444",
    storageBucket: "sawe9ji-2c444.appspot.com",
    messagingSenderId: "262930992846",
    appId: "1:262930992846:web:6d25a4da8c711b1bdaca9f",
    measurementId: "G-Z440HV8V1M",
  };
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  useEffect(() => {
    // Fetch shared locations from Firebase Realtime Database
    const sharedLocationsRef = ref(db, "sharedLocations/driver_locations");
    onValue(sharedLocationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array of locations
        const locationsArray = Object.keys(data).map((key) => ({
          name: key,
          latitude: data[key].latitude,
          longitude: data[key].longitude,
        }));
        setSharedLocations(locationsArray);
      }
    });
  }, [db]);

  return (
    <div style={{ height: "500px" }}>
      <MapContainer center={[34.0, 9.0]} zoom={7} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sharedLocations.map((location) => (
          <Marker
            key={location.name}
            position={[location.latitude, location.longitude]}
            icon={customIcon} // Set custom icon for the marker
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapping;
