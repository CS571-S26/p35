import React from 'react';
import { Card } from 'react-bootstrap';

function formatGradingScheme(gradingScheme) {
    if (!gradingScheme) {
        return 'N/A';
    }

    return gradingScheme
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function InfoItem({ label, value }) {
    return (
        <div>
            <div className="small text-secondary mb-1">{label}</div>
            <div className="fw-semibold text-dark">{value ?? 'N/A'}</div>
        </div>
    );
}

export function CourseInfoCard({ credits, expectedHoursPerWeek, gradingScheme }) {
    return (
        <Card>
            <Card.Body>
                <Card.Title className="h5 mb-3">Course Information</Card.Title>
                <div className="d-flex flex-wrap gap-4">
                    <InfoItem label="Credits" value={credits} />
                    <InfoItem label="Expected Hours Per Week" value={expectedHoursPerWeek} />
                    <InfoItem label="Grading Scheme" value={formatGradingScheme(gradingScheme)} />
                </div>
            </Card.Body>
        </Card>
    );
}
