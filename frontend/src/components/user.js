
import React, { useEffect, useState,useRef } from "react";
import './user.css';
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
const [showPopup, setShowPopup] = useState(false);
const [open, setOpen] = useState(false);

const [user, setUser] = useState(null);
const [originalUser, setOriginalUser] = useState(null);

const [remaining, setRem] = useState(0);


const saveProfile = async () => {
  try {
    const token =localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:50334/updateProfile",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      }
    );

    const updatedUser =
      await response.json();

    if (!response.ok) {
      alert(
        updatedUser.message ||
          "Update Failed"
      );
      return;
    }

    setUser(
      JSON.parse(
        JSON.stringify(updatedUser)
      )
    );

    setOriginalUser(
      JSON.parse(
        JSON.stringify(updatedUser)
      )
    );

    alert(
      "Profile Updated Successfully"
    );

    setShowDiv(1);
  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
};

const dropdownRef = useRef(null);
const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate();
    }
  }, [navigate]);


const daysLeft = (lastDate, gap) => {
  const lastDon = new Date(lastDate);
  lastDon.setHours(0, 0, 0, 0);

  const nextDate = new Date(lastDon);
  nextDate.setDate(lastDon.getDate() + gap);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Math.ceil(
    (nextDate - today) /
      (1000 * 60 * 60 * 24)
  );
};

const openEditWindow = () => {
  setShowDiv(2);
};

const openViewHistory = () => {
  setShowDiv(3);
};

const closeEditWindow = () => {
  setShowDiv(1);
};

const editProfileIcon = () => {
  setShowPopup(true);
};

const toggleMenu = () => {
  setOpen((prev) => !prev);
};

