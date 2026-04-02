import React from "react";
import { Card, Button } from "react-bootstrap";
import { contactCard } from "../../functions/contactCard";

export function StaffCard(props) {

    // Only displays found info
    return <Card key={props.email ?? props.name} className="h-100 staff-card">
        <Card.Body>
            <Card.Title className="h5 mb-1">{props.name}</Card.Title>
            <Card.Subtitle className="text-secondary mb-3">{props.role}</Card.Subtitle>
            <div>
                <strong>Email:</strong>{" "}
                {/* Makes Email clickable (if it exists) */}
                {props.email ? <a href={`mailto:${props.email}`}>{props.email}</a> : "Not Found"}
            </div>
            {props.phone ? <div><strong>Phone:</strong> {props.phone}</div> : <></>}
            {props.office ? <div><strong>Office:</strong> {props.office}</div> : <></>}
            {props.officeHours ? <div><strong>Office Hours:</strong> {props.officeHours}</div> : <></>}
            <Button onClick={() => contactCard(props)}>Add to Contacts</Button>

        </Card.Body>
    </Card>
}

