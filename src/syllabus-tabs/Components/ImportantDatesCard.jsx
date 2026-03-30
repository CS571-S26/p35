import React from "react";
import { Card, Table } from "react-bootstrap";

export default function ImportantDatesCard(props) {
    const importantDates = props.importantDates ?? [];

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>Important Dates</Card.Title>
                {importantDates.length === 0 ? (
                    <p className="mb-0">No important dates available.</p>
                ) : (
                    <Table striped bordered hover responsive className="mb-0">
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {importantDates.map((item, i) => (
                                <tr key={`${item.event}-${i}`}>
                                    <td>{item.event}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}
