import React from 'react';
import { Card, Table } from 'react-bootstrap';

function formatPercent(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return 'N/A';
    }

    return `${Number(value)}%`;
}

function formatPoints(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return 'N/A';
    }

    return Number(value);
}

export function GradeMakeupCard({ gradeMakeup }) {
    const items = Array.isArray(gradeMakeup) ? gradeMakeup : [];
    const hasAnyCount = items.some((item) => item?.count !== null && item?.count !== undefined);
    const hasAnyWeight = items.some((item) => item?.weight_percentage !== null && item?.weight_percentage !== undefined && !Number.isNaN(Number(item?.weight_percentage)));
    const hasAnyPoints = items.some((item) => item?.total_points !== null && item?.total_points !== undefined && !Number.isNaN(Number(item?.total_points)));
    const hasAnyDropLowest = items.some((item) => item?.drop_lowest !== null && item?.drop_lowest !== undefined);

    return (
        <Card>
            <Card.Body>
                <Card.Title className="h5">Grade Makeup Overview</Card.Title>
                {items.length === 0 ? (
                    <p className="mb-0 text-muted">No grade makeup data available.</p>
                ) : (
                    <Table responsive striped bordered hover className="mb-0">
                        <thead>
                            <tr>
                                <th>Category</th>
                                {hasAnyCount && <th>Count</th>}
                                {hasAnyWeight && <th>Weight %</th>}
                                {hasAnyPoints && <th>Total Points</th>}
                                {hasAnyDropLowest && <th>Drop Lowest</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={`${item.assignment_category}-${index}`}>
                                    <td>{item.assignment_category ?? 'N/A'}</td>
                                    {hasAnyCount && <td>{item.count ?? 'N/A'}</td>}
                                    {hasAnyWeight && <td>{formatPercent(item.weight_percentage)}</td>}
                                    {hasAnyPoints && <td>{formatPoints(item.total_points)}</td>}
                                    {hasAnyDropLowest && <td>{item.drop_lowest ?? 'N/A'}</td>}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}