const handleCancel = () => {
  setUser(
    JSON.parse(
      JSON.stringify(originalUser)
    )
  );

  setShowDiv(1);
};
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(
        "http://localhost:50334/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setUser(
        JSON.parse(JSON.stringify(data))
      );

      setOriginalUser(
        JSON.parse(JSON.stringify(data))
      );

      if (data.lastDonationDate) {
        setRem(
          daysLeft(
            data.lastDonationDate,
            90
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchProfile();

  const handleClickOutside = (
    event
  ) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(
        event.target
      )
    ) {
      setOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, [navigate]);


if (!user) {
  return (
    <div>
      Loading Profile...
    </div>
  );
}

  return (
    
    <>

   
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

                  <div className="notification-header">
                    Notifications
                  </div>

                  <div className="notification-item urgent">
                    🩸 Urgent blood needed (A+)
                  </div>

                  <div className="notification-item">
                    📅 Blood camp on 15 March
                  </div>

                  <div className="notification-item approved">
                    ✅ Donation request approved
                  </div>

                  <div className="notification-footer">
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
                <label htmlFor="btn" style={{ marginLeft: "30px" }}><h3>Donate</h3></label>
              </Link>
              <Link to="/donorlist">
                <button className='admin' name="btn"><FontAwesomeIcon
                  icon={faBriefcaseMedical}
                  size="5x"
                  style={{ color: "#e9dddd", paddingTop: "20px" }}
                /></button>
                <label htmlFor="btn" style={{ marginLeft: "30px" }}><h3>Receive</h3></label>
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
    <label className="l2">Name:</label>
    <input
        type="text"
        value={user?.name || ""}
        onChange={(e) =>
            setUser({
                ...user,
                name: e.target.value,
            })
        }
    />

    <label className="l2">DOB:</label>
    <input type="date" name="dob" />
</div>

<div className="e1">
    <label className="l2">Phone:</label>
    <input
        type="text"
        value={user?.phone || ""}
        onChange={(e) =>
            setUser({
                ...user,
                phone: e.target.value,
            })
        }
    />

    <label className="l2">Email:</label>
    <input
        type="email"
        name="email"
        value={user?.email || ""}
        onChange={(e) =>
            setUser({
                ...user,
                email: e.target.value,
            })
        }
    />
</div>

<div className="e1">
    <label className="l2">City:</label>
    <input type="text" name="city" />

    <label className="l2">Gender:</label>
    <select>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Others</option>
    </select>
</div>


              <div className="health-box">
                <h3>Health Status </h3>

                <div className="leftDiv">
              <div className="health-item">
  <input
    type="checkbox"
    checked={
      user?.healthStatus
        ?.noRecentIllness || false
    }
    onChange={(e) =>
      setUser({
        ...user,
        healthStatus: {
          ...user.healthStatus,
          noRecentIllness:
            e.target.checked,
        },
      })
    }
  />
  <label>
    No Recent Illness
  </label>
</div>

<div className="health-item">
  <input
    type="checkbox"
    checked={
      user?.healthStatus
        ?.nonSmoker || false
    }
    onChange={(e) =>
      setUser({
        ...user,
        healthStatus: {
          ...user.healthStatus,
          nonSmoker:
            e.target.checked,
        },
      })
    }
  />
  <label>
    Non Smoker
  </label>
</div>

<div className="health-item">
  <input
    type="checkbox"
    checked={
      user?.healthStatus
        ?.noInfectiousDisease ||
      false
    }
    onChange={(e) =>
      setUser({
        ...user,
        healthStatus: {
          ...user.healthStatus,
          noInfectiousDisease:
            e.target.checked,
        },
      })
    }
  />
  <label>
    No Infectious Disease
  </label>
</div>
                </div>
                <div className="rightDiv">
                  <div className="">
                    <div className="input-group">
    <label id="l2">Blood Group</label>

    <select
        value={user?.bloodGrp || ""}
        onChange={(e) =>
            setUser({
                ...user,
                bloodGrp: e.target.value
            })
        }
    >
        <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
    </select>
</div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    <label id="l2" htmlFor="lastDonation">Last Donation Date</label>
                    <input type="date" id="lastDonation" value={user.lastDonationDate?.split("T")[0]} />
                  </div>
                  <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  <div className="btns">
  <button
    className="btn2"
    onClick={saveProfile}
  >
    Save
  </button>

  <button
    className="btn2"
    onClick={handleCancel}
  >
    Cancel
  </button>
</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/*----------------------View History---------------------------*/}

        {showDiv == 3 && (
          <div className='main-div2 history-page'>
            <div className="history-container"><div className="close" onClick={closeEditWindow}>	&#10006;</div><br></br>
  <h2>Donation History</h2>

  <table className="history-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Hospital</th>
        <th>City</th>
        <th>Blood Group</th>
        <th>Donation Type</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>1</td>
        <td>12 Feb 2026</td>
        <td>Apollo Hospital</td>
        <td>Bhubaneswar</td>
        <td>O+</td>
        <td>Whole Blood</td>
        <td>
          <span className="completed">Completed</span>
        </td>
      </tr>

      <tr>
        <td>2</td>
        <td>20 Aug 2025</td>
        <td>AIIMS</td>
        <td>Delhi</td>
        <td>O+</td>
        <td>Platelets</td>
        <td>
          <span className="completed">Completed</span>
        </td>
      </tr>

      <tr>
        <td>3</td>
        <td>11 Jan 2025</td>
        <td>City Hospital</td>
        <td>Kolkata</td>
        <td>O+</td>
        <td>Whole Blood</td>
        <td>
          <span className="pending">Pending Verification</span>
        </td>
      </tr>
    </tbody>
  </table>

  <div className="history-summary">
    <div className="summary-card">
      <h3>3</h3>
      <p>Total Donations</p>
    </div>

    <div className="summary-card">
      <h3>2</h3>
      <p>Completed</p>
    </div>

    <div className="summary-card">
      <h3>11 Jan 2025</h3>
      <p>Last Donation</p>
    </div>
  </div>
</div>
          </div>
        )}
    
    </>

  );
}

export default User;


// const User = () => {

//   const [showDiv, setShowDiv] = useState(1);
//   const [showDiv2, setShowDiv2] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const dropdownRef = useRef(null);
//   const [open,setOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = localStorage.getItem("user");
//     if (auth) {
//       navigate();
//     }
//   }, [navigate]);



