import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DR.css'
const DonorList = () => {

  const [cand, setCand] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCand();
  }, []);

  const getCand = async () => {
    try {
      const token=localStorage.getItem("token");
      const res = await fetch("http://localhost:50333/donorlist", {

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
    <div className='list'>
      
      <table className='t1'>
        <thead>
          <tr><td colSpan={6}>
          <div className='srch'>
          <input 
            className='search'
             type="text"
             placeholder='Search by name'
             /><button className='searchbtn'>OK</button>
          </div>
          </td>

          <td colSpan={4}>
          <div className='srch2'>
          <button className='fltr'> + Add Filter </button>
          </div>
          </td>

          </tr>
          <tr>
            <th>Donor's Name</th>
            <th>Address</th>
            <th>Age</th>
            <th>Gender</th>
            <th>City</th>
            <th>Father Name</th>
            <th>Mother Name</th>
            <th>Blood Group</th>
            <th>Email</th>
            <th>Mobile No</th>
          </tr>
        </thead>

        <tbody>
          {cand.length > 0 ? (
            cand.map((item, idx) => (
              <tr key={item._id || idx}>
                <td>{item.name}</td>
                <td>{item.addrs}</td>
                <td>{item.age}</td>
                <td>{item.gen}</td>
                <td>{item.city}</td>
                <td>{item.fname}</td>
                <td>{item.mname}</td>
                <td>{item.bloodGrp}</td>
                <td>{item.email}</td>
                <td>{item.mobno}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No Result Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonorList;

// import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';

// const ProductList =()=>{
//     const [products, setProducts] = useState([])
   
//     useEffect(()=>{
//         getProducts();
//     }, []);

//     const getProducts = async ()=>{
//         let result = await fetch('http://localhost:3050/products',{
//             headers:{
//                 authorization: JSON.parse(localStorage.getItem('token'))
//             }
//         });
//         result = await result.json();
//         setProducts(result);
//     }
//    // console.warn("products",products);
// const deleteProduct = async (id)=>{
//     let result = await fetch(`http://localhost:3050/product/${id}`,{
//         method:"Delete"
//     });
//     result = await result.json()
//     if(result)
//     {
//         alert("record is deleted")
//         getProducts();
//     }
// }
// const searchHandle = async (event) =>{
//     let key = event.target.value;
//     if(key){
//         let result = await fetch(`http://localhost:3050/product/${key}`);
//         result =await result.json();
//         if(result){
//             setProducts(result)
//         }
//     }else{getProducts()
        
//     }
// }
   
//     return(
//         <div className='ProductList'>
//             <h3>Product List</h3>
//             <input className='search-product-box' type="text" placeholder='Search Product'
//             onChange={searchHandle}/>
//             <ul>
//                 <li>S. No</li>
//                 <li>Name</li>
//                 <li>Price</li>
//                 <li>Category</li>
//                 <li>Company</li>
//                 <li>Operation</li>
//             </ul>
//             {
//                products.length>0 ? products.map((item,index)=>
//                  <ul key={item._id}>
//                 <li>{index+1}</li>
//                 <li>{item.name}</li>
//                 <li>$ {item.price}</li>
//                 <li>{item.category}</li>
//                 <li>{item.company}</li>
//                 <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
//                 <Link to={"/update/"+item._id}>Update</Link>
//                 </li> 
//             </ul>
//                 )
//                 :<h1>No Result found</h1>
//             }
          
//         </div>
//     )
// }
