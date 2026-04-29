import React from 'react';
import { Card, Table } from 'react-bootstrap';

function formatDate(dateIso) {
    if (!dateIso) {
        return 'N/A';
    }

    const parsed = new Date(`${dateIso}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) {
        return dateIso;
    }

    return parsed.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function ImportantDatesOverviewCard({ importantDates }) {
    const dates = Array.isArray(importantDates) ? importantDates : [];

    return (
        <Card>
            <Card.Body>
                <Card.Title className="h5">Important Dates</Card.Title>
                {dates.length === 0 ? (
                    <p className="mb-0 text-muted">No important dates available.</p>
                ) : (
                    <Table responsive striped bordered hover className="mb-0">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Event</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dates.map((item, index) => (
                                <tr key={`${item.event}-${item.date_iso}-${index}`}>
                                    <td>{formatDate(item.date_iso)}</td>
                                    <td>{item.event ?? 'N/A'}</td>
                                    <td>{item.is_deadline ? 'Deadline' : 'Date'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}