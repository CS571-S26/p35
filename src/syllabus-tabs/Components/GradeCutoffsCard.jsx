import React from "react";
import { Card, Table } from "react-bootstrap";

export default function GradeCutoffsCard(props) {
    const gradeCutoffs = props.gradeCutoffs ?? [];

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>Grade Cutoffs</Card.Title>

            </Card.Body>
        </Card>
    );
}
