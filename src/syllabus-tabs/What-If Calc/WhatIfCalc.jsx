import React, { useEffect, useMemo, useState } from "react";
import { Alert, Card, Form, Table } from "react-bootstrap";
import { useCurrentSyllabus } from "../../context/AllSyllabiContext";
import progressBar from "../Components/reusable/ProgressBar";
import EstimatedLetterGrade from "./EstimatedLetterGrade";

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

function clampPercent(value) {
    return Math.max(0, Math.min(100, value));
}

function isNaInput(value) {
    return typeof value === "string" && value.trim().toUpperCase() === "NA";
}

function getTargetGradeOptions(gradeCutoffs) {
    if (!Array.isArray(gradeCutoffs)) {
        return [];
    }

    return gradeCutoffs
        .map((cutoff) => {
            const min = getNumber(cutoff.min_percent);

            if (!cutoff?.letter_grade || min === null) {
                return null;
            }

            return {
                label: cutoff.letter_grade,
                minPercent: min
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.minPercent - a.minPercent);
}

function getDefaultScores(assignmentRows) {
    return assignmentRows.reduce((defaults, _row, index) => {
        defaults[index] = "100";
        return defaults;
    }, {});
}

export default function WhatIfCalculator() {
    const currentSyllabus = useCurrentSyllabus();
    const [scores, setScores] = useState({});
    const [desiredGrade, setDesiredGrade] = useState("");

    const assignmentRows = useMemo(() => {
        return getAssignmentRows(currentSyllabus?.grade_makeup);
    }, [currentSyllabus]);

    const targetGradeOptions = useMemo(() => {
        return getTargetGradeOptions(currentSyllabus?.grade_cutoffs);
    }, [currentSyllabus]);

    useEffect(() => {
        setScores(getDefaultScores(assignmentRows));
    }, [assignmentRows]);

    useEffect(() => {
        setDesiredGrade(targetGradeOptions[0]?.label ?? "");
    }, [targetGradeOptions]);

    if (!currentSyllabus) {
        return <h1>No syllabus available</h1>;
    }

    const totalWeight = assignmentRows.reduce((sum, row) => {
        return sum + row.weight;
    }, 0);

    const naIndexes = assignmentRows.reduce((indexes, row, index) => {
        if (isNaInput(scores[index])) {
            indexes.push(index);
        }

        return indexes;
    }, []);

    const knownContribution = assignmentRows.reduce((sum, row, index) => {
        if (isNaInput(scores[index])) {
            return sum;
        }

        const score = getNumber(scores[index]) ?? 0;
        return sum + score * row.weight;
    }, 0);

    const remainingWeight = naIndexes.reduce((sum, index) => {
        return sum + assignmentRows[index].weight;
    }, 0);

    const whatIfGrade = totalWeight > 0
        ? assignmentRows.reduce((sum, row, index) => {
            if (isNaInput(scores[index])) {
                return sum;
            }

            const score = getNumber(scores[index]) ?? 0;
            return sum + score * row.weight;
        }, 0) / totalWeight
        : null;

    const letterGrade = whatIfGrade !== null
        ? getLetterGrade(whatIfGrade, currentSyllabus.grade_cutoffs)
        : null;

    const desiredCutoff = targetGradeOptions.find((option) => option.label === desiredGrade) ?? null;
    const neededScoreForNa = desiredCutoff && remainingWeight > 0
        ? ((desiredCutoff.minPercent * totalWeight) - knownContribution) / remainingWeight
        : null;
    const hasNaInputs = naIndexes.length > 0;

    const handleScoreChange = (index, value) => {
        const trimmedValue = value.trim().toUpperCase();

        if (value === "") {
            setScores((oldScores) => ({
                ...oldScores,
                [index]: ""
            }));
            return;
        }

        if (trimmedValue === "N" || trimmedValue === "NA") {
            setScores((oldScores) => ({
                ...oldScores,
                [index]: trimmedValue
            }));
            return;
        }
        //regex generated courtesy of chatgpt
        if (!/^\d*\.?\d*$/.test(value)) {
            return;
        }

        const numberValue = Number(value);

        if (Number.isNaN(numberValue)) {
            return;
        }

        setScores((oldScores) => ({
            ...oldScores,
            [index]: value
        }));
    };

    return (
        <div>


            <Card className="mb-3">
                <Card.Body>
                    <Card.Title className="h4 mb-1">
                        {currentSyllabus.course_code}: {currentSyllabus.course_title}
                    </Card.Title>
                    <p className="text-secondary mb-0">
                        Enter possible percentage scores to estimate your overall course grade. <br />Enter "NA" for any assignments that have not been graded yet.
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
                                        {hasNaInputs ? <th>Needed Score</th> : null}
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
                                            <td>
                                                <div style={{ minWidth: "140px" }}>
                                                    <div className="mb-2 fw-semibold text-dark">
                                                        {formatPercent(row.weight)}
                                                    </div>
                                                    {progressBar(clampPercent(row.weight))}
                                                </div>
                                            </td>
                                            <td style={{ maxWidth: "220px" }}>
                                                <Form.Control
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder=""
                                                    value={scores[index] ?? ""}
                                                    onChange={(e) => handleScoreChange(index, e.target.value)}
                                                />
                                            </td>
                                            {hasNaInputs ? (
                                                <td>
                                                    {isNaInput(scores[index]) && neededScoreForNa !== null ? (
                                                        <div style={{ minWidth: "140px" }}>
                                                            <div className="mb-2 fw-semibold text-dark">
                                                                {formatPercent(Math.max(0, neededScoreForNa))}
                                                            </div>
                                                            {progressBar(clampPercent(neededScoreForNa))}
                                                        </div>
                                                    ) : "—"}
                                                </td>
                                            ) : null}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                    <Card className="mt-3">
                        <Card.Body className="text-center">
                            {hasNaInputs ? (
                                <>
                                    <Card.Title className="h4">Desired Grade</Card.Title>

                                    <Form.Group className="mx-auto mb-3" style={{ maxWidth: "240px" }}>
                                        <Form.Select
                                            value={desiredGrade}
                                            onChange={(e) => setDesiredGrade(e.target.value)}
                                        >
                                            {targetGradeOptions.map((option) => (
                                                <option key={option.label} value={option.label}>
                                                    {option.label} ({formatPercent(option.minPercent)})
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    {neededScoreForNa === null ? (
                                        <p className="mb-0 text-secondary">
                                            Enter a desired grade to calculate the needed score.
                                        </p>
                                    ) : neededScoreForNa > 100 ? (
                                        <p className="mb-0 text-secondary">
                                            You would need more than 100% on the assignments marked <strong>NA</strong> to reach <strong>{desiredGrade}</strong>.
                                        </p>
                                    ) : (
                                        <>
                                            <div className="mx-auto mb-3" style={{ maxWidth: "360px" }}>
                                                {progressBar(clampPercent(neededScoreForNa))}
                                            </div>
                                            <p className="mb-0 text-secondary">
                                                To earn at least <strong>{desiredGrade}</strong>, score at least <strong>{formatPercent(Math.max(0, neededScoreForNa))}</strong> on each assignment marked <strong>NA</strong>.
                                            </p>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Card.Title className="h4">What-If Grade</Card.Title>

                                    <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                                        {whatIfGrade === null ? "N/A" : formatPercent(whatIfGrade)}
                                    </div>

                                    {whatIfGrade !== null ? (
                                        <div className="mx-auto mb-3" style={{ maxWidth: "360px" }}>
                                            {progressBar(clampPercent(whatIfGrade))}
                                        </div>
                                    ) : null}

                                    <div className="d-flex justify-content-center">
                                        <EstimatedLetterGrade letterGrade={letterGrade} />
                                    </div>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    );
}
