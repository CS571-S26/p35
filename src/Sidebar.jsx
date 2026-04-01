import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import AllSyllabiContext from './context/AllSyllabiContext';
import { useContext } from 'react';

export default function Sidebar(props) {
    const { allSyllabi, setCurrentSyllabusIndex } = useContext(AllSyllabiContext);

    // Helper function to change the index of the syllabus 
    const changeSyllabus = (index) => {
        setCurrentSyllabusIndex(index);
        sessionStorage.setItem('currentSyllabusIndex', index);
    };

    // Get the active syllabus 
    const activeIndex = Number(sessionStorage.getItem('currentSyllabusIndex')) || 0;

    return (

        <aside
            className="bg-light border-end p-3 flex-shrink-0 d-flex flex-column"
            style={{ width: '250px', minWidth: '250px' }}
        >
            <Navbar.Brand as={Link} to="/" className="mb-0">Syllabus Analyzer</Navbar.Brand>


            <div className="mt-3 overflow-auto" style={{ minHeight: 0 }}>
                {allSyllabi.map((course, index) => (
                    <Button
                        key={`${course.course_code}-${index}`}
                        variant={activeIndex === index ? 'dark' : 'outline-secondary'}
                        className="w-100 text-start mb-2"
                        onClick={() => changeSyllabus(index)}
                    >
                        {course.course_code}
                    </Button>
                )

                )}

            </div>
        </aside>

    );
}
