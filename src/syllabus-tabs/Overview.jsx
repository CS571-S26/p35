import React from "react";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import AllSyllabiContext from "../context/AllSyllabiContext";
import { CourseSummaryCard } from "./Components/CourseSummaryCard";
import { WhatYouWillLearnCard } from "./Components/WhatYouWillLearnCard";
import { PrimaryContactsCard } from "./Components/PrimaryContactsCard";
import { GradeMakeupCard } from "./Components/GradeMakeupCard";
import { GradeCutoffsCard } from "./Components/GradeCutoffsCard";
import { ImportantDatesOverviewCard } from "./Components/ImportantDatesOverviewCard";

export default function Overview() {

    const { allSyllabi } = useContext(AllSyllabiContext);
    const index = Number(localStorage.getItem('currentSyllabusIndex'));
    const currentSyllabus = allSyllabi[index];

    if (!currentSyllabus) {
        return <h1>Overview TODO</h1>;
    }

    return (
        <div>
            <h1 className="mb-4">{currentSyllabus.course_code}: {currentSyllabus.course_title}</h1>

            <Row className="g-3 mb-3">
                <Col xs={12}>
                    <PrimaryContactsCard staff={currentSyllabus.staff} />
                </Col>
            </Row>

            <Row className="g-3 mb-3">
                <Col xs={12} md={6}>
                    <CourseSummaryCard summaryText={currentSyllabus.course_summary} />
                </Col>
                <Col xs={12} md={6}>
                    <WhatYouWillLearnCard learningText={currentSyllabus.what_you_will_learn} />
                </Col>
            </Row>

            <Row className="g-3">
                <Col xs={12}>
                    <GradeMakeupCard gradeMakeup={currentSyllabus.grade_makeup} />
                </Col>
                <Col xs={12}>
                    <GradeCutoffsCard gradeCutoffs={currentSyllabus.grade_cutoffs} />
                </Col>
                <Col xs={12}>
                    <ImportantDatesOverviewCard importantDates={currentSyllabus.important_dates} />
                </Col>
            </Row>
        </div>
    );
}