import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

const HeatMapLayer = ({ data }) => {
  const map = useMap();

  React.useEffect(() => {
    const heatLayer = L.heatLayer(
      data.map((point) => [point.lat, point.lng, point.density || 1]),
      {
        radius: 50, // Increased radius for better visibility when zoomed out
        blur: 35, // Increased blur to make the heat spots more pronounced
        maxZoom: 10, // Adjust maxZoom to make heat spots visible even when zoomed out
      }
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, data]);

  return null;
};

const HeatMap = ({ data, center }) => (
  <MapContainer center={center} zoom={7} className="leaflet-container">
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <HeatMapLayer data={data} />
  </MapContainer>
);

export default HeatMap;
