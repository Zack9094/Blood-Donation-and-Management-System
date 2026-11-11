import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function AddNgo() {
  const [position, setPosition] = useState([20, 85]);
  const [search, setSearch] = useState("");

  return (
    <div style={{ padding: "15px" }}>
      
      {/* Location icon */}
      <div style={{ fontSize: "25px", marginBottom: "10px" }}>
        <FontAwesomeIcon icon={faLocationCrosshairs} />
      </div>

      {/* Search box */}
      <input
        type="search"
        placeholder="Search donors"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "250px",
          padding: "8px",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Map */}
      <MapContainer
        center={position}
        zoom={13}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            <strong>Rahul</strong> <br />
            Blood Group: A+ <br />
            Location: Nearby
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default AddNgo;