import React from "react";
import syllabi from "../context/SyllabusContext";
import { useContext } from 'react';

export default function Overview(props) {
    // Use context to get the current syllabus 
    const syllabus = useContext(syllabi);

    console.log(syllabus)
    
    return <div>
        TODO
        <h1>{syllabus.course}</h1>
    </div>

}