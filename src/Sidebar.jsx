import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import { useSyllabi } from './context/AllSyllabiContext';
import SyllabusButton from './components/SyllabusButton';
import UploadSyllabusModal from './components/UploadSyllabusModal';

export default function Sidebar(props) {
    const { allSyllabi, setAllSyllabi, setCurrentSyllabusIndex, currentIndex } = useSyllabi();
    const [showModal, setShowModal] = useState(false);

    // Helper function to change the index of the syllabus 
    const changeSyllabus = (index) => {
        setCurrentSyllabusIndex(index);
        localStorage.setItem('currentSyllabusIndex', index);
    };

    const handleSyllabusAdded = (data) => {
        const updatedSyllabi = [...allSyllabi, data];
        setAllSyllabi(updatedSyllabi);
        localStorage.setItem('allSyllabi', JSON.stringify(updatedSyllabi));
        changeSyllabus(updatedSyllabi.length - 1);
    };

    const handleRemoveSyllabus = (indexToRemove) => {
        const course = allSyllabi[indexToRemove];
        const courseName = course?.course_code ?? 'this syllabus';
        const shouldRemove = window.confirm(`Remove ${courseName}?`);

        if (!shouldRemove) {
            return;
        }

        const updatedSyllabi = allSyllabi.filter((_, index) => index !== indexToRemove);
        setAllSyllabi(updatedSyllabi);
        localStorage.setItem('allSyllabi', JSON.stringify(updatedSyllabi));
        let nextIndex = currentIndex;

        if (updatedSyllabi.length === 0) {
            nextIndex = 0;
        } else if (indexToRemove === currentIndex) {
            nextIndex = Math.min(indexToRemove, updatedSyllabi.length - 1);
        } else if (indexToRemove < currentIndex) {
            nextIndex = currentIndex - 1;
        }

        changeSyllabus(nextIndex);
    };

    const handleViewPdf = (index) => {
        const course = allSyllabi[index];
        const pdfDataUrl = course?.uploaded_pdf_data_url;

        if (!pdfDataUrl) {
            alert('No PDF is saved for this syllabus.');
            return;
        }

        window.open(pdfDataUrl, '_blank', 'noopener,noreferrer');
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
                        isActive={currentIndex === index}
                        onChangeSyllabus={changeSyllabus}
                        onRemoveSyllabus={handleRemoveSyllabus}
                        onViewPdf={handleViewPdf}
                    />
                ))}



            </div>
            <Button onClick={() => setShowModal(true)}>Add</Button>

            <UploadSyllabusModal show={showModal} onHide={() => setShowModal(false)} onSyllabusAdded={handleSyllabusAdded}
            />
        </aside>

    );
}
