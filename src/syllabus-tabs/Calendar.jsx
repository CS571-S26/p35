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

    const classTimes = (currentSyllabus.class_sessions ?? []).map((session) => ({
        type: session.type,
        times: [
            `${session.day_of_week} ${session.start_time_24h} - ${session.end_time_24h}`,
        ],
    }));

    const importantDates = (currentSyllabus.important_dates ?? []).map((item) => ({
        event: item.event,
        date: item.date_iso,
    }));

    const weeklySchedule = (currentSyllabus.schedule_of_topics ?? []).map((item) => ({
        label: item.week_or_date,
        topic: item.topic_name,
        tasks: item.readings_or_tasks,
    }));

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
