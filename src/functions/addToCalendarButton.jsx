import React from 'react';
import { Button } from 'react-bootstrap';
import { useCurrentSyllabus } from '../context/AllSyllabiContext';
import { downloadIcsFile } from './downloadIcsFile';

export default function AddToCalendar({ 
    event, 
    date, 
    description = '', 
    location = '', 
    duration,
    startTime,
    endTime,
    recurrenceRule,
    buttonText = 'Add to Calendar', // Allows changing button text 
    ...rest // Grabs anything else.
}) {
    // Get class-Specific Data
    const syllabus = useCurrentSyllabus();
    const classCode = syllabus?.course_code ?? '';

    // Format title of the event
    const title = classCode ? `${event} - ${classCode}` : event;

    
    const handleDownload = () => {
        downloadIcsFile({
            title,
            date,
            description,
            location,
            duration,
            startTime,
            endTime,
            recurrenceRule
        });
    };

    return (
        <Button onClick={handleDownload}  {...rest}>
            {buttonText}
        </Button>
    );
}
