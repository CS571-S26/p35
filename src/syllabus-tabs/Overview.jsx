import React from "react";
import { Col, Row } from "react-bootstrap";
import { useCurrentSyllabus } from "../context/AllSyllabiContext";
import { CourseSummaryCard } from "./Components/CourseSummaryCard";
import { LearningOutcomeCard } from "./Components/WhatYouWillLearnCard";
import { PrimaryContactsCard } from "./Components/PrimaryContactsCard";
import { GradeDistributionCard } from "./Components/GradeDistributionCard";

import { ImportantDatesOverviewCard } from "./Components/ImportantDatesOverviewCard";

export default function Overview() {
    const currentSyllabus = useCurrentSyllabus();

    if (!currentSyllabus) {
        return <h1>Overview TODO</h1>;
    }

    return (
        <div>
            {/* <h1 className="mb-4">{currentSyllabus.course_code}: {currentSyllabus.course_title}</h1> */}

            <Row className="g-3 mb-3">
                <Col xs={12} md={6}>
                    <CourseSummaryCard summaryText={currentSyllabus.course_summary} />
                </Col>
                <Col xs={12} md={6}>
                    <LearningOutcomeCard learningText={currentSyllabus.what_you_will_learn} />
                </Col>
            </Row>


            <Row className="g-3 mb-3">
                <Col xs={12}>
                    <PrimaryContactsCard staff={currentSyllabus.staff} />
                </Col>
            </Row>


            <Row className="g-3">
                <Col xs={12}>
                    <GradeDistributionCard gradeMakeup={currentSyllabus.grade_makeup} />
                </Col>
                <Col xs={12}>
                    <GradeDistributionCard gradeMakeup={currentSyllabus.grade_makeup} />
                </Col>
                <Col xs={12}>
                    <ImportantDatesOverviewCard importantDates={currentSyllabus.important_dates} />
                </Col>
            </Row>
        </div>
    );
}