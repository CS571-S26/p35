
import React from "react";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import AllSyllabiContext from "../context/AllSyllabiContext";
import { ClassMeetingTimesCard } from "./Components/ClassMeetingTimesCard";
import { ImportantDatesCard } from "./Components/ImportantDatesCard";
import { WeeklyScheduleCard } from "./Components/WeeklyScheduleCard";

export default function Calendar() {
    const { allSyllabi } = useContext(AllSyllabiContext);
    const index = Number(sessionStorage.getItem('currentSyllabusIndex'));
    const currentSyllabus = allSyllabi[index];

    if (!currentSyllabus) {
        return <h1>Calendar TODO</h1>;
    }

    const importantDates = currentSyllabus.important_dates ?? [];
    const classSessions = currentSyllabus.class_sessions ?? [];
    const scheduleOfTopics = currentSyllabus.schedule_of_topics ?? [];

    return (
        <div>
            <h1 className="mb-4">Calendar</h1>

            <Row className="g-3">
                <Col xs={12}>
                    <ClassMeetingTimesCard classSessions={classSessions} />
                </Col>

                <Col xs={12}>
                    <ImportantDatesCard importantDates={importantDates} />
                </Col>

                <Col xs={12}>
                    <WeeklyScheduleCard scheduleOfTopics={scheduleOfTopics} />
                </Col>
            </Row>
        </div>
    );
}
