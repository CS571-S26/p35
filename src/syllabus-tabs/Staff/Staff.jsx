import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useCurrentSyllabus } from "../../context/AllSyllabiContext";
import { StaffCard } from "./StaffCard";
import { contactCard } from "../../functions/contactCard";

export default function Staff() {
    const currentSyllabus = useCurrentSyllabus();

    if (!currentSyllabus) {
        return <h1>Staff Loading...</h1>;
    }

    const staff = currentSyllabus.staff ?? [];
    const professors = staff.filter((person) => person.role === "Professor" || person.role === "Instructor");
    const tas = staff.filter((person) => person.role === "TA");


    return (
        <div>
            
            <h2 className="h4 mb-3">Instructors</h2>
            {professors.length === 0 ? (
                <p className="mb-4">No instructors listed.</p>
            ) : (
                <Row className="g-3 mb-4">
                    {professors.map((person) => (
                        <Col md={6} key={person.name}>
                            <StaffCard {...person} />
                        </Col>
                    ))}
                </Row>
            )}

            <h2 className="h4 mb-3">Teaching Assistants</h2>
            {tas.length === 0 ? (
                <p>No TAs listed.</p>
            ) : (
                <Row className="g-3">
                    {tas.map((person) => (
                        <Col md={6} key={person.name}>
                            <StaffCard {...person} />
                        </Col>
                    ))}
                </Row>
            )}

            
        </div>





    );
}
