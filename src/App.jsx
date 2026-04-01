import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Overview from './syllabus-tabs/Overview'
import Calendar from './syllabus-tabs/Calendar'
import Staff from './syllabus-tabs/Staff'
import Grading from './syllabus-tabs/Grading'
import More from './syllabus-tabs/More'
import AllSyllabiContext from './context/AllSyllabiContext';
import "./App.css";

// IMPORTANT: You must import the Bootstrap CSS file!
import 'bootstrap/dist/css/bootstrap.min.css';


// FOR TESTING 
import testData from './assets/tests/cs571.json';
import testData2 from './assets/tests/econ695.json';
import testData3 from './assets/tests/english.json';


export default function App() {

  // Store all loaded syllabi 
  const [allSyllabi, setAllSyllabi] = useState([]);
  const [currentSyllabusIndex, setCurrentSyllabusIndex] = useState(0)
  
  
  // TODO
  // THIS IS WHERE WE WILL FETCH THE DATA FROM THE BACKEND
  useEffect(() => {
    setAllSyllabi([testData, testData2, testData3]);
    sessionStorage.setItem('currentSyllabusIndex', 0)
  }, []);



  return (
    <AllSyllabiContext.Provider value={{ allSyllabi, setCurrentSyllabusIndex }}>
      <Routes>
        {/* The parent route uses the Nav component */}
        <Route path="/" element={<Layout />}>

          {/* Child routes render inside the <Outlet /> */}
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="staff" element={<Staff />} />
          <Route path="grading" element={<Grading />} />
          <Route path="more" element={<More />} />

        </Route>
      </Routes>
    </AllSyllabiContext.Provider>
  )
};