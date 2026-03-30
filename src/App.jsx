import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Overview from './syllabus-tabs/Overview'
import Calendar from './syllabus-tabs/Calendar'
import Staff from './syllabus-tabs/Staff'
import Grading from './syllabus-tabs/Grading'
import More from './syllabus-tabs/More'
import SyllabusContext from './context/SyllabusContext';

// IMPORTANT: You must import the Bootstrap CSS file!
import 'bootstrap/dist/css/bootstrap.min.css';


// FOR TESTING 
import testData from './assets/tests/571output.json';


export default function App() {

  // Store all loaded syllabi 
  const [allSyllabi, setAllSyllabi] = useState([]);
  const [selectedSyllabusIndex, setSelectedSyllabusIndex] = useState(0);

  // TODO
  // THIS IS WHERE WE WILL FETCH THE DATA FROM THE BACKEND
  useEffect(() => {
    const secondSyllabus = {
      ...testData,
      course: 'CS570: Intro to Human-Computer Interaction',
      classTime: [
        {
          type: 'Lecture',
          times: ['Mo 11:00 am - 12:15 pm', 'We 11:00 am - 12:15 pm'],
        },
      ],
    };

    setAllSyllabi([testData, secondSyllabus]);
  }, []);

  const currentSyllabus = allSyllabi?.[selectedSyllabusIndex] ?? null;


  // console.log(syllabusData)





  return (
    <SyllabusContext.Provider
      value={{
        allSyllabi,
        setAllSyllabi,
        selectedSyllabusIndex,
        setSelectedSyllabusIndex,
        currentSyllabus,
      }}
    >
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
    </SyllabusContext.Provider>
  )
};