//   //--------------Edit Window--------------
//   const openEditWindow = () => {
//     setShowDiv(2)
//   }
//   const closeEditWindow = () => {
//     setShowDiv2(false);
//     setShowDiv(1)
//   }
//   const handleCancel = () => {
//   setUser(originalUser);
//   setShowDiv(1);
// };
//   //--------------View history-------------
//   const openViewHistory = () => {
//     setShowDiv(3)
//   }
//   const editProfileIcon = () => {
//     setShowPopup(true)
//   }

//    // save profile-------------------------------------------------------
//     const saveProfile = async () => {
//   const token = localStorage.getItem("token");

//   const response = await fetch(
//     "http://localhost:50334/updateProfile",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(user)
//     }
//   );

//   const data = await response.json();
//   console.log(data);
// };

//     //---------------------------------------------------------

//   const [user, setUser] = useState({
//   healthStatus: {
//     noRecentIllness: false,
//     nonSmoker: false,
//     noInfectiousDisease: false,
//   },
// });
//   const [remaining, setRem] = useState('')
//   const [lastDonationDate, setLDD] = useState(' ');
// const [originalUser, setOriginalUser] = useState(null);

//   const daysLeft = (lastDate, gap) => {
//     const lastDon = new Date(lastDate);
//     lastDon.setHours(0, 0, 0, 0);
//     const nextDate = new Date(lastDon);
//     nextDate.setDate(lastDon.getDate() + gap);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const diff = nextDate - today;
//     return Math.ceil(diff / (1000 * 60 * 60 * 24));
//   }


// const toggleMenu = () => {
//   setOpen(prev => !prev);
// };


//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       console.log("id", token)

//       //      if (!token) {
//       //   return;
//       // }

//       const res = await fetch("http://localhost:50334/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const data = await res.json();
//       console.log("Profile Data:", data);
//       console.log(lastDonationDate?.split("T")[0])
//       console.log(data)
//       setLDD(data.lastDonationDate?.split("T")[0]);
//       setUser(data);
//       setOriginalUser(data);
//       if (data.lastDonationDate) {
//         const remaining = daysLeft(lastDonationDate, 90);
//         setRem(remaining);
//         console.log(remaining)
//       }
//     };

//     fetchProfile();

   


//      function handleClickOutside(event) {
//     if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
//       setOpen(false);
//     }
//   }

//   document.addEventListener("mousedown",handleClickOutside)
  
//   return ()=>{
//     document.removeEventListener("mousedown",handleClickOutside);
//   }


//   }, []);



//   if (!user) return <div>Loading...</div>;



//   return (
    
//     <>

//       <body>
//         {showDiv === 1 && (
//           <div className='main-div'>

//             <div className='div1'>
//               <div>
//                 <h1>Hello,{user.name}!</h1>
//                 <li>Blood Group : {user.bloodGrp} |</li>
//                 <li>Last Donation : {user.lastDonationDate?.split("T")[0]} 💚✔️ |</li><br />
//                 <div className='div11'>
//                   {remaining <= 0
//                     ? `Eligible to donate ❤️ ${remaining}`
//                     : `Eligible in ${remaining} days`}
//                 </div>
//               </div>



//               <center>
//               <div>
//                   <FontAwesomeIcon icon={faLocationCrosshairs} />
//               </div>


//                 <div ref={dropdownRef}>
//                 <div className="bell" onClick={toggleMenu}  >
//                   <FontAwesomeIcon icon={faBell} />
//                   <span className="notCount">3</span>
//                 </div>

//                 {open &&<div className="notification-dropdown">

//                   <div class="notification-header">
//                     Notifications
//                   </div>

//                   <div class="notification-item urgent">
//                     🩸 Urgent blood needed (A+)
//                   </div>

//                   <div class="notification-item">
//                     📅 Blood camp on 15 March
//                   </div>

//                   <div class="notification-item approved">
//                     ✅ Donation request approved
//                   </div>

