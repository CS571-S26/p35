import React from "react";
import { Card, Table } from "react-bootstrap";

export function ImportantDatesCard(props) {
    const importantDates = props.importantDates ?? [];

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title className="mb-3">Important Dates</Card.Title>
                {importantDates.length === 0 ? (
                    <p className="mb-0">No important dates found.</p>
                ) : (
                    <Table bordered responsive className="mb-0">
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {importantDates.map((item, index) => (
                                <tr key={`${item.event}-${index}`}>
                                    <td>{item.event}</td>
                                    <td>{item.date_iso}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}