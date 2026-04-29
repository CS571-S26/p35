import React, { useEffect, useMemo, useState } from "react";
import { Alert, Card, Form, Table } from "react-bootstrap";
import { useCurrentSyllabus } from "../../context/AllSyllabiContext";

function getNumber(value) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
}

function getAssignmentRows(gradeMakeup) {
    const items = Array.isArray(gradeMakeup) ? gradeMakeup : [];

    const hasExplicitWeights = items.some((item) => {
        return getNumber(item?.weight_percentage) !== null;
    });

    const totalPoints = items.reduce((sum, item) => {
        const points = getNumber(item?.total_points);
        return sum + (points ?? 0);
    }, 0);

    return items.map((item, index) => {
        let weight = 0;

        if (hasExplicitWeights) {
            weight = getNumber(item?.weight_percentage) ?? 0;
        } else if (totalPoints > 0) {
            const points = getNumber(item?.total_points) ?? 0;
            weight = (points / totalPoints) * 100;
        }

        return {
            id: `${item.assignment_category ?? "assignment"}-${index}`,
            title: item.assignment_category ?? "Assignment",
            count: item.count,
            dropLowest: item.drop_lowest,
            weight
        };
    });
}

function getLetterGrade(percent, gradeCutoffs) {
    if (!Array.isArray(gradeCutoffs)) {
        return null;
    }

    return gradeCutoffs.find((cutoff) => {
        const min = getNumber(cutoff.min_percent);
        const max = getNumber(cutoff.max_percent);

        if (min === null || max === null) {
            return false;
        }

        return percent >= min && percent <= max;
    })?.letter_grade ?? null;
}

function formatPercent(value) {
    return `${value.toFixed(1)}%`;
}

export default function WhatIfCalculator() {
    const currentSyllabus = useCurrentSyllabus();
    const [scores, setScores] = useState({});

    const assignmentRows = useMemo(() => {
        return getAssignmentRows(currentSyllabus?.grade_makeup);
    }, [currentSyllabus]);

    useEffect(() => {
        setScores({});
    }, [currentSyllabus]);

    if (!currentSyllabus) {
        return <h1>What-If Calculator Loading...</h1>;
    }

    const totalWeight = assignmentRows.reduce((sum, row) => {
        return sum + row.weight;
    }, 0);

    const whatIfGrade = totalWeight > 0
        ? assignmentRows.reduce((sum, row, index) => {
            const score = getNumber(scores[index]) ?? 0;
            return sum + score * row.weight;
        }, 0) / totalWeight
        : null;

    const letterGrade = whatIfGrade !== null
        ? getLetterGrade(whatIfGrade, currentSyllabus.grade_cutoffs)
        : null;

    const handleScoreChange = (index, value) => {
        if (value === "") {
            setScores((oldScores) => ({
                ...oldScores,
                [index]: ""
            }));
            return;
        }

        const numberValue = Number(value);

        if (Number.isNaN(numberValue)) {
            return;
        }

        const clampedValue = Math.max(0, Math.min(100, numberValue));

        setScores((oldScores) => ({
            ...oldScores,
            [index]: clampedValue
        }));
    };

    return (
        <div>
            <h1 className="mb-4">What-If Calculator</h1>

            <Card className="mb-3">
                <Card.Body>
                    <Card.Title className="h4 mb-1">
                        {currentSyllabus.course_code}: {currentSyllabus.course_title}
                    </Card.Title>
                    <p className="text-secondary mb-0">
                        Enter possible percentage scores to estimate your overall course grade.
                    </p>
                </Card.Body>
            </Card>

            {assignmentRows.length === 0 ? (
                <Alert variant="warning">
                    No grading information was found for this syllabus.
                </Alert>
            ) : (
                <>
                    <Card>
                        <Card.Body>
                            <Table responsive className="mb-0 align-middle">
                                <thead>
                                    <tr>
                                        <th>Assignment</th>
                                        <th>Weight</th>
                                        <th>Your Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignmentRows.map((row, index) => (
                                        <tr key={row.id}>
                                            <td>
                                                <strong>{row.title}</strong>
                                                {row.count ? (
                                                    <div className="text-secondary small">
                                                        {row.count} item{row.count === 1 ? "" : "s"}
                                                        {row.dropLowest ? `, drops lowest ${row.dropLowest}` : ""}
                                                    </div>
                                                ) : null}
                                            </td>
                                            <td>{formatPercent(row.weight)}</td>
                                            <td style={{ maxWidth: "220px" }}>
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    step="0.1"
                                                    placeholder=""
                                                    value={scores[index] ?? ""}
                                                    onChange={(e) => handleScoreChange(index, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title className="h4">What-If Grade</Card.Title>

                            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                                {whatIfGrade === null ? "N/A" : formatPercent(whatIfGrade)}
                            </div>

                            {letterGrade ? (
                                <p className="mb-0 text-secondary">
                                    Estimated letter grade: <strong>{letterGrade}</strong>
                                </p>
                            ) : (
                                <p className="mb-0 text-secondary">
                                    Estimated letter grade unavailable.
                                </p>
                            )}
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    );
}