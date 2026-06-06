import react, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const DonorRegister= ()=>{
    const [name,setName]=useState("");
    const [addrs,setAddress]=useState("");
    const [age,setAge]=useState("");
    const [gen,setGen]=useState("");
    const [email,setEmail]=useState("");
    const [fname,setFName]=useState("");
    const [mname,setMName]=useState("");
    const [bloodGrp,setBloodGrp]=useState("");
    const [city,setCity]=useState("");
    const [mobno,setMobNo]=useState("");
    const navigate=useNavigate();
    
    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth){
            navigate('/');
        } 
    },[navigate])
    

   const collectData = async () => {
  try {
    console.log(name,addrs,age,gen,email,fname,mname,bloodGrp,city,mobno);

    const response = await fetch("http://localhost:50333/donorRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name,addrs,age,gen,email,fname,mname,bloodGrp,city,mobno }),
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const result = await response.json();
    console.log(result);

    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));

    navigate("/");
  } catch (error) {
    console.error("Error:", error);
    alert("Registration failed. Check backend & console.");
  }
};

  return (
    <div className="form-container">
      <div className="form-card">
        <h3>Donor's Registration Form</h3>


        <form action='#' method="post">
            <label>Full Name</label>
            <input
                  type="text"
                  placeholder="Enter Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
             <label>Enter Address</label>
            <input
                  type="text"
                  placeholder="Enter Full Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
            <label>Enter Age</label>
            <input
                  type="text"
                  placeholder="Enter Age"
                  onChange={(e) => setAge(e.target.value)}
                /> 
            <label>Select gender</label>    
             <select name="gender" required>
                <option value=""  onChange={(e) => setGen(e.target.value)}>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>others</option>
            </select>    
           
            <label>Enter City</label>
            <input
                  type="text"
                  placeholder="Enter City"
                  onChange={(e) => setCity(e.target.value)}
                /> 
            <label>Enter Father's Name</label>
            <input
                  type="text"
                  placeholder="Enter Father's Name"
                  onChange={(e) => setFName(e.target.value)}
                />
            <label>Enter Mother's Name</label>
            <input
                  type="text"
                  placeholder="Enter Mother's Name"
                  onChange={(e) => setMName(e.target.value)}
                /> 
            <label>Select Blood Group</label>
            <select name="blood_group" required>
                <option value=""  onChange={(e) => setBloodGrp(e.target.value)}>Select</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
            </select>
              <label>Enter E-Mail</label>
            <input
                  type="text"
                  placeholder="Enter E-Mail"
                  onChange={(e) => setEmail(e.target.value)}
                /> 
            <label>Enter Mobile No</label>
            <input
                  type="text"
                  placeholder="Enter Mobile No"
                  onChange={(e) => setMobNo(e.target.value)}
                /> 
                <button type="submit" onClick={collectData}
                />    
        </form>
       
      </div>
    </div>
  );
};

export default DonorRegister;


