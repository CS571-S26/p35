import React from "react";
import { Col, Row } from "react-bootstrap";
import SyllabusContext from "../context/SyllabusContext";
import { useContext } from 'react';
import ClassMeetingTimesCard from "./Components/ClassMeetingTimesCard";
import ImportantDatesCard from "./Components/ImportantDatesCard";
import WeeklyScheduleCard from "./Components/WeeklyScheduleCard";

export default function Calendar(props) {
    const { allSyllabi } = useContext(SyllabusContext);
    const currentSyllabus = allSyllabi?.[0];

    if (!currentSyllabus) {
        return <div>Loading calendar...</div>;
    }

    const classTimes = currentSyllabus.classTime ?? [];
    const importantDates = currentSyllabus.importantDates ?? [];
    const weeklySchedule = currentSyllabus.expectedWeeklySchedule ?? {};

    return (
        <div>
            <h1 className="mb-4">Calendar</h1>

            <Row className="g-3 mb-4">
                <Col lg={6}>
                    <ClassMeetingTimesCard classTimes={classTimes} />
                </Col>

                <Col lg={6}>
                    <ImportantDatesCard importantDates={importantDates} />
                </Col>
            </Row>

            <WeeklyScheduleCard weeklySchedule={weeklySchedule} />
        </div>
    );
}
