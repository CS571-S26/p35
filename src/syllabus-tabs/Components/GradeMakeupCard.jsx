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
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Count</th>
                                <th>Total Points</th>
                                <th>Drop Lowest</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gradeMakeup.map((item, index) => (
                                <tr key={`${item.assignment_category}-${index}`}>
                                    <td>{item.assignment_category}</td>
                                    <td>{item.count ?? 'N/A'}</td>
                                    <td>{item.total_points ?? 'N/A'}</td>
                                    <td>{item.drop_lowest ?? 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}
