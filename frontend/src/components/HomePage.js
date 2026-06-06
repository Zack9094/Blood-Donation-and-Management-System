import React,{useEffect,useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { faHospitalUser } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import "./SignUp.css";
import DL from "./DonorList";
import SL from './StokeBloodList';
import IN from "./Inventory";
import BR from'./BloodRecord';
import RI from './donorInfo';
import HS from './hospitals';
import AHS from './AddHospitals';
const Homepage=()=>{
const [donorlist,setDonorlist]=useState({})
const [showDiv,setShowDiv]=useState(null)
const [showDiv2,setShowDiv2]=useState(true)
const [showDiv3,setShowDiv3]=useState(2)
const [showInventoryForm, setShowInventoryForm] = useState(false);
         const navigate=useNavigate();
//  const ShowDiv=()=>{
//     setShowDiv[](True)
//  }

 const close=()=>{
     
       setShowDiv3(2);
  }

  const openDiv3=()=>{
    setShowDiv3(3);
  }
     useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token){
            navigate("/login");
            return;
        }
        getDonorlist()
     },[])
 const getDonorlist=async ()=>{
        const token=localStorage.getItem("token");
        const res=await fetch("http://localhost:50333/donorlist",{
            headers:{
                Authorization: `Bearer ${token}` 
            },
        });
        console.log("Status:", res.status);
console.log("Status text:", res.statusText);
      if (!res.ok) {
    throw new Error("Server error");
}

        const result = await res.json();
        setDonorlist(result)
      
    }

return(
<div className='homepage'>

    <div className='left'>
        <Link onClick={()=>setShowDiv(1)}><div className='left-div'> 
            <h2><FontAwesomeIcon icon={faWarehouse}/>
             Inventory</h2></div>
            </Link>
        <Link onClick={()=>setShowDiv(2)}><div className='left-div'>
            <h2><FontAwesomeIcon icon={faHospitalUser} />
             donor</h2></div>
            </Link> 
        <Link onClick={()=>setShowDiv(3)}><div className='left-div'>
            <h2><FontAwesomeIcon icon={faHospital}  />
             Hospitals</h2> </div>
            </Link> 
   </div>

   <div className='right'>
    {/* { showDiv===1 &&
    <div>
    <a href="/donorregistration">
    <div className='inv'>+inventory</div>
    </a>
    <div>{<SL/>}</div>  
</div>} */}

 {showDiv===1 &&(
    <div >
   <Link onClick={() => {setShowInventoryForm(true)
                        setShowDiv2(false)}}><div className='inv' >
                            <FontAwesomeIcon icon={faWarehouse} />+inventory</div>
                            </Link> 
    {showInventoryForm && (<IN setShowForm={setShowInventoryForm} 
                               setShowdiv2={setShowDiv2}/>
     )}
         { showDiv2 &&(
            <div className='indiv'> <BR /></div>)}
           

          </div>
        )}

{ showDiv===2 &&
    <div >
    
    <div className='inv'>
        <FontAwesomeIcon icon={faHospitalUser} />
        +Donor Information
        </div>
   
    <div className='indiv'>{<RI/>}</div>
</div>}

{ showDiv===3 &&
    <div >
   <Link onClick={openDiv3} >
    <div className='inv'>
        <FontAwesomeIcon icon={faHospital}  />
        +Add Hospitals</div>
     </Link>
    {showDiv3===3 &&  <div className='indiv'>
        <div className="close" onClick={close}>	&#10006;</div>
        {<AHS/>}
        </div>    }
  {showDiv3===2 && <div className='indiv'>{<HS/>}</div>  }
</div>}
   </div>
   
</div>
);
}
export default Homepage;



 {/* <div >
            <a href='http://localhost:3000/signup'>SignUp</a>
        </div>
        
    <div>
        <a href='http://localhost:3000/donorregistration'>Donor Registration</a>
    </div>
    
    <div>
        <a href='http://localhost:3000/donorlist'>Donors divst</a>
    </div>
        
    <div>
         <a href='http://localhost:3000/exchangeblooddivst'>Exchange Blood</a>
    </div>
       
    <div>
         <a href='http://localhost:3000/outstokeblooddivst'>Out-Stoke Blood divst</a>
    </div>
    
    <div>
        <a href='http://localhost:3000/stokeblooddivst'>Stoke Blood divst</a>
    
    </div>
        
    <div>
        <a href='http://localhost:3000/ngoinfo'>NGO Info</a>
    </div> */}
  