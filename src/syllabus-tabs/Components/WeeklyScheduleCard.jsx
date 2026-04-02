import React from "react";
import { Card, Table } from "react-bootstrap";

export function WeeklyScheduleCard(props) {
    const scheduleOfTopics = props.scheduleOfTopics ?? [];
    // Check to see if there are tasks (to determine whether or not to show the column)
    const showTasksColumn = scheduleOfTopics.some((item) => item.readings_or_tasks);

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title className="mb-3">Course Schedule</Card.Title>
                {scheduleOfTopics.length === 0 ? (
                    <p className="mb-0">No course schedule found.</p>
                ) : (
                    <Table bordered responsive className="mb-0">
                        <thead>
                            <tr>
                                <th>Week</th>
                                <th>Topic</th>
                                {showTasksColumn ? <th>Tasks or Readings</th> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleOfTopics.map((item, index) => (
                                <tr key={`${item.week_or_date}-${index}`}>
                                    <td>{item.week_or_date}</td>
                                    <td>{item.topic_name}</td>
                                    {showTasksColumn ? <td>{item.readings_or_tasks ?? "N/A"}</td> : null}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}