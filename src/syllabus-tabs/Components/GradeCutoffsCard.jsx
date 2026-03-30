import React from "react";
import { Card, Table } from "react-bootstrap";

export default function GradeCutoffsCard(props) {
    const gradeCutoffs = props.gradeCutoffs ?? [];

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>Grade Cutoffs</Card.Title>
                {gradeCutoffs.length === 0 ? (
                    <p className="mb-0">No grade cutoff data found.</p>
                ) : (
                    <Table bordered responsive className="mb-0">
                        <thead>
                            <tr>
                                <th>Letter Grade</th>
                                <th>Min %</th>
                                <th>Max %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gradeCutoffs.map((item, index) => (
                                <tr key={`${item.letter_grade}-${index}`}>
                                    <td>{item.letter_grade}</td>
                                    <td>{item.min_percent}</td>
                                    <td>{item.max_percent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

            </Card.Body>
        </Card>
    );
}
