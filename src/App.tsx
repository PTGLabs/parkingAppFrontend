import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import ViewParking from './components/viewParking';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/view-parking" element={<ViewParking />} />
 
      </Routes>
    </Router>
  );
};

export default App;
