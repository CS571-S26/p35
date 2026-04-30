import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import progressBar from '../Components/reusable/ProgressBar';

function getNumber(value) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
}

function formatValue(value) {
    return value === null || value === undefined || value === '' ? 'N/A' : value;
}

function formatPercent(value) {
    return `${Math.round(value)}%`;
}

function getPercentRows(items) {
    const hasExplicitWeights = items.some((item) => getNumber(item?.weight_percentage) !== null);

    if (hasExplicitWeights) {
        return items.map((item) => ({
            ...item,
            percent: getNumber(item?.weight_percentage) ?? 0
        }));
    }

    const totalPoints = items.reduce((sum, item) => {
        const points = getNumber(item?.total_points);
        return sum + (points ?? 0);
    }, 0);

    return items.map((item) => {
        const points = getNumber(item?.total_points) ?? 0;
        const percent = totalPoints > 0 ? (points / totalPoints) * 100 : 0;

        return {
            ...item,
            percent
        };
    });
}

export function GradeOverviewCard({ gradeMakeup, gradingScheme }) {
    const items = Array.isArray(gradeMakeup) ? gradeMakeup : [];
    const rows = getPercentRows(items);
    const isPointsBased = gradingScheme === 'cumulative_points';

    return (
        <Card>
            <Card.Body className="p-4 p-md-5">
                <Card.Title className="h4 mb-4">Grade Overview</Card.Title>

                {items.length === 0 ? (
                    <p className="mb-0 text-muted">No grading information available.</p>
                ) : (
                    <Row className="g-4">
                        <Col xs={12} lg={5}>
                            <h3 className="h6 mb-3 text-secondary">Distribution</h3>
                            {rows.map((item, index) => {
                                const percent = Math.max(0, Math.min(item.percent, 100));
                                const label = item.assignment_category ?? 'Uncategorized';

                                return (
                                    <div key={`${label}-${index}`} className={index < rows.length - 1 ? 'mb-3' : ''}>
                                        <div className="d-flex justify-content-between align-items-end mb-2">
                                            <span className="fw-semibold text-dark">{label}</span>
                                            <span style={{ color: '#1f5be6', fontWeight: 700 }}>
                                                {formatPercent(percent)}
                                            </span>
                                        </div>
                                        {progressBar(percent)}
                                    </div>
                                );
                            })}
                        </Col>

                        <Col xs={12} lg={7}>
                            <h3 className="h6 mb-3 text-secondary">Makeup</h3>
                            <Table responsive className="mb-0 align-middle" size="sm">
                                <thead>
                                    <tr>
                                        <th className="text-muted fw-normal">Category</th>
                                        <th className="text-muted fw-normal">Count</th>
                                        {isPointsBased ? (
                                            <th className="text-muted fw-normal">Points</th>
                                        ) : null}
                                        <th className="text-muted fw-normal">Drop Lowest</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => {
                                        const isLastRow = index === items.length - 1;
                                        const cellClass = `py-2 align-middle ${isLastRow ? 'border-bottom-0' : ''}`;

                                        return (
                                            <tr key={`${item.assignment_category ?? 'category'}-${index}`}>
                                                <td className={`${cellClass} text-dark`}>
                                                    {formatValue(item.assignment_category)}
                                                </td>
                                                <td className={cellClass}>{formatValue(item.count)}</td>
                                                {isPointsBased ? (
                                                    <td className={cellClass}>{formatValue(item.total_points)}</td>
                                                ) : null}
                                                <td className={cellClass}>{formatValue(item.drop_lowest)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                )}
            </Card.Body>
        </Card>
    );
}
