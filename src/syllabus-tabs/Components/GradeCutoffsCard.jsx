import React from 'react';
import { Card, Table } from 'react-bootstrap';

function formatPercent(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return 'N/A';
    }

    return `${Number(value)}%`;
}

export function GradeCutoffsCard({ gradeCutoffs }) {
    const cutoffs = Array.isArray(gradeCutoffs) ? gradeCutoffs : [];

    return (
        <Card>
            <Card.Body>
                <Card.Title className="h5">Grade Cutoffs</Card.Title>
                {cutoffs.length === 0 ? (
                    <p className="mb-0 text-muted">No grade cutoff data available.</p>
                ) : (
                    <Table responsive striped bordered hover className="mb-0">
                        <thead>
                            <tr>
                                <th>Letter Grade</th>
                                <th>Min %</th>
                                <th>Max %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cutoffs.map((cutoff, index) => (
                                <tr key={`${cutoff.letter_grade}-${index}`}>
                                    <td>{cutoff.letter_grade ?? 'N/A'}</td>
                                    <td>{formatPercent(cutoff.min_percent)}</td>
                                    <td>{formatPercent(cutoff.max_percent)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}