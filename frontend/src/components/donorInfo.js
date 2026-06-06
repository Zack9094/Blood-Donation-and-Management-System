import React, { useEffect, useState } from 'react';
import './DR.css';
import DP from './reqInfo';

const DonorInfo = () => {

  const [cand, setCand] = useState([]);      // Requests
  const [cand1, setCand1] = useState([]);   // Donations

  const [showRequests, setShowRequests] = useState(true);
  const [showDonations, setShowDonations] = useState(false);
  const [showMain, setShowMain] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getRequests();
    getDonations();
  }, []);

  // 🩸 GET REQUESTS
  const getRequests = async () => {
    const token=localStorage.getItem("token")
    try {
      const res = await fetch("http://localhost:50333/request", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = await res.json();
      setCand(result);

    } catch (err) {
      console.error(err);
    }
  };

  // ❤️ GET DONATIONS
  const getDonations = async () => {
   
    try {
       const token=localStorage.getItem("token")
      const res = await fetch("http://localhost:50333/donorlist", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = await res.json();
      setCand1(result);

    } catch (err) {
      console.error(err);
    }
  };

  const showReq = () => {
    setShowRequests(true);
    setShowDonations(false);
  };

  const showDon = () => {
    setShowRequests(false);
    setShowDonations(true);
  };

  const openProfile = (id) => {
    setSelectedId(id);
    setShowMain(false);
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
    setShowMain(true);
  };

  return (
    <>
      {/* PROFILE SLIDE */}
      {showProfile && (
        <div className="overlay">
          <div className="closeBtn" onClick={closeProfile}>✖</div>
          <DP id={selectedId} />
        </div>
      )}

      {showMain && (
        <div className='mdiv'>

          {/* HEADER */}
          <div className='hed'>
            <div id='reqdon' onClick={showReq}>
              Requests ({cand.length})
            </div>

            <div id='reqdon' onClick={showDon}>
              Donations ({cand1.length})
            </div>
          </div>

          <div className='inndiv'>

            {/* ================= REQUESTS ================= */}
            {showRequests && (
              cand.length > 0 ? (
                cand.map((item) => (
                  <div className='requests' key={item._id}>

                    <div className='img'>
                      <div className="blood-icon-20">
                        <span>{item.bloodGrp}</span>
                      </div>
                      <p className='unit'>{item.unitReq} Units</p>
                    </div>

                    <div className='info'>
                      <p id='h'>{item.name}</p>
                      <p>{item.reqDate}</p>
                      <p>📍 {item.addrs}</p>
                    </div>

                    <div className='view'>
                      <div onClick={() => openProfile(item._id)}>
                        View
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                <div>No Requests Found</div>
              )
            )}

            {/* ================= DONATIONS ================= */}
            {showDonations && (
              cand1.length > 0 ? (
                cand1.map((item) => (
                  <div className='requests' key={item._id}>

                    <div className='img'>
                      <div className="blood-icon-20">
                        <span>{item.bloodGrp}</span>
                      </div>
                      <p className='unit'>1 unit</p>
                    </div>

                    <div className='info'>
                      <p id='h'>{item.name}</p>
                      <p>{new Date().toLocaleDateString()}</p>
                      <p>📍 {item.addrs}</p>
                      <p style={{ color: "green" }}>
                        ✔ Successfully Donated
                      </p>
                    </div>

                    <div className='view'>
                      <div onClick={() => openProfile(item._id)}>
                        View
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                <div>No Donations Found</div>
              )
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default DonorInfo;
// import React, { useEffect, useState } from 'react';
// import {useNavigate } from 'react-router-dom'
// import './DR.css'
// import DP from './reqInfo'
// const DonorInfo = () => {

//   const [cand, setCand] = useState([]);
//   const [showDiv1, setShowDiv1] = useState(true);
//   const [showDiv2, setShowDiv2] = useState(false);
//   const [showDiv3, setShowDiv3] = useState(false);
//   const [showDiv, setShowDiv] = useState(true);
//   const [selectedId, setSelectedId] = useState(null);
//   const navigate = useNavigate();
  
//   useEffect((c) => {
//     getCand();

//   }, []);

//   const div1 = () => {
//     setShowDiv2(false);
//     setShowDiv1(true);
//   }
  
//   const div2 = () => {
//     setShowDiv1(false);
//     setShowDiv2(true);
//   }
//   const profile=()=>{
//      setShowDiv(false);
//       setShowDiv3(true);
      
//   }
//   const close1=()=>{
//     setShowDiv3(false);
//      setShowDiv(true);
//   }

//   const getCand = async () => {
//     try {
//       const res = await fetch("http://localhost:50333/donorlist", {
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
//       console.error(err);
//     }
//   };

//   return (
// <>
// {showDiv3 && ( 
    
//      <div >
//       <div className="close" onClick={close1}>	&#10006;</div>
//      <DP/>
//     </div>)}

//      {showDiv &&(

      
//     <div className='mdiv' >
   

      
//       <table className='donInfo'>
       
//         <tr >
//           <div className='hed'>
//           <div id='reqdon' onClick={div1}>Requests({cand.length})</div><div id='reqdon' onClick={div2}>Donations</div>
//           </div>
//         </tr>
      
// <div className='inndiv'>
//         <tr>
          
//             {cand.length > 0 ? (
//               cand.map((item, idx) => (

//                 (showDiv1  && <div className='requests'>
//                   <div className='img'><div class="blood-icon-20"> <span>{item.bloodGrp}</span></div>
//                     <p className='unit'>3 Unit</p>
//                   </div>
//                   <div className='info'>
//                     <p id='h'>{item.name}</p>
//                     <p>Date.now</p>
//                     <p>📍{item.addrs}</p>
//                   </div>
//                  <td className='view'><div onClick={profile(item._id)} >View</div></td>
//                 </div>)

//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" style={{ textAlign: "center" }}>
//                   No Result Found
//                 </td>
//               </tr>
//             )}
//             <div>
//             </div>
         

    



//             {cand.length > 0 ? (
//               cand.map((item, idx) => (

//                 (showDiv2  && <div className='requests'>
//                   <div className='img'><div class="blood-icon-20"> <span>{item.bloodGrp}</span></div>
//                     <p className='unit'>3 Unit</p>
//                   </div>
//                   <div className='info'>
//                     <p id='h'>{item.name}</p>
//                     <p>Date.now</p>
//                     <p>📍{item.addrs}</p>
//                   </div>
//                  <td className='view'><div onClick={profile}>View</div></td>
//                 </div>)

//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" style={{ textAlign: "center" }}>
//                   No Result Found
//                 </td>
//               </tr>
//             )}
//             <div>
//             </div>
         




//         </tr>
//         </div>
//       </table>
//     </div>)}

//   </>
//   );
// };

// export default DonorInfo;
