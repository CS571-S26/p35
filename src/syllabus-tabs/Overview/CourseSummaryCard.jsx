import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import SummarizedByAI from '../Components/reusable/SummarizedByAI';

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

export function CourseSummaryCard({ summaryText, descriptionText }) {
    const [showDescription, setShowDescription] = useState(false);
    const bullets = toBullets(summaryText);
    const hasDescription = Boolean(descriptionText);

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title className="h5">Course Summary</Card.Title>
                {bullets.length === 0 ? (
                    <p className="mb-0 text-muted">No course summary available.</p>
                ) : (
                    bullets.length !== 1 ? <ul className="mb-0 ps-3">
                        {bullets.map((item, index) => (
                            <li key={`${item}-${index}`}>{item}</li>
                        ))}
                    </ul> : <div>{bullets}</div>

                )}
                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mt-3">
                    <SummarizedByAI></SummarizedByAI>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={!hasDescription}
                        onClick={() => setShowDescription(true)}
                    >
                        Read full course description
                    </Button>
                </div>
            </Card.Body>

            <Modal show={showDescription} onHide={() => setShowDescription(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Full Course Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="mb-0">{descriptionText ?? 'No course description available.'}</p>
                </Modal.Body>
            </Modal>
        </Card>
    );
}
