import React from 'react';
import { Card } from 'react-bootstrap';
import progressBar from './reusable/ProgressBar';

function getNumber(value) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
}

function getPercentRows(items) {
    const hasExplicitWeights = items.some((item) => getNumber(item?.weight_percentage) !== null);

    if (hasExplicitWeights) {
        return items.map((item) => ({
            ...item,
            percent: getNumber(item?.weight_percentage) ?? 0
        }));
    }

    // Get the total points for the course 
    const totalPoints = items.reduce((sum, item) => {
        const points = getNumber(item?.total_points);
        return sum + (points ?? 0);
    }, 0);


    // Return the percentage 
    return items.map((item) => {
        const points = getNumber(item?.total_points) ?? 0;
        const percent = totalPoints > 0 ? (points / totalPoints) * 100 : 0;

        return {
            ...item,
            percent
        };
    });
}

function formatPercent(value) {
    return `${Math.round(value)}%`;
}

export function GradeDistributionCard({ gradeMakeup }) {
    const items = Array.isArray(gradeMakeup) ? gradeMakeup : [];
    const rows = getPercentRows(items);

    return (
        <Card>
            <Card.Body className="p-4 p-md-5">
                <Card.Title className="h4 mb-4">Grade Distribution</Card.Title>

                {rows.length === 0 ? (
                    <p className="mb-0 text-muted">No grade makeup data available.</p>
                ) : (
                    rows.map((item, index) => {
                        const percent = Math.max(0, Math.min(item.percent, 100));
                        const label = item.assignment_category ?? 'Uncategorized';

                        return (
                            <div key={`${label}-${index}`} className={index < rows.length - 1 ? 'mb-4' : ''}>
                                <div className="d-flex justify-content-between align-items-end mb-2">
                                    <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                        {label}
                                    </span>
                                    <span style={{ color: '#1f5be6', fontWeight: 700, fontSize: '1rem' }}>
                                        {formatPercent(percent)}
                                    </span>
                                </div>

                                {progressBar(percent)}
                            </div>
                        );
                    })
                )}
            </Card.Body>
        </Card>
    );
}
