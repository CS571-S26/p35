import React from "react";
import SyllabusContext from "../context/SyllabusContext";
import { useContext } from 'react';
import StaffProfile from "./Components/StaffProfile";

// Use context to get the current syllabus 
export default function Staff(props) {
    const { allSyllabi } = useContext(SyllabusContext);
    const currentSyllabus = allSyllabi?.[0];

    if (!currentSyllabus) {
        return <div>Loading staff...</div>;
    }

    const staff = currentSyllabus.staff ?? [];
    const professors = staff.filter((person) => person.role === 'Professor');
    const tas = staff.filter((person) => person.role === 'TA');

    return (
        <div>
            <h2>Instructors</h2>
            {professors.length === 0 ? (
                <p>No instructors listed.</p>
            ) : (
                professors.map((person) => (
                    <StaffProfile key={person.email} role="Professor" {...person} />
                ))
            )}

            <h2 className="mt-4">Teaching Assistants</h2>
            {tas.length === 0 ? (
                <p>No TAs listed.</p>
            ) : (
                tas.map((person) => (
                    <StaffProfile key={person.email} role="TA" {...person} />
                ))
            )}
        </div>
    );
}
