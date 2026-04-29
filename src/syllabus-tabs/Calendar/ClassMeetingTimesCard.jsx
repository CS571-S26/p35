import React from "react";
import { Card, Table } from "react-bootstrap";

export function ClassMeetingTimesCard(props) {
    const classSessions = props.classSessions ?? [];

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title className="mb-3">Class Sessions</Card.Title>
                {classSessions.length === 0 ? (
                    <p className="mb-0">No class sessions found.</p>
                ) : (
                    <Table bordered responsive className="mb-0">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Day</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classSessions.map((session, index) => (
                                <tr key={`${session.type}-${session.day_of_week}-${index}`}>
                                    <td>{session.type}</td>
                                    <td>{session.day_of_week}</td>
                                    <td>{session.start_time_24h} - {session.end_time_24h}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}