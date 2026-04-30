import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import { useSyllabi } from '../../context/AllSyllabiContext';
import SyllabusButton from './SyllabusButton';
import UploadSyllabusModal from './UploadSyllabusModal';

export default function Sidebar() {

    const { allSyllabi, setAllSyllabi, setCurrentSyllabusIndex, currentIndex } = useSyllabi();

    // state for the upload modal
    const [showModal, setShowModal] = useState(false);

    // state for the collapsed status
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Helper function to change the index of the syllabus 
    const changeSyllabus = (index) => {
        setCurrentSyllabusIndex(index);
        localStorage.setItem('currentSyllabusIndex', index);
    };

    // Helper function to handle adding a syllabus
    const handleSyllabusAdded = (data) => {
        const updatedSyllabi = [...allSyllabi, data];
        setAllSyllabi(updatedSyllabi);
        localStorage.setItem('allSyllabi', JSON.stringify(updatedSyllabi));
        changeSyllabus(updatedSyllabi.length - 1);
    };

    // Helper function to handle removing a syllabus
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

    // Helper function to handle viewing the original syllabus 
    const handleViewPdf = (index) => {
        // View PDF 
        const course = allSyllabi[index];
        const pdfDataUrl = course?.uploaded_pdf_data_url;

        if (!pdfDataUrl) {
            alert('No PDF is saved for this syllabus.');
            return;
        }

        // Break down the PDF into parts to work around modern 
        // browser security (which just blocks the pdf)
        try {

            const parts = pdfDataUrl.split(',');
            const byteString = atob(parts[1]);
            const mimeString = parts[0].split(':')[1].split(';')[0];

            //  Convert to raw binary data
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // Create a Blob and an Object URL
            const blob = new Blob([ab], { type: mimeString });
            const blobUrl = URL.createObjectURL(blob);

            // Open the Blob URL instead of the Data URL
            window.open(blobUrl, '_blank', 'noopener,noreferrer');


            // setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        } catch (error) {
            console.error("Error opening PDF:", error);
            alert("Failed to open PDF. The data might be corrupted.");
        }
    };

    return (
        // relative container for the collasable sidebar
        <div style={{ position: 'relative', display: 'flex', height: '100%' }}>
            {/* 2. Floating button to re-open the sidebar when it's fully collapsed */}
            {isCollapsed && (
                <Button
                    variant="light"
                    className="border shadow-sm m-2"
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: 1050 }}
                    onClick={() => setIsCollapsed(false)}
                >
                    ☰
                </Button>
            )}

            <aside
                className={`bg-light border-end flex-shrink-0 d-flex flex-column ${isCollapsed ? 'p-0' : 'p-3'}`}
                style={{ 
                    width: isCollapsed ? '0px' : '250px', 
                    minWidth: isCollapsed ? '0px' : '250px',
                    transition: 'all 0.3s ease', // Smooth sliding animation
                    overflow: 'hidden',          // Hides content when width is 0
                    whiteSpace: 'nowrap'         // Prevents text from wrapping awkwardly while shrinking
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-0">
                    <Navbar.Brand as={Link} to="/">My Courses</Navbar.Brand>
                    {/* Button to collapse the sidebar */}
                    <Button 
                        variant="link" 
                        className="text-dark p-0 text-decoration-none" 
                        onClick={() => setIsCollapsed(true)}
                    >
                        ◀
                    </Button>
                </div>

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
                
                <Button className="mt-auto" onClick={() => setShowModal(true)}>Add</Button>

                <UploadSyllabusModal 
                    show={showModal} 
                    onHide={() => setShowModal(false)} 
                    onSyllabusAdded={handleSyllabusAdded}
                />
            </aside>
        </div>

    );
}
