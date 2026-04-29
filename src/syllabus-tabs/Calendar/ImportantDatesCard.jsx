import React from "react";
import { Card, Table } from "react-bootstrap";
import AddToCalendar from "../../functions/addToCalendarButton";

export function ImportantDatesCard(props) {
    const importantDates = props.importantDates ?? [];

    const formatDate = (dateIso) => {
        // Appending T00:00:00 forces it to local time as we discussed!
        const date = new Date(dateIso + 'T00:00:00');
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    };

    return (
        <Card className="h-100 shadow-sm">
            <Card.Body>
                <Card.Title className="mb-3">Important Dates</Card.Title>
                
                {importantDates.length === 0 ? (
                    <p className="mb-0 text-muted">No important dates found.</p>
                ) : (
                    <Table responsive hover className="mb-0 align-middle">
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Date</th>
                                <th className="text-end">Add to Calendar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {importantDates.map((item, index) => (
                                <tr key={`${item.event}-${index}`}>
                                    <td className="fw-medium">{item.event}</td>
                                    <td>{formatDate(item.date_iso)}</td>
                                    <td className="text-end">
                                        <AddToCalendar
                                            event={item.event}
                                            date={item.date_iso}
                                            variant="primary" 
                                            buttonText="Add" 
                                        />
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