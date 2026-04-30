import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './navigation/Layout';
import Overview from './syllabus-tabs/Overview/Overview'
import Calendar from './syllabus-tabs/Calendar/Calendar'
import Staff from './syllabus-tabs/Staff/Staff'
import Grading from './syllabus-tabs/Grading/Grading'
import More from './syllabus-tabs/More'
import AllSyllabiContext from './context/AllSyllabiContext';
import "./App.css";
import WhatIfCalc from './syllabus-tabs/What-If Calc/WhatIfCalc';
import Welcome from './Welcome';

// IMPORTANT: You must import the Bootstrap CSS file!
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {

  // Store all loaded syllabi 
  const [allSyllabi, setAllSyllabi] = useState([]);
  const [currentSyllabusIndex, setCurrentSyllabusIndex] = useState(0)
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);


  // On load, check to see if the user has any data in local storage
  useEffect(() => {
    // Try to load syllabi from localStorage first
    const storedSyllabi = localStorage.getItem('allSyllabi');
    if (storedSyllabi) {
      try {
        setAllSyllabi(JSON.parse(storedSyllabi));
      } catch (error) {
        console.error('Error parsing stored syllabi:', error);
        setAllSyllabi([]);
      }
    }

    if (localStorage.getItem('currentSyllabusIndex') === null) {
      localStorage.setItem('currentSyllabusIndex', '0');
    }

    setHasLoadedStorage(true);
  }, []);

  if (!hasLoadedStorage) {
    return null;
  }

  const hasSyllabi = allSyllabi.length > 0;



  return (
    <AllSyllabiContext.Provider value={{ allSyllabi, setAllSyllabi, setCurrentSyllabusIndex }}>

      {hasSyllabi ?
        <Routes>
          {/* The parent route uses the Nav component */}
          <Route path="/" element={<Layout />}>

            {/* Child routes render inside the <Outlet /> */}
            <Route index element={<Overview />}/>
            <Route path="overview" element={<Overview />} />
            <Route path="calendar" element={ <Calendar />} />
            <Route path="staff" element={<Staff /> } />
            <Route path="grading" element={ <Grading /> } />
            <Route path="what-if" element={<WhatIfCalc />} />
            <Route path="more" element={<More />} />
          </Route>
        </Routes> :

        <Welcome />}
    </AllSyllabiContext.Provider>
  )
};
