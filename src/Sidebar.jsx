import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import AllSyllabiContext from './context/AllSyllabiContext';
import { useContext } from 'react';
import SyllabusButton from './components/SyllabusButton';
import UploadSyllabusModal from './components/UploadSyllabusModal';

export default function Sidebar(props) {
    const { allSyllabi, setAllSyllabi, setCurrentSyllabusIndex } = useContext(AllSyllabiContext);
    const [showModal, setShowModal] = useState(false);

    // Helper function to change the index of the syllabus 
    const changeSyllabus = (index) => {
        setCurrentSyllabusIndex(index);
        localStorage.setItem('currentSyllabusIndex', index);
    };

    // Get the active syllabus 
    const activeIndex = Number(localStorage.getItem('currentSyllabusIndex')) || 0;

    const handleSyllabusAdded = (data) => {
        const updatedSyllabi = [...allSyllabi, data];
        setAllSyllabi(updatedSyllabi);
        localStorage.setItem('allSyllabi', JSON.stringify(updatedSyllabi));
        changeSyllabus(updatedSyllabi.length - 1);
    };



    return (

        <aside
            className="bg-light border-end p-3 flex-shrink-0 d-flex flex-column"
            style={{ width: '250px', minWidth: '250px' }}
        >
            <Navbar.Brand as={Link} to="/" className="mb-0">Syllabus Analyzer</Navbar.Brand>


            <div className="mt-3 overflow-auto" style={{ minHeight: 0 }}>
                {allSyllabi.map((course, index) => (
                    <SyllabusButton
                        key={`${course.course_code}-${index}`}
                        course={course}
                        index={index}
                        isActive={activeIndex === index}
                        onChangeSyllabus={changeSyllabus}
                    />
                ))}



            </div>
            <Button onClick={() => setShowModal(true)}>Add</Button>

            <UploadSyllabusModal show={showModal} onHide={() => setShowModal(false)} onSyllabusAdded={handleSyllabusAdded}
            />
        </aside>

    );
}
