import React from "react";
import { Card, Table } from "react-bootstrap";

export default function GradeMakeupCard(props) {
    const gradeMakeup = props.gradeMakeup ?? [];

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>Grade Makeup</Card.Title>
                {gradeMakeup.length === 0 ? (
                    <p className="mb-0">No grade makeup data found.</p>
                ) : (
                    <Table striped bordered hover responsive className="mb-0">
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}
