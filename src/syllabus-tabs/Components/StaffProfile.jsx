import React from "react";
import { Card } from "react-bootstrap";

export default function StaffProfile(props) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="mb-1">{props.name}</Card.Title>
                {props.role ? <Card.Subtitle className="mb-2 text-muted">{props.role}</Card.Subtitle> : null}
                {props.email ? <Card.Text className="mb-1">{props.email}</Card.Text> : null}
                {props.office ? <Card.Text className="mb-1">Office: {props.office}</Card.Text> : null}
                {props.officeHours ? <Card.Text className="mb-0">Office Hours: {props.officeHours}</Card.Text> : null}
            </Card.Body>
        </Card>
    );
}