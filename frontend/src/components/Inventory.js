
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./inv.css";

const Invent = ({ setShowForm, setShowdiv2 }) => {
  const [bloodGrp, setBloodGrp] = useState("");
  const [inventoryType, setInventoryType] = useState("in");
  const [Qty, setQty] = useState("");
  const [email, setEmail] = useState("");
  const [item, setItem] = useState([]);
  const navigate = useNavigate();

  // ---------------- CANCEL ----------------
  const cancelData = () => {
    setBloodGrp("");
    setQty("");
    setEmail("");
    setInventoryType("in");
    
    
  };
   //-----------------CLOSE---------------------------------------------
  const close=()=>{
     setBloodGrp("");
    setQty("");
    setEmail("");
    setInventoryType("in");
       setShowForm(false);
       setShowdiv2(true);
  }
   // ---------------- FETCH STOCK ----------------
  const stock = async () => {
    try {
      const token=localStorage.getItem("token")
      const res = await fetch("http://localhost:50333/bloodstock", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      const data = await res.json();
      setItem(data);
    } catch (err) {
      console.error("Stock fetch error:", err);
    }
  };

  // ---------------- CHECK INPUT ----------------
  const checkInput = (value) => {
    if (item.length > 0 && bloodGrp) {
      const available = item[0][bloodGrp];

      if (value > available) {
        alert(`Only ${available} ml available`);
        setQty("");
      }
    }
  };

  // ---------------- SUBMIT ----------------
  const collectData = async (e) => {
    e.preventDefault();
console.log(bloodGrp, inventoryType, Qty, email);
    try {
      const response = await fetch(
        "http://localhost:50333/addInventory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bloodGrp,
            inventoryType,
            Qty,
            email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const result = await response.json();

      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));

      cancelData();
    } catch (error) {
      console.error("Error:", error);
      alert("Operation failed. Check backend.");
    }
  };

  return (
    <div className="form-container1">
      <div className="form-card1">
        <div className="container3">
          <form onSubmit={collectData}>
            <div className="div2" style={{marginTop:"0%"}}>
              <div>Manage Blood Record</div>

              <div className="rdobtn">
                <label>
                  <input
                    type="radio"
                    value="in"
                    name="intType"
                    checked={inventoryType === "in"}
                    onChange={(e) =>
                      setInventoryType(e.target.value)
                    }
                  />
                  IN
                </label>

                <label>
                  <input
                    type="radio"
                    value="out"
                    name="intType"
                    checked={inventoryType === "out"}
                    onChange={(e) =>
                      setInventoryType(e.target.value)
                    }
                  />
                  OUT
                </label>
                <div className="close" onClick={close}>	&#10006;</div>
              </div>
              
            </div>

            <hr />

            {/* ---------------- IN FORM ---------------- */}
            {inventoryType === "in" && (
              <div className="d11" style={{marginTop:"0%"}}>
                <label>Blood Type</label>
                <select
                  value={bloodGrp}
                  onChange={(e) =>
                    setBloodGrp(e.target.value)
                  }
                  required
                >
                  <option value="">Select</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>

                <label>Qty (ML)</label>
                <input
                  type="number"
                  value={Qty}
                  min="1"
                  onChange={(e) =>
                    setQty(e.target.value)
                  }
                  required
                />

                <label>Donor Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

                <div className="cs">
                  <button
                    type="button"
                    onClick={cancelData}
                  >
                    Cancel
                  </button>

                  <button type="submit">
                    Submit
                  </button>
                </div>
              </div>
            )}

            {/* ---------------- OUT FORM ---------------- */}
            {inventoryType === "out" && (
              <div className="d11" style={{marginTop:"0%"}}>
                <label>Blood Type</label>
                <select
                  value={bloodGrp}
                  onChange={(e) =>
                    setBloodGrp(e.target.value)
                  }
                  required
                >
                  <option value="">Select</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>

                <label>Qty (ML)</label>
                <input
                  type="number"
                  value={Qty}
                  min="1"
                  onFocus={stock}
                  max={
                    item.length > 0 && bloodGrp
                      ? item[0][bloodGrp]
                      : undefined
                  }
                  onChange={(e) => {
                    setQty(e.target.value);
                    checkInput(e.target.value);
                  }}
                  required
                />

                <label>Hospital Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

                <div className="cs">
                  <button
                    type="button"
                    onClick={cancelData}
                  >
                    Cancel
                  </button>

                  <button type="submit">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Invent;

// import react, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './DR.css'

// const Invent = ({ setShowForm,setShowdiv2 }) => {

//     const [bloodGrp, setBloodGrp] = useState("");
//     const [inventoryType, setInventoryType] = useState("in");
//     const [Qty, setQty] = useState("");
//     const [email, setEmail] = useState("");
//     //const [showDiv,setShowDiv]=useState(1)
//     const [item, setItem] = useState([])
//     const navigate = useNavigate();
//     const [shutDiv,setShutDiv]=useState(true);

    
//     // useEffect(()=>{
//     //     const auth=localStorage.getItem("user");
//     //     if(auth){
//     //         navigate('/donorregistration');
//     //     } 
//     // },[navigate])
//   const cancelData = () => {
//     setBloodGrp("");
//     setQty("");
//     setEmail("");
//     setInventoryType("");
//     // setShowForm(false);
//     // setShowdiv2(true);

    
// };
  
// const stock=async ()=>{
//      const res=await fetch("http://localhost:50333/bloodstock",{
//             method:"get",
//             headers:{
//                 authorization:JSON.parse(localStorage.getItem('token'))
//             }
//            })
//            const c=await res.json()
           
//            setItem(c)
//            console.warn(c[0]["B-"])
//             const count={...item}
//             console.warn(item[0])
//             console.warn("jii")
// }


// function checkInput(){
//     let val=document.getElementById("qty").value;
//     if(val>item[0][bloodGrp]){
//         alert("Only"+item[0][bloodGrp]+"ml available")
//     }
// }
//     const collectData = async (e) => {
//         e.preventDefault();

//         try {
//             console.log(bloodGrp, inventoryType, Qty, email);

//             const response = await fetch("http://localhost:50333/addInventory", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ bloodGrp, inventoryType,Qty, email }),
//             });
          
//             if (!response.ok) {
//                 throw new Error("Server error");
//             }
//            cancelData();
//             const result = await response.json();
//             console.log(result);

//             localStorage.setItem("user", JSON.stringify(result.result));
//             localStorage.setItem("token", JSON.stringify(result.auth));


           
//         } 
        
//         catch (error) {
//             console.error("Error:", error);
//             alert("Registration failed. Check backend & console.");
//         }

       
//     };

//     return (
//         <div className="form-container1">
//             <div className="form-card1">
//                 <div class="container1">
                   
//                     <form onSubmit={collectData}>
//                    <div className='div2'>
//   <div>Manage Blood Record</div>

  
//  <div className='rdobtn'>
//   <label>
//     <input
//       className="intType"
      
//       type="radio"
//       value="in"
//       name="intType"
//       checked={inventoryType==="in"}
//       defaultChecked
//       onChange={(e) => {setInventoryType(e.target.value)
//                        }
//       }
//     /> IN&nbsp;&nbsp;
//   </label>

//   <label>
//     <input
//       className="intType"
//       type="radio"
//       value="out"
//       checked={inventoryType==="out"}
//       name="intType"
//       onChange={(e) =>{setInventoryType(e.target.value)
                      
//                        }}
//     /> OUT
//   </label>
//   </div>
// </div>

//  <hr></hr>
                    
//                     {inventoryType === "in"&&    <div className='d11'>
//                             <label>Blood_Type</label>
//                             <select name="blood_group" onChange={(e) => setBloodGrp(e.target.value)} required>
//                                 <option value=""  >Select</option>
//                                 <option>A+</option><option>A-</option>
//                                 <option>B+</option><option>B-</option>
//                                 <option>AB+</option><option>AB-</option>
//                                 <option>O+</option><option>O-</option>
//                             </select>

//                             <label>Qty(ML)</label>
//                             <input
//                                 type="number"
                              
//                                 onChange={(e) => setQty(e.target.value)}
//                                 min="1"
//                                 required
//                             />

//                             <label>Donor_Email</label>
//                             <input
//                                 type="text"
//                                 placeholder=""
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                             <div className='cs'>
//                             <button className='cs1' type="button" value="Cancel" onClick={cancelData}
//                             >Cancel</button>&nbsp;&nbsp;&nbsp;  
//                             <button className='cs1' type="submit" value="Submit" >Submit</button>

                            
//                                      </div>

//                            </div>}


//                             {inventoryType === "out" &&    <div className='d11'>
//                             <label>Blood_Type</label>
//                             <select name="blood_group" onChange={(e) => setBloodGrp(e.target.value)} required>
//                                 <option value=""  >Select</option>
//                                 <option>A+</option><option>A-</option>
//                                 <option>B+</option><option>B-</option>
//                                 <option>AB+</option><option>AB-</option>
//                                 <option>O+</option><option>O-</option>
//                             </select>

//                             <label>Qty(ML)</label>
//                             <input
//                                 id="qty"
//                                 type="number"
//                                 onClick={stock}
//                                  min={1}
//                                 max={item[0][bloodGrp]}
//                                 onChange={(e) => {  checkInput()
//                                                     setQty(e.target.value)}}
                             
//                                 required
//                             />

//                             <label>Hospital_Email</label>
//                             <input
                            
//                                 type="text"
//                                 placeholder=""
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                             <div className='cs'>
//                             <button className='cs1' type="button" value="Cancel" onClick={cancelData}
//                             >Cancel</button>&nbsp;&nbsp;&nbsp;  
//                             <button className='cs1' type="submit" value="Submit" >Submit</button>

                            
//                                      </div>

//                            </div>}
//                     </form>
//                 </div>
                
//             </div>
//         </div>
//     );
// };

// export default Invent;
