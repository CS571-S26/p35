import React from "react";
import { useCurrentSyllabus } from "../context/AllSyllabiContext";
import { PoliciesCard } from "./Components/PoliciesCard";
import { ResourcesCard } from "./Components/ResourcesCard";


export default function More() {
	const currentSyllabus = useCurrentSyllabus();

	if (!currentSyllabus) {
		return <h1>More Loading...</h1>;
	}

	return (
		<div className="d-flex flex-column gap-4">
			
			<ResourcesCard resources={currentSyllabus.resources} />
			<PoliciesCard policies={currentSyllabus.policies} />
		</div>
	);
}
