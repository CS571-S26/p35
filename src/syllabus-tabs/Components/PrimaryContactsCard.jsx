import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export function PrimaryContactsCard({ staff }) {
    const people = Array.isArray(staff) ? staff : [];

    const primaryContacts = people.filter((person) => {
        const role = (person?.role ?? '').toLowerCase();
        return role === 'instructor' || role === 'professor';
    });

    return (
        <Card>
            <Card.Body>
                <Card.Title className="h5">Primary Contacts</Card.Title>
                {primaryContacts.length === 0 ? (
                    <p className="mb-0 text-muted">No primary contacts available.</p>
                ) : (
                    <ListGroup variant="flush">
                        {primaryContacts.map((person, index) => (
                            <ListGroup.Item key={`${person.name}-${index}`} className="px-0">
                                <h3 className="h6 mb-1">{person.name ?? 'Unknown'}</h3>
                                <p className="mb-1 text-secondary">{person.role ?? 'Instructor'}</p>
                                {person.email ? (
                                    <p className="mb-0">
                                        <a href={`mailto:${person.email}`}>{person.email}</a>
                                    </p>
                                ) : (
                                    <p className="mb-0 text-muted">No email available.</p>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
}