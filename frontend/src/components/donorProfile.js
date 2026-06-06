import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DonorProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { 
  faHospital, 
  faPhone, 
  faLocationDot, 
  faCalendarDays 
} from '@fortawesome/free-solid-svg-icons'
const DonorProfile = () => {

  const [cand, setCand] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCand();
  }, []);

  const getCand = async () => {
    try {
      const token=localStorage.getItem("token")
      const res = await fetch("http://localhost:50333/donorlist/698ba6f50b19f4d31734646c", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Server Error");
      }

      const result = await res.json();
      setCand(result);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='D1'>

      <div class="profile-icon">
        <FontAwesomeIcon icon={faUser} size="9x" style={{ color: "#c2858e" }} />
      </div>
      <center>
        <div className='donor'>{cand ? (
          <><tr className='name'>{cand.name}</tr>
            <tr>Age: {cand.age}</tr>
            <tr>BloodType: {cand.bloodGrp}</tr></>
        ) : (
          <tr>
            <td colSpan="10" style={{ textAlign: "center" }}>
              No Result Found
            </td>
          </tr>
        )}</div>

        <br></br>
        <hr></hr>
      </center>
      <br></br><br></br>
<div className='D2'>
      <div className='d1'><tr><FontAwesomeIcon icon={faHospital} size="1x" style={{ color: "#f1a7b3" }}/> Hospital: St.John's Medical Center</tr>
        <hr></hr>
        <tr><FontAwesomeIcon icon={faLocationDot} size="1x" style={{ color: "#f1a7b3" }}/> Location :{cand.addrs}</tr>
        <hr></hr>
        <tr><FontAwesomeIcon icon={faCalendarDays} size="1x" style={{ color: "#f1a7b3" }} /> Needed By: April 25, 2025</tr>
        <hr></hr>
        <tr><FontAwesomeIcon icon={faPhone} size="1x" style={{ color: "#f1a7b3" }}/> Contact: +91 {cand.mobno}</tr></div>
      <div className='d2'></div>
</div>
    </div>
  );
};

export default DonorProfile;