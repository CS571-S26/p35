import React from "react";
import { Card, Table } from "react-bootstrap";

export function GradingScaleCard({ gradeCutoffs }) {
    if (!gradeCutoffs || gradeCutoffs.length === 0) return null;

    const formatPercent = (percent) => {
        return `${percent}%`;
    };

    // Helper to format the max percent to match the 93.99% style in your design
    const formatMaxPercent = (maxPercent, grade) => {
        if (grade === 'A' || maxPercent === 100) {
            return '100%';
        }

        if (Number.isInteger(maxPercent)) {
            return `${(maxPercent - 0.01).toFixed(2)}%`;
        }

        return formatPercent(maxPercent);
    };

    return (
        <Card>
            <Card.Body className="p-4 p-md-5">
                <Card.Title className="h4 mb-4">Grading Scale</Card.Title>

                <Table responsive className="mb-0 align-middle" size="sm" hover>
                    {/* Table Header */}
                    <thead className="bg-light">
                        <tr>
                            <th className="text-muted fw-normal py-2 px-3 border-bottom">Letter Grade</th>
                            <th className="text-muted fw-normal py-2 px-3 border-bottom">Range</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {gradeCutoffs.map((cutoff, index) => {
                            // Determine if this is the last row to remove the bottom border
                            const isLastRow = index === gradeCutoffs.length - 1;

                            return (
                                <tr key={cutoff.letter_grade}>
                                    {/* Letter Grade Badge */}
                                    <td className={`px-3 py-2 align-middle ${isLastRow ? 'border-bottom-0' : ''}`}>
                                        <div
                                            className="d-flex align-items-center justify-content-center fw-bold"
                                            style={{
                                                width: '38px',
                                                height: '38px',
                                                backgroundColor: '#E5EDFF',
                                                color: '#2563EB',
                                                borderRadius: '10px'
                                            }}
                                        >
                                            {cutoff.letter_grade}
                                        </div>
                                    </td>

                                    {/* Percentage Range */}
                                    <td className={`px-3 py-2 align-middle fw-semibold text-dark ${isLastRow ? 'border-bottom-0' : ''}`}>
                                        {formatPercent(cutoff.min_percent)} - {formatMaxPercent(cutoff.max_percent, cutoff.letter_grade)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}
