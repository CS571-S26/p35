import React from 'react';
import { useCurrentSyllabus } from '../context/AllSyllabiContext'


export default function CourseHeader() {
    const currentSyllabus = useCurrentSyllabus();

    if (!currentSyllabus) {
        return (
            <div style={{ margin: '10px' }}>
                <h2 style={{ fontWeight: 'bold' }}>Loading...</h2>
            </div>
        );
    }

    const code = currentSyllabus.course_code 
    const title = currentSyllabus.course_title
    const university = currentSyllabus.university_name
    const semester = [currentSyllabus.semester_season, currentSyllabus.semester_year]
        .filter(Boolean)
        .join(' ');


    return (
        <div style={{ margin: '10px' }}>
            {code ? <h2 style={{fontWeight: 800}}>{code}</h2> : null}
            {(title || semester) ? (
                <h5 className="d-flex align-items-baseline gap-2 flex-wrap mb-1" style={{ fontWeight: 'bold' }}>
                    {title}
                    {title && semester ? <span className="text-secondary">•</span> : null}
                    {semester ? <span>{semester}</span> : null}
                </h5>
            ) : null}
            {university ? <div className="text-secondary">{university}</div> : null}
        </div>
    );
}
