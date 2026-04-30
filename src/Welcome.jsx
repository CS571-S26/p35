import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSyllabi } from './context/AllSyllabiContext';
import UploadSyllabusModal from './navigation/Sidebar/UploadSyllabusModal';
import testData from './assets/tests/cs571.json';
import testData2 from './assets/tests/econ.json';
import testData3 from './assets/tests/math.json';

export default function Welcome() {
    const { allSyllabi, setAllSyllabi, setCurrentSyllabusIndex } = useSyllabi();
    const [showModal, setShowModal] = useState(false);

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

    const handleTryDemos = () => {
        const demos = [testData, testData2, testData3];
        setAllSyllabi(demos);
        localStorage.setItem('allSyllabi', JSON.stringify(demos));
        changeSyllabus(0);
    };

    return (
        <div className="d-flex h-100 align-items-center justify-content-center text-center">
            <div style={{ maxWidth: '720px' }}>
                <h1>Welcome to The AI Syllabus Analyzer.</h1>
                <p className="lead mb-4">Press upload to add your own or try these demos</p>

                <div className="d-flex flex-wrap gap-2 justify-content-center">
                    <Button onClick={() => setShowModal(true)}>Upload</Button>
                    <Button variant="outline-primary" onClick={handleTryDemos}>Try Demos</Button>
                </div>
            </div>

            <UploadSyllabusModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onSyllabusAdded={handleSyllabusAdded}
            />
        </div>
    );
}
