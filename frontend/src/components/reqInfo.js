// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ReqInfo.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faUser,
//   faPhone,
//   faEnvelope
// } from '@fortawesome/free-solid-svg-icons';

// const ReqInfo = () => {

//   const id = localStorage.getItem("selectedId");
//   const navigate = useNavigate();

//   const [cand, setCand] = useState(null);

//   useEffect(() => {
//     if (id) {
//       getCand();
//     }
//   }, [id]);

//   const getCand = async () => {
//     try {
//       const res = await fetch(`http://localhost:50333/donor/699611962ae6c4669f4ae53b`, {
//         headers: {
//           authorization: JSON.parse(localStorage.getItem('token'))
//         }
//       });

//       if (!res.ok) {
//         throw new Error("Server Error");
//       }

//       const result = await res.json();
//       setCand(result);

//     } catch (err) {
//       console.error("Fetch Error:", err);
//     }
//   };

//   if (!cand) {
//     return <div>Loading donor information...</div>;
//   }

//   return (
//     <div className='D1'>

//       {/* LEFT PROFILE SECTION */}
//       <div className='d1'>
//         <div className="profile-icon">
//           <FontAwesomeIcon icon={faUser} size="9x" style={{ color: "#c2858e" }} />
//         </div>

//         <div className='d11'>
//           <ul>
//             <li><strong>Name:</strong> {cand.name}</li><hr />
//             <li><strong>Gender:</strong> {cand.gen}</li><hr />
//             <li><strong>Age:</strong> {cand.age}</li><hr />
//             <li><strong>Blood Type:</strong> {cand.bloodGrp}</li><hr />
//             <li><strong>Last Donation:</strong> 4 Months Ago</li>
//           </ul>
//         </div>

//         <div className='d12'>
//           <div>
//             <FontAwesomeIcon icon={faPhone} style={{ color: "#f1a7b3" }} />
//             &nbsp;+91 {cand.mobno}
//           </div>

//           <div>
//             <FontAwesomeIcon icon={faEnvelope} style={{ color: "#f1a7b3" }} />
//             &nbsp;{cand.email}
//           </div>
//         </div>
//       </div>

//       {/* RIGHT REQUEST SECTION */}
//       <div className='D2'>

//         <div className='header'>
//           <b>Blood Donor Request Profile</b>
//           <br />
//           Review & Approval
//         </div>

//         <ul className='reqDetails'>
//           <div className='main'>Request Details</div>

//           <li><strong>Patient Name:</strong> {cand.name}</li><hr />
//           <li><strong>Hospital:</strong> City Central Hospital</li><hr />
//           <li><strong>Location:</strong> {cand.addrs}</li><hr />
//           <li><strong>Blood Needed:</strong> 2 Units</li><hr />
//           <li><strong>Reason:</strong> Surgery - Urgent</li><hr />
//           <li><strong>Request Date:</strong> April 15, 2024</li><hr />
//           <li><strong>Additional Note:</strong> Immediate need for O+ donor.</li>
//         </ul>

//         <div className='bottomSections'>

//           {/* HEALTH STATUS */}
//           <div className='d21'>
//             <ul className='reqDetails'>
//               <div className='main'>Health Status</div>
//               <li>No Recent Illness ✅</li><hr />
//               <li>Non-Smoker ✅</li><hr />
//               <li>No Infectious Disease ✅</li>
//             </ul>
//           </div>

//           {/* DONATION HISTORY */}
//           <div className='d22'>
//             <ul className='reqDetails'>
//               <div className='main'>Donation History</div>
//               <li>Previous Donations: 3</li><hr />
//               <li>Last Donation: 4 Months Ago</li><hr />
//               <li>Eligibility: Eligible to Donate ✅</li>
//             </ul>
//           </div>

//         </div>

//         {/* ACTION BUTTONS */}
//         <div className='D3'>
//           <button className='approve'>✔ Approve Request</button>
//           <button className='reject'>✖ Reject Request</button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ReqInfo;


import React, { useEffect, useState } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import './ReqInfo.css'
import DI from './donorInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { 
  faHospital, 
  faPhone, 
  faLocationDot, 
  faCalendarDays 
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'



const ReqInfo = (showDiv,showDiv3) => {

  const id = localStorage.getItem("selectedId");
  console.log("IDt:",id);
  const [cand, setCand] = useState([]);
  const navigate = useNavigate();
  console.warn()
//  useEffect(() => {
//   if (id) {
//     getCand();
//   }
// }, [id]);
useEffect(() => {
    getCand();
}, []);



  
  
  const getCand = async () => {
    try {
      
      const res = await fetch(`http://localhost:50333/request/69a1d4bb33729ec801de90a3`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem('token'))
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

  return (<>
   

    <div className='D1'>
       
     <div className='d1'>
      <div class="profile-icon">
        <FontAwesomeIcon icon={faUser} size="9x" style={{ color: "#c2858e" }} />
      </div>
      <br></br>
      <div className='d11'>
          <ul><li>Name: {cand.name}</li><hr></hr>
            <li>Gender: {cand.age}</li><hr></hr>
            <li>BloodType: {cand.bloodGrp}</li><hr></hr>
             <li>Request Dtae: April 15,2024</li><hr></hr>
            <li>Last Donation: 4 Months Ago</li>
        </ul></div><hr></hr>
        <div className='d12'>
         <div><FontAwesomeIcon icon={faPhone} size="1x" style={{ color: "#f1a7b3" }}/>+91 {cand.mobno}</div>
         <div><FontAwesomeIcon icon={faEnvelope} style={{ color: "#f1a7b3" }} /> {cand.email}</div>
        </div>
        </div>
     
     <div className='D2'>
         <center>
            <div className='header'>
        <b>Blood Donor Request Profile</b><br></br>
         Review & Approval
          
         </div>

         </center>

        <ul className='reqDetails'>
        <div className='main'>Request Details</div>
        <li>Patient Name: {cand.name}</li><hr></hr>
        <li>Hospital: City Central hospital</li><hr></hr>
        <li>Location: {cand.addrs}</li><hr></hr>
        <li>Blood Needed: 2 units</li><hr></hr>
        <li>Reason: Surgery-Urgent</li><hr></hr>
        <li>Request Dtae: April 15,2024</li><hr></hr>
        <li>Additinal Note: Immediate need for O+ donor.</li>
        </ul>
        <div>

            <div className='d21'>  <ul className='reqDetails'>
        <div className='main'>Heath Status</div>
        <div>Reported as Healthy</div><hr></hr>
        <li>No Recent illness    ✅</li><hr></hr>
        <li>Non-Smoker           ✅</li><hr></hr>
        <li>No Infection Disease ✅</li>
        </ul></div>


          <div className='d22'>  <ul className='reqDetails'>
        <div className='main'>Donation History</div>
        <div>Previous Donations: 3</div><hr></hr>
        <li>Last Donation: 4 Months Ago</li><hr></hr>
        <li>Eligibility: Eligible to Donate</li><hr></hr>
        <li>No Infection Disease</li>
        </ul></div>
        </div>

        <div className='D3'><button className='aprove'>✔Approve Request</button>
     <button className='reject'>✖Reject Request</button></div>
     </div>
     
    </div>
    </>
  );
};

export default ReqInfo;