//                   <div class="notification-footer">
//                     View All Notifications
//                   </div>

//                 </div>}
// </div>

//                 <div className='Div12' style={{ display: "inline" }}>

//                   <div class="P-icon" onClick={editProfileIcon}>
//                     <FontAwesomeIcon icon={faUser} size="9x" style={{ color: "#c2858e" }} />
//                   </div>
//                   <br></br>
//                   <hr></hr>
//                   <div className='btns'>
//                     <button className='btn' onClick={openEditWindow}>Edit Profile</button>
//                     <button className='btn' onClick={openViewHistory}>View Donation History</button></div>

//                 </div>
//               </center>
//             </div>


//             <div className='div2'>
//               <Link to="/donorregistration">
//                 <button disabled={remaining > 0}
//                   className={remaining > 0 ? "btn-disabled" : "btn-active"} name="btn" >
//                   <FontAwesomeIcon
//                     icon={faDroplet}
//                     size="4x"
//                     style={{ color: "#e9dddd", paddingTop: "20px" }}
//                   /></button>
//                 <label for="btn" style={{ marginLeft: "30px" }}><h3>Donate</h3></label>
//               </Link>
//               <Link to="/donorlist">
//                 <button className='admin' name="btn"><FontAwesomeIcon
//                   icon={faBriefcaseMedical}
//                   size="5x"
//                   style={{ color: "#e9dddd", paddingTop: "20px" }}
//                 /></button>
//                 <label for="btn" style={{ marginLeft: "30px" }}><h3>Receive</h3></label>
//               </Link>
//             </div>



//             {/*---------------change profile photo----------*/}
//             {showPopup && (
//               <div className="popup-overlay" onClick={() => setShowPopup(false)}>
//                 <div className="popup-box" onClick={(e) => e.stopPropagation()}>
//                   <h3>Change Profile Photo</h3>

//                   <div className="popup-option">
//                     <FontAwesomeIcon icon={faCamera} /> Take Photo
//                   </div>

//                   <div className="popup-option">
//                     <FontAwesomeIcon icon={faImage} /> Choose from Gallery
//                   </div>

//                   <div
//                     className="popup-cancel"
//                     onClick={() => setShowPopup(false)}
//                   >
//                     Cancel
//                   </div>
//                 </div>
//               </div>
//             )}



//           </div>
//         )}

//         {showDiv == 2 && (
//           <div className='main-div2' style={{ height: "400px" }}>
//             <div>

//               <b>Edit Profile</b><div className="close" onClick={closeEditWindow}>	&#10006;</div><br></br>
//               <hr></hr>
//             </div >
//             <div className="edit" style={{ display: "inline", }}>

//               <div className="e1">
//                 <label id="l2" for="name">Name:</label><input type="url" name="name" value={user.name} />
//                 <label id="l2" for="dob">DOB:</label><input type="date" name="dob" />
//               </div>
//               <div className="e1">
//                 <label id="l2" for="number">Phone:</label><input type="number" name="number" value={user.phone} />
//                 <label id="l2" for="email">Email:</label><input type="email" name="email" value={user.email} />
//               </div>
//               <div className="e1">
//                 <label id="l2" for="city">City:</label><input type="" name="city" />
//                 <select><option selected>Select Gen</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Others</option></select>
//               </div>


//               <div class="health-box">
//                 <h3>Health Status </h3>

//                 <div className="leftDiv">
//               <div className="health-item">
//   <input
//     type="checkbox"
//     id="illness"
//     checked={user?.healthStatus?.noRecentIllness || false}
//     onChange={(e) =>
//       setUser({
//         ...user,
//         healthStatus: {
//           ...user.healthStatus,
//           noRecentIllness: e.target.checked,
//         },
//       })
//     }
//   />
//   <label htmlFor="illness">No Recent Illness</label>
// </div>

