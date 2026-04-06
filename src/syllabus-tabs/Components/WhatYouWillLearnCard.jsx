import React from 'react';
import { Card } from 'react-bootstrap';

function toBullets(text) {
    if (!text || typeof text !== 'string') {
        return [];
    }

    return text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.replace(/^[-*]\s+/, '').trim())
        .filter(Boolean);
}

export function WhatYouWillLearnCard({ learningText }) {
    const bullets = toBullets(learningText);

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title className="h5">What You Will Learn</Card.Title>
                {bullets.length === 0 ? (
                    <p className="mb-0 text-muted">No learning outcomes available.</p>
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