import React from "react";
import { useCurrentSyllabus } from "../../context/AllSyllabiContext";
import { GradeDistributionCard } from "./GradeDistributionCard";

export default function Grading() {
	const currentSyllabus = useCurrentSyllabus();



	if (!currentSyllabus) {
		return <h1>Staff Loading...</h1>;
	}

	const gradeMakeup = currentSyllabus.grade_makeup;

	


	return <GradeDistributionCard gradeMakeup={gradeMakeup}></GradeDistributionCard>
}
