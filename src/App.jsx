import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';

// IMPORTANT: You must import the Bootstrap CSS file!
import 'bootstrap/dist/css/bootstrap.min.css';

// Dummy page components for demonstration
const Home = () => <h2>Home Page Content</h2>;
const Reports = () => <h2>Reports Content</h2>;
const Settings = () => <h2>Settings Content</h2>;

const App = () => {
  return (
    <Routes>
      {/* The parent route uses the Layout component */}
      <Route path="/" element={<Layout />}>
        
        {/* Child routes render inside the <Outlet /> */}
        <Route index element={<Home />} /> 
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        
      </Route>
    </Routes>
  );
};

export default App;