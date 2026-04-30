import React from "react";

function getGradeColor(letterGrade) {
    const grade = letterGrade?.toUpperCase() ?? "";

    if (grade.startsWith("A")) {
        return "#16a34a";
    }

    if (grade.startsWith("B")) {
        return "#65a30d";
    }

    if (grade.startsWith("C")) {
        return "#ca8a04";
    }

    if (grade.startsWith("D")) {
        return "#ea580c";
    }

    if (grade.startsWith("F")) {
        return "#dc2626";
    }

    return "#6c757d";
}

export default function EstimatedLetterGrade({ letterGrade }) {
    if (!letterGrade) {
        return (
            <p className="mb-0 text-secondary">
                Estimated letter grade unavailable.
            </p>
        );
    }

    const color = getGradeColor(letterGrade);

    return (
        <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="text-secondary">Estimated letter grade:</span>
            <span
                className="d-inline-flex align-items-center justify-content-center fw-bold"
                style={{
                    minWidth: "42px",
                    height: "34px",
                    padding: "0 12px",
                    borderRadius: "10px",
                    backgroundColor: `${color}1a`,
                    color
                }}
            >
                {letterGrade}
            </span>
        </div>
    );
}