// <div className="health-item">
//   <input
//     type="checkbox"
//     id="smoker"
//     checked={user?.healthStatus?.nonSmoker || false}
//     onChange={(e) =>
//       setUser({
//         ...user,
//         healthStatus: {
//           ...user.healthStatus,
//           nonSmoker: e.target.checked,
//         },
//       })
//     }
//   />
//   <label htmlFor="smoker">Non-Smoker</label>
// </div>

// <div className="health-item">
//   <input
//     type="checkbox"
//     id="infection"
//     checked={user?.healthStatus?.noInfectiousDisease || false}
//     onChange={(e) =>
//       setUser({
//         ...user,
//         healthStatus: {
//           ...user.healthStatus,
//           noInfectiousDisease: e.target.checked,
//         },
//       })
//     }
//   />
//   <label htmlFor="infection">No Infectious Disease</label>
// </div>
//                 </div>
//                 <div className="rightDiv">
//                   <div class="">
//                     <label for="lastDonation">Last Donation Date</label>
//                     <input type="date" id="lastDonation" value={user.lastDonationDate?.split("T")[0]} />
//                   </div>
//                   <div className='btns'>
//                    <button className="btn2" onClick={saveProfile}>Save</button>
//                     <button className="btn2" onClick={handleCancel}>Cancel</button>
//                     </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/*----------------------View History---------------------------*/}

//         {showDiv == 3 && (
//           <div className='main-div2' style={{ height: "400px" }}>
//             <div>
//               <h3>View Donation History</h3><div className="close" onClick={closeEditWindow}>	&#10006;</div><br></br>

//             </div >
//             <hr></hr>
//             <div>
//               <table>
//                 <tr>
//                   <th>Donations</th>
//                   <th>Date</th>
//                   <th>Hospital</th>
//                   <th>City</th>
//                   <th>Type</th>
//                   <th>Status</th>

//                 </tr>
//                 <tr>
//                   <td>#1</td>
//                   <td>12 Feb 2026</td>
//                   <td>Apollo</td>
//                   <td>Bhubaneshwar</td>
//                   <td>Whole Blood</td>
//                   <td>✅ Completed</td>
//                 </tr>
//               </table>
//             </div>
//           </div>
//         )}
//       </body>
//     </>

//   );
// }

// export default User;

// import React, { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./SignUp.css";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser,
//   faDroplet,
//   faBriefcaseMedical,
//   faBell,
//   faCamera,
//   faImage,
//   faLocationCrosshairs,
// } from "@fortawesome/free-solid-svg-icons";

// const User = () => {

//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   // UI States
//   const [page, setPage] = useState(1);
//   const [showPopup, setShowPopup] = useState(false);
//   const [openNotification, setOpenNotification] = useState(false);

//   // User Data
//   const [user, setUser] = useState(null);
//   const [remainingDays, setRemainingDays] = useState(null);


//   // Calculate eligibility
//   const calculateDaysLeft = (date, gap = 90) => {
//     const lastDate = new Date(date);
//     lastDate.setHours(0,0,0,0);

//     const nextDonation = new Date(lastDate);
//     nextDonation.setDate(nextDonation.getDate() + gap);

//     const today = new Date();
//     today.setHours(0,0,0,0);

//     return Math.ceil(
//       (nextDonation - today) /
//       (1000 * 60 * 60 * 24)
//     );
//   };


//   // Fetch profile
//   useEffect(() => {

//     const fetchProfile = async () => {
//       try {

//         const token = localStorage.getItem("token");

//         if (!token) {
//           navigate("/login");
//           return;
//         }


//         const res = await fetch(
//           "http://localhost:50334/profile",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );


//         if (!res.ok) {
//           throw new Error("Unable to fetch profile");
//         }


//         const data = await res.json();

//         setUser(data);


//         if (data.lastDonationDate) {
//           setRemainingDays(
//             calculateDaysLeft(data.lastDonationDate)
//           );
//         }


//       } catch(error) {
//         console.error(error);
//       }
//     };


//     fetchProfile();


//     // Close notification on outside click
//     const handleOutsideClick = (event) => {

//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setOpenNotification(false);
//       }
//     };


