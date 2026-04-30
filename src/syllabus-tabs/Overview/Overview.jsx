import React from "react";
import { Col, Row } from "react-bootstrap";
import { useCurrentSyllabus } from "../../context/AllSyllabiContext";
import { CourseSummaryCard } from "./CourseSummaryCard";
import { CourseInfoCard } from "./CourseInfoCard";
import { LearningOutcomeCard } from "./WhatYouWillLearnCard";
import { PrimaryContactsCard } from "../Staff/PrimaryContactsCard";
import { GradeOverviewCard } from "./GradeOverviewCard";

import { ImportantDatesCard } from "../Calendar/ImportantDatesCard";

export default function Overview() {
    const currentSyllabus = useCurrentSyllabus();


    if (!currentSyllabus) {
        return <h1>Overview TODO</h1>;
    }

    return (
        <div>
            <Row className="g-3 mb-3">
                <Col xs={12}>
                    <CourseInfoCard
                        credits={currentSyllabus.credits}
                        expectedHoursPerWeek={currentSyllabus.expected_hours_per_week}
                        gradingScheme={currentSyllabus.grading_scheme}
                    />
                </Col>
            </Row>

            <Row className="g-3 mb-3">
                <Col xs={12} md={6}>
                    <CourseSummaryCard
                        summaryText={currentSyllabus.course_summary}
                        descriptionText={currentSyllabus.course_description}
                    />
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
                    <GradeOverviewCard
                        gradeMakeup={currentSyllabus.grade_makeup}
                        gradingScheme={currentSyllabus.grading_scheme}
                    />
                </Col>
                <Col xs={12}>
                    <ImportantDatesCard importantDates={currentSyllabus.important_dates} />
                </Col>
            </Row>
        </div>
    );
}
