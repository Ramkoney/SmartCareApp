

import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';       
import CaregiverLessons from './caregiverLessons';

const Routers = () => {
  return (
    <BrowserRouter>
      <ToastContainer 
        position="bottom-right"
      />
      <Routes>
        
        

          <Route path="/caregiversLessons" element={<CaregiverLessons/>} />
  
       </Routes>  
      
    </BrowserRouter>
  );
}

export default Routers;