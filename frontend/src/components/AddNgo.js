import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

function AddNgo(){

 const [position,setPosition] = useState([20,85]);
 const navigate=useNavigate();
  useEffect(() => {

  }, [navigate]);
 return(
  <div>

   <div>
    <FontAwesomeIcon icon={faLocationCrosshairs} />
   </div>

   <input type="search" placeholder="Search donors"/>

   <MapContainer center={position} zoom={13} style={{height:"400px"}}>

    <TileLayer
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <Marker position={position}>
     <Popup>
      Rahul – A+ donor
     </Popup>
    </Marker>

   </MapContainer>

  </div>
 )
}

export default AddNgo;