// @ts-nocheck
"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const riskZones = [
  {
    name: "Zone A",
    position: [11.0168, 76.9558] as [number, number],
    risk: 76,
    status: "HIGH ATTENTION",
  },
  {
    name: "Zone B",
    position: [11.0268, 76.9658] as [number, number],
    risk: 51,
    status: "DEVELOPING",
  },
  {
    name: "Zone C",
    position: [11.0068, 76.9458] as [number, number],
    risk: 32,
    status: "WATCH",
  },
];

function getColor(risk: number) {
  if (risk <= 25) return "green";
  if (risk <= 50) return "yellow";
  if (risk <= 75) return "orange";
  return "red";
}

export default function MapView() {
  return (
    <MapContainer
      center={[11.0168, 76.9558]}
      zoom={13}
      style={{ height: "600px", width: "100%" }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {riskZones.map((zone) => (
        <CircleMarker
          key={zone.name}
          center={zone.position}
          radius={18}
          pathOptions={{
            color: getColor(zone.risk),
            fillColor: getColor(zone.risk),
            fillOpacity: 0.6,
          }}
        >
          <Popup>
            <div>
              <strong>{zone.name}</strong>
              <br />
              Risk: {zone.risk}%
              <br />
              Status: {zone.status}
            </div>
          </Popup>
        </CircleMarker>
      ))}

    </MapContainer>
  );
}