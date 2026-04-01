
import React from "react";
import { useContext } from "react";
import AllSyllabiContext from "../context/AllSyllabiContext";
export default function Calendar() {
    const { allSyllabi } = useContext(AllSyllabiContext);
    const index = (sessionStorage.getItem('currentSyllabusIndex'));
    const currentSyllabus = allSyllabi[index];
    return (
        <h1>Calendar TODO</h1>
    );
}
