import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export function PoliciesCard({ policies }) {
    const policyList = Array.isArray(policies) ? policies : [];

    return (
        <Card>
            <Card.Body>
                <Card.Title className="h5">Policies</Card.Title>
                {policyList.length === 0 ? (
                    <p className="mb-0 text-muted">No policy information available.</p>
                ) : (
                    <ListGroup variant="flush">
                        {policyList.map((policy, index) => (
                            <ListGroup.Item key={`${policy.policy_name}-${index}`} className="px-0">
                                <h3 className="h6 mb-1">{policy.policy_name ?? 'Policy'}</h3>
                                <p className="mb-0 text-secondary">{policy.summary ?? 'No summary provided.'}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
}