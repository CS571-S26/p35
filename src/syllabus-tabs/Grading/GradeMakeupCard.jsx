import React from "react";
import { Card, Table } from "react-bootstrap";

function formatValue(value) {
    return value === null || value === undefined || value === "" ? "N/A" : value;
}

export function GradeMakeupCard({ gradeMakeup, gradingScheme }) {
    const items = Array.isArray(gradeMakeup) ? gradeMakeup : [];
    const isPointsBased = gradingScheme === "cumulative_points";

    return (
        <Card>
            <Card.Body className="p-4 p-md-5">
                <Card.Title className="h4 mb-4">Grade Makeup</Card.Title>

                {items.length === 0 ? (
                    <p className="mb-0 text-muted">No grade makeup data available.</p>
                ) : (
                    <Table responsive className="mb-0 align-middle" size="sm">
                        <thead>
                            <tr>
                                <th className="text-muted fw-normal">Category</th>
                                <th className="text-muted fw-normal">Count</th>
                                {isPointsBased ? (
                                    <th className="text-muted fw-normal">Points</th>
                                ) : null}
                                <th className="text-muted fw-normal">Drop Lowest</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => {
                                const isLastRow = index === items.length - 1;
                                const cellClass = `py-2 align-middle ${isLastRow ? "border-bottom-0" : ""}`;

                                return (
                                    <tr key={`${item.assignment_category ?? "category"}-${index}`}>
                                        <td className={`${cellClass} text-dark`}>
                                            {formatValue(item.assignment_category)}
                                        </td>
                                        <td className={cellClass}>{formatValue(item.count)}</td>
                                        {isPointsBased ? (
                                            <td className={cellClass}>{formatValue(item.total_points)}</td>
                                        ) : null}
                                        <td className={cellClass}>{formatValue(item.drop_lowest)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}
