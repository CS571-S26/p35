import React from "react";
import { useContext } from "react";
import AllSyllabiContext from "../context/AllSyllabiContext";

export default function Overview() {

    const { allSyllabi } = useContext(AllSyllabiContext);
    const index = Number(localStorage.getItem('currentSyllabusIndex'));
    const currentSyllabus = allSyllabi[index];

    if (!currentSyllabus) {
        return <h1>Overview TODO</h1>;
    }

	return <h1>{currentSyllabus.course_code}: {currentSyllabus.course_title}</h1>;
}