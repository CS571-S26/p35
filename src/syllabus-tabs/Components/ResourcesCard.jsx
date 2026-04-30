import React from 'react';
import { Card } from 'react-bootstrap';
import Resource from './reusable/Resource';

const RESOURCE_TYPE_COLORS = {
    book: '#7c3aed',
    website: '#2563eb',
    platform: '#0891b2',
    software: '#16a34a',
    article: '#ca8a04',
    video: '#db2777'
};

function getResourceColor(type) {
    return RESOURCE_TYPE_COLORS[type?.toLowerCase()] ?? '#6c757d';
}

export function ResourcesCard({ resources }) {
    const resourceList = Array.isArray(resources) ? resources : [];

    return (
        <Card>
            <Card.Body>
                <Card.Title className="h5">Resources</Card.Title>
                {resourceList.length === 0 ? (
                    <p className="mb-0 text-muted">No resource information available.</p>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {resourceList.map((resource, index) => (
                            <Resource
                                key={`${resource.name}-${index}`}
                                color={getResourceColor(resource.resource_type)}
                                name={resource.name}
                                type={resource.resource_type}
                                details={resource.details}
                                isbn={resource.isbn}
                                link={resource.link}
                            />
                        ))}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}
