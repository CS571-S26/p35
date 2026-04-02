import React from "react";
import { useContext } from "react";
import AllSyllabiContext from "../context/AllSyllabiContext";

export default function Grading() {
	const { allSyllabi } = useContext(AllSyllabiContext);
	const index = (sessionStorage.getItem('currentSyllabusIndex'));
	const currentSyllabus = allSyllabi[index];
	return <h1>Grading TODO</h1>;
}
