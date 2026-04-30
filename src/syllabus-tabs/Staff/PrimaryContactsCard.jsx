import React from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { contactCard } from '../../functions/contactCard';

function getInitials(name) {
    const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
        return '?';
    }

    return parts
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}

function CompactContactCard({ person }) {
    return (
        <div
            className="d-flex align-items-center gap-3 p-3 h-100"
            style={{
                border: '1px solid #e5e4e7',
                borderRadius: '8px'
            }}
        >
            <div
                className="d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#E5EDFF',
                    color: '#2563EB',
                    fontWeight: 800,
                    fontSize: '0.95rem'
                }}
            >
                {getInitials(person.name)}
            </div>

            <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <div className="fw-semibold text-dark text-truncate">
                    {person.name ?? 'Unknown'}
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <Badge bg="primary" className="fw-semibold">
                        {person.role ?? 'Instructor'}
                    </Badge>
                    {person.email ? (
                        <a className="small text-truncate" href={`mailto:${person.email}`}>
                            {person.email}
                        </a>
                    ) : null}
                </div>
            </div>

            <Button
                className="flex-shrink-0"
                variant="outline-primary"
                size="sm"
                onClick={() => contactCard(person)}
            >
                Add
            </Button>
        </div>
    );
}

export function PrimaryContactsCard({ staff }) {
    const people = Array.isArray(staff) ? staff : [];

    const primaryContacts = people.filter((person) => {
        const role = (person?.role ?? '').toLowerCase();
        return role === 'instructor' || role === 'professor';
    });

    return (
        <Card>
            <Card.Body>
                <Card.Title className="h5 mb-3">Primary Contacts</Card.Title>
                {primaryContacts.length === 0 ? (
                    <p className="mb-0 text-muted">No primary contacts available.</p>
                ) : (
                    <Row className="g-3">
                        {primaryContacts.map((person, index) => (
                            <Col xs={12} md={6} key={`${person.name}-${index}`}>
                                <CompactContactCard person={person} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Card.Body>
        </Card>
    );
}
