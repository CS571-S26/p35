import React from "react";
import { useContext } from "react";
import AllSyllabiContext from "../context/AllSyllabiContext";

export default function Grading() {
	const { allSyllabi } = useContext(AllSyllabiContext);
	const index = Number(localStorage.getItem('currentSyllabusIndex'));
	const currentSyllabus = allSyllabi[index];
	return <h1>Grading TODO</h1>;
}