//     document.addEventListener(
//       "mousedown",
//       handleOutsideClick
//     );


//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleOutsideClick
//       );
//     };

//   }, [navigate]);


//   if (!user) {
//     return <h2>Loading Profile...</h2>;
//   }


//   // Navigation handlers
//   const openEdit = () => {
//     setPage(2);
//   };


//   const openHistory = () => {
//     setPage(3);
//   };


//   const closeWindow = () => {
//     setPage(1);
//   };


//   const toggleNotification = () => {
//     setOpenNotification(prev => !prev);
//   };
//     return (
    
//     <div>

//       {/* ---------- Profile Dashboard ---------- */}
//       {page === 1 && (

//         <div className="main-div">

//           <div className="div1">

//             <div>
//               <h1>Hello, {user.name}!</h1>

//               <li>
//                 Blood Group: {user.bloodGrp} |
//               </li>

//               <li>
//                 Last Donation:
//                 {user.lastDonationDate?.split("T")[0]} 💚✔️ |
//               </li>

//               <br />

//               <div className="div11">

//                 {remainingDays <= 0
//                   ? "Eligible to Donate ❤️"
//                   : `Eligible in ${remainingDays} days`
//                 }

//               </div>

//             </div>



//             <center>


//               {/* Location Icon */}
//               <div>
//                 <FontAwesomeIcon
//                   icon={faLocationCrosshairs}
//                 />
//               </div>



//               {/* Notification Bell */}
//               <div ref={dropdownRef}>


//                 <div
//                   className="bell"
//                   onClick={toggleNotification}
//                 >

//                   <FontAwesomeIcon icon={faBell} />

//                   <span className="notCount">
//                     3
//                   </span>

//                 </div>



//                 {openNotification && (

//                   <div className="notification-dropdown">

//                     <div className="notification-header">
//                       Notifications
//                     </div>


//                     <div className="notification-item urgent">
//                       🩸 Urgent blood needed (A+)
//                     </div>


//                     <div className="notification-item">
//                       📅 Blood donation camp on 15 March
//                     </div>


//                     <div className="notification-item approved">
//                       ✅ Your previous donation was approved
//                     </div>


//                     <div className="notification-footer">
//                       View all notifications
//                     </div>


//                   </div>

//                 )}

//               </div>



//               {/* Profile Icon */}

//               <div className="Div12">

//                 <div
//                   className="P-icon"
//                   onClick={() => setShowPopup(true)}
//                 >

//                   <FontAwesomeIcon
//                     icon={faUser}
//                     size="9x"
//                     style={{ color: "#c2858e" }}
//                   />

//                 </div>


//                 <hr />


//                 <div className="btns">

//                   <button
//                     className="btn"
//                     onClick={openEdit}
//                   >
//                     Edit Profile
//                   </button>


//                   <button
//                     className="btn"
//                     onClick={openHistory}
//                   >
//                     View Donation History
//                   </button>


//                 </div>

//               </div>


//             </center>


//           </div>



//           {/* ---------- Action Buttons ---------- */}

//           <div className="div2">


//             <Link to="/donorregistration">

//               <button
//                 disabled={remainingDays > 0}
//                 className={
//                   remainingDays > 0
//                   ? "btn-disabled"
//                   : "btn-active"
//                 }
//               >

//                 <FontAwesomeIcon
//                   icon={faDroplet}
//                   size="4x"
//                   style={{
//                     color: "#e9dddd",
//                     paddingTop: "20px"
//                   }}
//                 />

//               </button>

//               <h3>Donate</h3>

//             </Link>



//             <Link to="/receiverregistration">

//               <button className="admin">

//                 <FontAwesomeIcon
//                   icon={faBriefcaseMedical}
//                   size="5x"
//                   style={{
//                     color: "#e9dddd",
//                     paddingTop: "20px"
//                   }}
//                 />

//               </button>

//               <h3>Receive</h3>

//             </Link>


//           </div>



//           {/* ---------- Change Profile Photo Popup ---------- */}

