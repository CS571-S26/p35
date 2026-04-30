import React from "react";
import { useCurrentSyllabus } from "../../context/AllSyllabiContext";
import { GradeDistributionCard } from "./GradeDistributionCard";
import { GradeMakeupCard } from "./GradeMakeupCard";
import { GradingScaleCard } from "./GradingScaleCard"; 
import Policy from "../Components/reusable/Policy";

export default function Grading() {
    const currentSyllabus = useCurrentSyllabus();

    if (!currentSyllabus) {
        return <h1>Grading Loading...</h1>;
    }

    const gradeMakeup = currentSyllabus.grade_makeup;
    const gradeCutoffs = currentSyllabus.grade_cutoffs; // Extract cutoffs from JSON
    const gradingScheme = currentSyllabus.grading_scheme;
    const policies = Array.isArray(currentSyllabus.policies) ? currentSyllabus.policies : [];
    const latePolicy = policies.find((policy) => {
        return policy?.policy_name?.toLowerCase().includes("late");
    });

    return (
        <div className="d-flex flex-column gap-4">
            <GradingScaleCard gradeCutoffs={gradeCutoffs} />
            <GradeDistributionCard gradeMakeup={gradeMakeup} />
            <GradeMakeupCard gradeMakeup={gradeMakeup} gradingScheme={gradingScheme} />
            {latePolicy ? (
                <Policy
                    color="#f59e0b"
                    title={latePolicy.policy_name}
                    text={latePolicy.summary}
                />
            ) : null}
        </div>
    );
}
