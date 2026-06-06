import React, { useEffect, useState,useRef } from "react";

import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import './Sign_UP'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {
  faDroplet,
  faVial,
  faHospital,
  faPhone,
  //faLocationDot,
  faBriefcaseMedical,
  faCalendarDays
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';

const User = () => {

  const [showDiv, setShowDiv] = useState(1);
  const [showDiv2, setShowDiv2] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const dropdownRef = useRef(null);
  const [open,setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate();
    }
  }, [navigate]);

  //--------------Edit Window--------------
  const openEditWindow = () => {
    setShowDiv(2)
  }
  const closeEditWindow = () => {
    setShowDiv2(false);
    setShowDiv(1)
  }
  //--------------View history-------------
  const openViewHistory = () => {
    setShowDiv(3)
  }
  const editProfileIcon = () => {
    setShowPopup(true)
  }

  const [user, setUser] = useState(null);
  const [remaining, setRem] = useState('')
  const [lastDonationDate, setLDD] = useState(' ');

  const daysLeft = (lastDate, gap) => {
    const lastDon = new Date(lastDate);
    lastDon.setHours(0, 0, 0, 0);
    const nextDate = new Date(lastDon);
    nextDate.setDate(lastDon.getDate() + gap);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = nextDate - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }


const toggleMenu = () => {
  setOpen(prev => !prev);
};


  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("id", token)

      //      if (!token) {
      //   return;
      // }

      const res = await fetch("http://localhost:50333/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      console.log(lastDonationDate?.split("T")[0])
      console.log(data)
      setLDD(data.lastDonationDate?.split("T")[0]);
      setUser(data);
      if (data.lastDonationDate) {
        const remaining = daysLeft(lastDonationDate, 90);
        setRem(remaining);
        console.log(remaining)
      }
    };

    fetchProfile();


     function handleClickOutside(event) {
    if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
      setOpen(false);
    }
  }

  document.addEventListener("mousedown",handleClickOutside)
  
  return ()=>{
    document.removeEventListener("mousedown",handleClickOutside);
  }


  }, []);



  if (!user) return <div>Loading...</div>;



  return (
    
    <>

      <body>
        {showDiv === 1 && (
          <div className='main-div'>

            <div className='div1'>
              <div>
                <h1>Hello,{user.name}!</h1>
                <li>Blood Group : {user.bloodGrp} |</li>
                <li>Last Donation : {user.lastDonationDate?.split("T")[0]} 💚✔️ |</li><br />
                <div className='div11'>
                  {remaining <= 0
                    ? `Eligible to donate ❤️ ${remaining}`
                    : `Eligible in ${remaining} days`}
                </div>
              </div>



              <center>
              <div>
                  <FontAwesomeIcon icon={faLocationCrosshairs} />
              </div>


                <div ref={dropdownRef}>
                <div className="bell" onClick={toggleMenu}  >
                  <FontAwesomeIcon icon={faBell} />
                  <span className="notCount">3</span>
                </div>

                {open &&<div className="notification-dropdown">

                  <div class="notification-header">
                    Notifications
                  </div>

                  <div class="notification-item urgent">
                    🩸 Urgent blood needed (A+)
                  </div>

                  <div class="notification-item">
                    📅 Blood camp on 15 March
                  </div>

                  <div class="notification-item approved">
                    ✅ Donation request approved
                  </div>

                  <div class="notification-footer">
                    View All Notifications
                  </div>

                </div>}
</div>

                <div className='Div12' style={{ display: "inline" }}>

                  <div class="P-icon" onClick={editProfileIcon}>
                    <FontAwesomeIcon icon={faUser} size="9x" style={{ color: "#c2858e" }} />
                  </div>
                  <br></br>
                  <hr></hr>
                  <div className='btns'>
                    <button className='btn' onClick={openEditWindow}>Edit Profile</button>
                    <button className='btn' onClick={openViewHistory}>View Donation History</button></div>

                </div>
              </center>
            </div>


            <div className='div2'>
              <Link to="/donorregistration">
                <button disabled={remaining > 0}
                  className={remaining > 0 ? "btn-disabled" : "btn-active"} name="btn" >
                  <FontAwesomeIcon
                    icon={faDroplet}
                    size="4x"
                    style={{ color: "#e9dddd", paddingTop: "20px" }}
                  /></button>
                <label for="btn" style={{ marginLeft: "30px" }}><h3>Donate</h3></label>
              </Link>
              <Link to="/donorlist">
                <button className='admin' name="btn"><FontAwesomeIcon
                  icon={faBriefcaseMedical}
                  size="5x"
                  style={{ color: "#e9dddd", paddingTop: "20px" }}
                /></button>
                <label for="btn" style={{ marginLeft: "30px" }}><h3>Receive</h3></label>
              </Link>
            </div>



            {/*---------------change profile photo----------*/}
            {showPopup && (
              <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                  <h3>Change Profile Photo</h3>

                  <div className="popup-option">
                    <FontAwesomeIcon icon={faCamera} /> Take Photo
                  </div>

                  <div className="popup-option">
                    <FontAwesomeIcon icon={faImage} /> Choose from Gallery
                  </div>

                  <div
                    className="popup-cancel"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            )}



          </div>
        )}

        {showDiv == 2 && (
          <div className='main-div2' style={{ height: "400px" }}>
            <div>

              <b>Edit Profile</b><div className="close" onClick={closeEditWindow}>	&#10006;</div><br></br>
              <hr></hr>
            </div >
            <div className="edit" style={{ display: "inline", }}>

              <div className="e1">
                <label id="l2" for="name">Name:</label><input type="url" name="name" value={user.name} />
                <label id="l2" for="dob">DOB:</label><input type="date" name="dob" />
              </div>
              <div className="e1">
                <label id="l2" for="number">Phone:</label><input type="number" name="number" value={user.phone} />
                <label id="l2" for="email">Email:</label><input type="email" name="email" value={user.email} />
              </div>
              <div className="e1">
                <label id="l2" for="city">City:</label><input type="" name="city" />
                <select><option selected>Select Gen</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option></select>
              </div>


              <div class="health-box">
                <h3>Health Status </h3>

                <div className="leftDiv">
                  <div class="health-item">

                    <input type="checkbox" id="illness" checked={user.healthStatus.noRecentIllness} />
                    <label for="illness">No Recent Illness</label>
                  </div>

                  <div class="health-item">
                    <input type="checkbox" id="smoker" checked={user.healthStatus.nonSmoker} />
                    <label for="smoker">Non-Smoker</label>
                  </div>

                  <div class="health-item">
                    <input type="checkbox" id="infection" checked={user.healthStatus.noInfectiousDisease} />
                    <label for="infection">No Infectious Disease</label>
                  </div>
                </div>
                <div className="rightDiv">
                  <div class="">
                    <label for="lastDonation">Last Donation Date</label>
                    <input type="date" id="lastDonation" value={user.lastDonationDate?.split("T")[0]} />
                  </div>
                  <div className='btns'>
                    <button className='btn2' >Save</button>
                    <button className='btn2'>Cancel</button></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/*----------------------View History---------------------------*/}

        {showDiv == 3 && (
          <div className='main-div2' style={{ height: "400px" }}>
            <div>
              <h3>View Donation History</h3><div className="close" onClick={closeEditWindow}>	&#10006;</div><br></br>

            </div >
            <hr></hr>
            <div>
              <table>
                <tr>
                  <th>Donations</th>
                  <th>Date</th>
                  <th>Hospital</th>
                  <th>City</th>
                  <th>Type</th>
                  <th>Status</th>

                </tr>
                <tr>
                  <td>#1</td>
                  <td>12 Feb 2026</td>
                  <td>Apollo</td>
                  <td>Bhubaneshwar</td>
                  <td>Whole Blood</td>
                  <td>✅ Completed</td>
                </tr>
              </table>
            </div>
          </div>
        )}
      </body>
    </>

  );
}

export default User;

//  <label id="l2" for="weight">Weight:</label><input type="reset" name="weight"/>
//           <checkBox><option selected>Heath Status</option>
//                   <option>Smoking</option>
//                   <option>Female</option>
//                   <option>Others</option></select>

// <div className='d21'>  <ul className='reqDetails'>
//   <div className='main'>Heath Status</div>
//   <div>Reported as Healthy</div><hr></hr>
//   <li>No Recent illness    ✅</li><hr></hr>
//   <li>Non-Smoker           ✅</li><hr></hr>
//   <li>No Infection Disease ✅</li>
//   </ul></div>
