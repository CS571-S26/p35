import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import addToCalendar from "../../functions/addToCalendar";

export function ImportantDatesCard(props) {
    const importantDates = props.importantDates ?? [];

    const formatDate = (dateIso) => {
        const date = new Date(dateIso + 'T00:00:00');
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    };


    return (

        <Card className="h-100">
            <Card.Body>
                <Card.Title className="mb-3">Important Dates</Card.Title>
                {importantDates.length === 0 ? (
                    <p className="mb-0">No important dates found.</p>
                ) : (
                    <Table responsive className="mb-0">
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
                                    <td>{formatDate(item.date_iso)} </td>
                                    <td>
                                        <Button onClick={() => addToCalendar(item)}>Add</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}