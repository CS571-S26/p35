import React from 'react';
import { Card } from 'react-bootstrap';
import Policy from './reusable/Policy';

export function PoliciesCard({ policies }) {
    const policyList = Array.isArray(policies) ? policies : [];

    return (
        <Card>
            <Card.Body>
                <Card.Title className="h5">Policies</Card.Title>
                {policyList.length === 0 ? (
                    <p className="mb-0 text-muted">No policy information available.</p>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {policyList.map((policy, index) => (
                            <Policy
                                key={`${policy.policy_name}-${index}`}
                                color="#1f5be6"
                                title={policy.policy_name}
                                text={policy.summary}
                            />
                        ))}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}
