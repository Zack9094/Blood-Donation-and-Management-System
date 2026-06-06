import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  const auth = localStorage.getItem("user");
  if (auth) {
    navigate("/signup");
  }
}, [navigate]);


   const collectData = async () => {
  try {
    console.log(name, email, password);

    const response = await fetch("http://localhost:50333/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
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

    <div className="signup-container">
      <div className="signup-card">
       <center>

        <table>
           <tr>
              <td>Username</td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Username"
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
            </tr>

             <tr>
              <td>Email</td>
              <td>
                <input
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Password</td>
              <td>
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2">

                <a href='/login'>Already Registered?</a>
                <input
                  type="button"
                  value="Sign Up"
                  onClick={collectData}
                />
              </td>
            </tr>
         
        </table>
        </center>
      </div>
    </div>

    
  );
};

export default SignUp;
















// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// const SignUp = () => {
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const navigate = useNavigate();

//     useEffect(()=>{
//         const auth= localStorage.getItem('user');
//         if(auth)
//         {
//             navigate('/')
//         }
//     })

//     const collectData = async () => {
//         console.warn(name, email, password)
//         let result = await fetch('http://localhost:3050/register', {
//             method: 'post',
//             body: JSON.stringify({ name,email, password  }),
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })
//         result = await result.json()
//         console.warn(result);
//        localStorage.setItem("user",JSON.stringify(result.result));
//        localStorage.setItem("token",JSON.stringify(result.auth));
       
//             navigate('/')
    
//     }
//     return (
//         <div className='register'>
//             <h1>Register</h1>
//             <input className='inputBox' type="text"
//                 value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
//             <input className='inputBox' type="text"
//                 value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
//             <input className='inputBox' type="password"
//                 value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
//             <button onClick={collectData} className='appButton' type='button'>Sign Up</button>
//         </div>
// )
// }

// export default SignUp;

// // import { json } from "express";
// import React ,{useEffect,useState} from "react";
// import { useNavigate } from 'react-router-dom'
// const SignUp=()=>{
//     const [name,setName]=useState("");
//     const [password,setPassword]=useState("");
//     const navigate=useNavigate();


// useEffect(()=>{
//     const auth=localStorage.getItem('user');
//     if(auth){
//         navigate('/');
//     }
// },
// [])

// const collectData=async() =>{
//   console.warn(name,password);
//   let result= await fetch("https://localhost:50333/SignUp",{
//     method:'post',
//     body: JSON.stringify({name,password}),
//     headers:{
//         'Content-Type':'application/json'
//     }
//   })

//   result=await result.json();
//   console.warn(result);
//   localStorage.setItem("user",JSON.stringify(result.result))
//   navigate('/');

// }

// return(
//   <div>
//      <table align="center">
//             <tr>
//               <td width="200px" height="70px"><b>Enter Username</b></td>
//               <td width="200px" height="70px"> 
//                 <input type="text" name="un" placeholder="Enter Username"  onChange={(e) => setName(e.target.value)}></input>
//               </td>
//             </tr>
//             <tr>
//               <td width="200px" height="70px"><b>Enter Password</b></td>
//               <td width="200px" height="70px"> 
//                 <input type="text" name="un" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} ></input>
//               </td>
//             </tr>
//             <tr>
//               <td width="200px" height="70px"> 
//                 <input id="button" type="submit" name="sub" value="Login" onClick={collectData}  ></input>
//               </td>
//             </tr>
//           </table>
//           </div>
// )
// }
// export default SignUp