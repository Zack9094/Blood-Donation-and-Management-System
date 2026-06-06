import './App.css';
import SignUP from './components/Sign_UP';
import ProtectedRoute from './components/ProtectedRoute';
import DR  from './components/DonerRegistration';
import DL from './components/DonorList';
import SBL from './components/StokeBloodList';
import OSBL from './components/OutStrokeBList';
import EBL from './components/ExchangeBList';
import NI from './components/NgoInfo';
import NL from './components/NgoList';
import AN from './components/AddNgo';
import HM from './components/HomePage';
import Login from './components/login';
import UR from './components/user';
import Nav from  './components/Nav';
import BR from './components/BloodRecord';
import Inv from './components/Inventory';
import DP from './components/donorProfile';
import DI from './components/donorInfo';
import RI from './components/reqInfo';
import HS from './components/hospitals';
import AH from './components/AddHospitals';
import RR from './components/receiverRegistration';
import AdminLogin from './components/AdminLogin';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
     
      <div className="App">
        
          <div class="page-container">
            <div id="header">
          <h2>Blood Bank Management System</h2>
        </div>
         <Nav />
        <div class="content">
        <div id="body">
 
          <Routes>
            <Route path="/signup" element={<SignUP />} />
           
            <Route path="/" element={
             <div className='mainDiv'> 
               
          <Link to="/signup">
          <button className='user'  ><h3>User</h3></button>
         </Link>
          <Link to="/admin">
          <button className='admin' ><h3>Admin</h3></button>
          </Link>
          <Link to="/signup">
          <button className='admin' ><h3>Hospital</h3></button>
          </Link>
          <Link to="/signup">
          <button className='admin' ><h3>Organisations</h3></button>
          </Link>
          
             </div>

              
   } />
           
            <Route path="/donorregistration" element={<DR />} />
            <Route path="/donorlist" element={<DL />} />
            <Route path="/stokebloodlist" element={<SBL />} />
            <Route path="/outstrokebloodlist" element={<OSBL />} />
            <Route path="/exchangebloodlist" element={<EBL />} />
            <Route path="/ngolist" element={<NL />} />
            <Route path="/ngoinfo" element={<NI />} />
            <Route path="/addngo" element={<AN />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminLogin />} />
             <Route path="/user" element={
              <ProtectedRoute>
              <UR />
              </ProtectedRoute>
              } />
            <Route path="/home" element={
              <ProtectedRoute>
                <HM/>
              </ProtectedRoute>
              } />
            <Route path="/inv" element={<Inv/>} />
            <Route path="/donorProfile" element={
             <ProtectedRoute>
              <DP/>
             </ProtectedRoute> 
             } />
            <Route path="/bloodRecord" element={<BR/>} />
            <Route path="/donor/home/donorInfo" element={
              <ProtectedRoute>
                <DI/>
              </ProtectedRoute>
              } />
            <Route path="/reqInfo" element={
              <ProtectedRoute>
                <RI/>
              </ProtectedRoute>
              } />
            <Route path="/receiverRegistration" element={<RR/>} />
            <Route path="/hospitals" element={
              <ProtectedRoute>
                <HS/>
              </ProtectedRoute>
              } />
            <Route path="/addhospitals" element={<AH/>} />
          </Routes>
        </div>
</div>

        <div id="footer">
         
          <h4 align="center">Copyright@myproject.com</h4>
        </div>
      </div>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
/*
 <BrowserRouter>
     <Nav />
     <Routes>
      
      <Route element={<PrivateComponent />}>
      <Route path="/" element={<ProductList/>}/>
     <Route path="/add" element={<AddProduct/>}/>
     <Route path="/update/:id" element={<UpdateProduct/>}/>
     <Route path="/logout" element={<h1>Logout Component</h1>}/>
     <Route path="/profile" element={<h1>Profile Component</h1>}/>
     <Route path="/main" element={<Main/>}/>
     </Route>
    <Route path="/signUp" element={<SignUp/>}/>
    <Route path="/Login" element= {<Login />} />
     </Routes>
   </BrowserRouter>
   <Footer />
   
    </div>
  );
}
 


 <center>
            <Link to="/signup">
          <button className='user'  >
            <h3>User</h3>
            </button>
         </Link>
          <Link to="/signup">
          <button className='admin' ><h3>Admin</h3></button>
          </Link>
          <Link to="/signup">
          <button className='admin' ><h3>Hospital</h3></button>
          </Link>
          <Link to="/signup">
          <button className='admin' ><h3>Organisations</h3></button>
          </Link>
          </center>
*/
