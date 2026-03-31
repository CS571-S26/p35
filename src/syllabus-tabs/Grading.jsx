import React from "react";
import AllSyllabiContext from "../context/AllSyllabiContext";
import { useContext } from 'react';
import { Col, Row } from "react-bootstrap";
import GradeMakeupCard from "./Components/GradeMakeupCard";
import GradeCutoffsCard from "./Components/GradeCutoffsCard";

export default function Grading(props) {
	const { allSyllabi } = useContext(AllSyllabiContext);
	const currentSyllabus = allSyllabi?.[0];

	if (!currentSyllabus) {
		return <div>Loading grading...</div>;
	}

	const gradeMakeup = currentSyllabus.grade_makeup ?? [];
	const gradeCutoffs = currentSyllabus.grade_cutoffs ?? [];

	return (
		<div>
			<h1 className="mb-4">Grading</h1>

			<Row className="g-3 mb-4">
				<Col lg={7}>
					<GradeMakeupCard gradeMakeup={gradeMakeup} />
				</Col>

				<Col lg={5}>
					<GradeCutoffsCard gradeCutoffs={gradeCutoffs} />
				</Col>
			</Row>
		</div>
	);
}
