import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const DAY_LABELS = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
};

export default function WeeklyScheduleCard(props) {
    const weeklySchedule = props.weeklySchedule ?? {};

    if (Array.isArray(weeklySchedule)) {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Schedule of Topics</Card.Title>
                    <Row>
                        {weeklySchedule.map((item, i) => (
                            <Col md={6} lg={4} key={`${item.label}-${i}`} className="mb-3">
                                <h6 className="text-uppercase mb-2">{item.label}</h6>
                                <p className="mb-1">{item.topic}</p>
                                <p className="mb-0 text-muted">{item.tasks ?? "No tasks listed."}</p>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Expected Weekly Schedule</Card.Title>
                <Row>
                    {Object.entries(weeklySchedule).map(([dayKey, items]) => (
                        <Col md={6} lg={4} key={dayKey} className="mb-3">
                            <h6 className="text-uppercase mb-2">{DAY_LABELS[dayKey] ?? dayKey}</h6>
                            {items.length === 0 ? (
                                <p className="mb-0 text-muted">No planned items.</p>
                            ) : (
                                <ul className="mb-0">
                                    {items.map((item, i) => (
                                        <li key={`${dayKey}-${i}`}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
}
