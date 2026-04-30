
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useCurrentSyllabus } from "../../context/AllSyllabiContext";
import { ClassMeetingTimesCard } from "./ClassMeetingTimesCard";
import { ImportantDatesCard } from "./ImportantDatesCard";
import { CourseScheduleCard } from "./CourseScheduleCard";

export default function Calendar() {
    const currentSyllabus = useCurrentSyllabus();

    if (!currentSyllabus) {
        return <h1>Loading...</h1>;
    }

    const importantDates = currentSyllabus.important_dates ?? [];
    const classSessions = currentSyllabus.class_sessions ?? [];
    const scheduleOfTopics = currentSyllabus.schedule_of_topics ?? [];

    return (
        <div>
            

            <Row className="g-3">
                <Col xs={12}>
                    <ClassMeetingTimesCard classSessions={classSessions} />
                </Col>

                <Col xs={12}>
                    <ImportantDatesCard importantDates={importantDates} />
                </Col>

                <Col xs={12}>
                    <CourseScheduleCard scheduleOfTopics={scheduleOfTopics} />
                </Col>
            </Row>
        </div>
    );
}
