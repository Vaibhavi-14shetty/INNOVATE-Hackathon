"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const faultIcon = new L.Icon({
  iconUrl:
    "https://maps.google.com/mapfiles/ms/icons/red-dot.png",

  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const villageIcon = new L.Icon({
  iconUrl:
    "https://maps.google.com/mapfiles/ms/icons/green-dot.png",

  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Rural Pune / Khed region
const substation: [number, number] = [18.75, 73.85];

const transformerT101: [number, number] = [18.76, 73.87];

// Integrated fault asset:
// Feeder F1 → Transformer T2 → Village C
const transformerT2: [number, number] = [18.77, 73.89];

const transformerT118: [number, number] = [18.73, 73.88];

// Integrated affected village
const villageC: [number, number] = [18.765, 73.875];

const villageRajgurunagar: [number, number] = [18.775, 73.895];

const villageManchar: [number, number] = [18.735, 73.885];

const feederNorth: [number, number][] = [
  substation,
  transformerT101,
  transformerT2,
];

const feederSouth: [number, number][] = [
  substation,
  transformerT118,
];

export default function GridMap() {
  return (
    <MapContainer
      center={substation}
      zoom={12}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Feeder Network */}
      <Polyline
        positions={feederNorth}
        pathOptions={{
          color: "blue",
          weight: 4,
        }}
      />

      <Polyline
        positions={feederSouth}
        pathOptions={{
          color: "orange",
          weight: 4,
        }}
      />

      {/* Substation */}
      <Marker
        position={substation}
        icon={defaultIcon}
      >
        <Popup>
          <strong>Substation S1</strong>
          <br />
          Central Rural Substation
          <br />
          Voltage: 33 kV
          <br />
          Status: Active
        </Popup>
      </Marker>

      {/* Transformer T1 */}
      <Marker
        position={transformerT101}
        icon={defaultIcon}
      >
        <Popup>
          <strong>Transformer T1</strong>
          <br />
          Feeder: F1
          <br />
          Status: Operational
        </Popup>
      </Marker>

      {/* Transformer T2 - Integrated Fault */}
      <Marker
        position={transformerT2}
        icon={faultIcon}
      >
        <Popup>
          <strong>Transformer T2</strong>
          <br />
          Feeder: F1
          <br />
          Fault: Transformer Overload
          <br />
          Fault ID: F02
          <br />
          Severity: High
          <br />
          AI Confidence: 92%
          <br />
          Affected Village: Village C
          <br />
          Cause: Excessive connected load
        </Popup>
      </Marker>

      {/* Transformer T3 */}
      <Marker
        position={transformerT118}
        icon={defaultIcon}
      >
        <Popup>
          <strong>Transformer T3</strong>
          <br />
          Feeder: F2
          <br />
          Status: Operational
        </Popup>
      </Marker>

      {/* Village C - affected by T2 */}
      <Marker
        position={villageC}
        icon={villageIcon}
      >
        <Popup>
          <strong>Village C</strong>
          <br />
          Connected to Transformer T2
          <br />
          Affected by Transformer Overload
        </Popup>
      </Marker>

      {/* Village - Rajgurunagar */}
      <Marker
        position={villageRajgurunagar}
        icon={villageIcon}
      >
        <Popup>
          <strong>Rajgurunagar</strong>
          <br />
          Affected by Feeder F-204
        </Popup>
      </Marker>

      {/* Village - Manchar */}
      <Marker
        position={villageManchar}
        icon={villageIcon}
      >
        <Popup>
          <strong>Manchar</strong>
          <br />
          Affected by Transformer T-118
        </Popup>
      </Marker>
    </MapContainer>
  );
}