
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CaregiverLessons from './caregiverLessons';


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/caregiverLessons" element={<CaregiverLessons />} />
      </Routes>
    </Router>
  );
}

export default App;
