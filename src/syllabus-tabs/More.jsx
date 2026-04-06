import React from "react";
import { useContext } from "react";
import AllSyllabiContext from "../context/AllSyllabiContext";
import { PoliciesCard } from "./Components/PoliciesCard";


export default function More(props) {
	const { allSyllabi } = useContext(AllSyllabiContext);
	const index = Number(localStorage.getItem('currentSyllabusIndex'));
	const currentSyllabus = allSyllabi[index];

	if (!currentSyllabus) {
		return <h1>More Loading...</h1>;
	}

	return (
		<div>
			<h1 className="mb-4">More</h1>
			<PoliciesCard policies={currentSyllabus.policies} />
		</div>
	);
}
