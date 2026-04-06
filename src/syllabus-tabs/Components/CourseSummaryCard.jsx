import React from 'react';
import { Card } from 'react-bootstrap';

function toBullets(text) {
    if (!text || typeof text !== 'string') {
        return [];
    }

    const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

    const dashBullets = lines
        .map((line) => line.replace(/^[-*]\s+/, '').trim())
        .filter(Boolean);

    if (dashBullets.length > 1 || (lines[0] && /^[-*]\s+/.test(lines[0]))) {
        return dashBullets;
    }

    return [text.trim()];
}

export function CourseSummaryCard({ summaryText }) {
    const bullets = toBullets(summaryText);

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title className="h5">Course Summary</Card.Title>
                {bullets.length === 0 ? (
                    <p className="mb-0 text-muted">No course summary available.</p>
                ) : (
                    <ul className="mb-0 ps-3">
                        {bullets.map((item, index) => (
                            <li key={`${item}-${index}`}>{item}</li>
                        ))}
                    </ul>
                )}
            </Card.Body>
        </Card>
    );
}