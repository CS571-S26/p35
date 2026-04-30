
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useCurrentSyllabus } from "../../context/AllSyllabiContext";
import { ClassMeetingTimesCard } from "./ClassMeetingTimesCard";
import { ImportantDatesCard } from "./ImportantDatesCard";
import { CourseScheduleCard } from "./CourseScheduleCard";
import Policy from "../Components/reusable/Policy";

export default function Calendar() {
    const currentSyllabus = useCurrentSyllabus();

    if (!currentSyllabus) {
        return <h1>Loading...</h1>;
    }

    const importantDates = currentSyllabus.important_dates ?? [];
    const classSessions = currentSyllabus.class_sessions ?? [];
    const scheduleOfTopics = currentSyllabus.schedule_of_topics ?? [];
    const policies = Array.isArray(currentSyllabus.policies) ? currentSyllabus.policies : [];
    const attendancePolicy = policies.find((policy) => {
        return policy?.policy_name?.toLowerCase().includes("attendance");
    });

    return (
        <div>
            

            <Row className="g-3">
                <Col xs={12}>
                    <ClassMeetingTimesCard
                        classSessions={classSessions}
                        importantDates={importantDates}
                        semesterSeason={currentSyllabus.semester_season}
                        semesterYear={currentSyllabus.semester_year}
                    />
                </Col>

                <Col xs={12}>
                    <ImportantDatesCard importantDates={importantDates} />
                </Col>

                <Col xs={12}>
                    <CourseScheduleCard scheduleOfTopics={scheduleOfTopics} />
                </Col>

                {attendancePolicy ? (
                    <Col xs={12}>
                        <Policy
                            color="#0891b2"
                            title={attendancePolicy.policy_name}
                            text={attendancePolicy.summary}
                        />
                    </Col>
                ) : null}
            </Row>
        </div>
    );
}
