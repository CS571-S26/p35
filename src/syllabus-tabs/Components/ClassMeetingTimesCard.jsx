import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export default function ClassMeetingTimesCard(props) {
    const classTimes = props.classTimes ?? [];

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>Class Meeting Times</Card.Title>
                {classTimes.length === 0 ? (
                    <p className="mb-0">No meeting times available.</p>
                ) : (
                    <ListGroup variant="flush">
                        {classTimes.map((entry, i) => (
                            <ListGroup.Item key={`${entry.type}-${i}`}>
                                <div className="fw-semibold">{entry.type}</div>
                                <ul className="mb-0 mt-2">
                                    {(entry.times ?? []).map((time, j) => (
                                        <li key={`${i}-${j}`}>{time}</li>
                                    ))}
                                </ul>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
}