//           {showPopup && (

//             <div
//               className="popup-overlay"
//               onClick={() => setShowPopup(false)}
//             >

//               <div
//                 className="popup-box"
//                 onClick={(e) => e.stopPropagation()}
//               >

//                 <h3>
//                   Change Profile Photo
//                 </h3>


//                 <div className="popup-option">

//                   <FontAwesomeIcon icon={faCamera} />

//                   Take Photo

//                 </div>


//                 <div className="popup-option">

//                   <FontAwesomeIcon icon={faImage} />

//                   Choose from Gallery

//                 </div>


//                 <div
//                   className="popup-cancel"
//                   onClick={() => setShowPopup(false)}
//                 >

//                   Cancel

//                 </div>


//               </div>


//             </div>

//           )}


//         </div>

//       )}
//         {/* ================= Edit Profile ================= */}

//       {page === 2 && (
//         <div className="main-div2">

//           <div className="popup-header">
//             <h2>Edit Profile</h2>

//             <button className="close" onClick={closeWindow}>
//               ✖
//             </button>
//           </div>

//           <hr />

//           <div className="edit">

//             <div className="e1">

//               <label>Name</label>
//               <input
//                 type="text"
//                 value={user.name}
//                 readOnly
//               />

//               <label>Phone</label>
//               <input
//                 type="text"
//                 value={user.phone || ""}
//                 readOnly
//               />

//             </div>


//             <div className="e1">

//               <label>Email</label>
//               <input
//                 type="email"
//                 value={user.email}
//                 readOnly
//               />

//               <label>Blood Group</label>
//               <input
//                 type="text"
//                 value={user.bloodGrp}
//                 readOnly
//               />

//             </div>


//             <div className="health-box">

//               <h3>Health Status</h3>


//               <div className="health-item">

//                 <input
//                   type="checkbox"
//                   checked={user.healthStatus?.noRecentIllness}
//                   readOnly
//                 />

//                 <label>No Recent Illness</label>

//               </div>


//               <div className="health-item">

//                 <input
//                   type="checkbox"
//                   checked={user.healthStatus?.nonSmoker}
//                   readOnly
//                 />

//                 <label>Non Smoker</label>

//               </div>


//               <div className="health-item">

//                 <input
//                   type="checkbox"
//                   checked={user.healthStatus?.noInfectiousDisease}
//                   readOnly
//                 />

//                 <label>No Infectious Disease</label>

//               </div>


//               <label>Last Donation Date</label>

//               <input
//                 type="date"
//                 value={
//                   user.lastDonationDate?.split("T")[0] || ""
//                 }
//                 readOnly
//               />


//               <div className="btns">

//                 <button className="btn2" onClick={closeWindow}>
//                   Close
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>
//       )}



//       {/* ================= Donation History ================= */}

//       {page === 3 && (

//         <div className="main-div2">

//           <div className="popup-header">

//             <h2>Donation History</h2>

//             <button
//               className="close"
//               onClick={closeWindow}
//             >
//               ✖
//             </button>

//           </div>


//           <hr />


//           <table className="history-table">

//             <thead>

//               <tr>
//                 <th>No.</th>
//                 <th>Date</th>
//                 <th>Hospital</th>
//                 <th>City</th>
//                 <th>Type</th>
//                 <th>Status</th>
//               </tr>

//             </thead>


//             <tbody>

//               <tr>
//                 <td>1</td>
//                 <td>12 Feb 2026</td>
//                 <td>Apollo Hospital</td>
//                 <td>Bhubaneswar</td>
//                 <td>Whole Blood</td>
//                 <td>✔ Completed</td>
//               </tr>


//               <tr>
//                 <td>2</td>
//                 <td>04 Sep 2025</td>
//                 <td>AIIMS</td>
//                 <td>Delhi</td>
//                 <td>Platelets</td>
//                 <td>✔ Completed</td>
//               </tr>


//             </tbody>

//           </table>

//         </div>

//       )}

//     </div>
//   )
// };


// export default User;