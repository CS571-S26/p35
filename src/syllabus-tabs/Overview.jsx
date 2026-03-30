import React from "react";
import syllabi from "../context/SyllabusContext";
import { useContext } from 'react';

export default function Overview(props) {
    const { allSyllabi } = useContext(syllabi);
    const syllabus = allSyllabi?.[0];

    if (!syllabus) {
        return <div>Loading overview...</div>;
    }
    
    return <div>
        <h1>{syllabus.course_code}: {syllabus.course_title}</h1>
        <p>{syllabus.course_description}</p>
        <p className="mt-3"><strong>Credits:</strong> {syllabus.credits ?? 'N/A'}</p>
        <p><strong>Expected Hours/Week:</strong> {syllabus.expected_hours_per_week ?? 'N/A'}</p>
    </div>

}