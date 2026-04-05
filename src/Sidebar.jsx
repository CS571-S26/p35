import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import AllSyllabiContext from './context/AllSyllabiContext';
import { useContext } from 'react';
import SyllabusButton from './components/SyllabusButton';
import { uploadSyllabus } from './functions/uploadSyllabus';

export default function Sidebar(props) {
    const { allSyllabi, setAllSyllabi, setCurrentSyllabusIndex } = useContext(AllSyllabiContext);

    // Helper function to change the index of the syllabus 
    const changeSyllabus = (index) => {
        setCurrentSyllabusIndex(index);
        localStorage.setItem('currentSyllabusIndex', index);
    };

    // Get the active syllabus 
    const activeIndex = Number(localStorage.getItem('currentSyllabusIndex')) || 0;

    // Handle uploading a new syllabus
    const handleUpload = async () => {
        const fileInput = document.getElementById('syllabus-upload');
        try {
            const data = await uploadSyllabus(fileInput);
            console.log(data)
            if (data) {
                // Add to context by updating allSyllabi
                const updatedSyllabi = [...allSyllabi, data];
                setAllSyllabi(updatedSyllabi);
                // Save to local storage
                localStorage.setItem('allSyllabi', JSON.stringify(updatedSyllabi));
                // Switch to the newly added syllabus
                changeSyllabus(updatedSyllabi.length - 1);
                // Clear the file input
                fileInput.value = '';
                alert('Syllabus added successfully!');
            }
        } catch (error) {
            console.error('Error uploading syllabus:', error);
            alert('Error uploading syllabus');
        }
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
            <input type="file" id="syllabus-upload" name="syllabus-upload" accept=".pdf" />
            <Button onClick={handleUpload}>Add</Button>

        </aside>

    );
}
