import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { contactCard } from "../../functions/contactCard";

function getInitials(name) {
    const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
        return "?";
    }

    return parts
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

function getRoleVariant(role) {
    const normalizedRole = role?.toLowerCase() ?? "";

    if (normalizedRole.includes("professor") || normalizedRole.includes("instructor")) {
        return "primary";
    }

    if (normalizedRole === "ta" || normalizedRole.includes("teaching assistant")) {
        return "success";
    }

    return "secondary";
}

function DetailRow({ label, children }) {
    if (!children) {
        return null;
    }

    return (
        <div className="py-2 border-top">
            <div className="small text-secondary mb-1">{label}</div>
            <div className="text-dark">{children}</div>
        </div>
    );
}

export function StaffCard(props) {
    const initials = getInitials(props.name);
    const role = props.role ?? "Staff";

    return (
        <Card key={props.email ?? props.name} className="h-100 staff-card">
            <Card.Body className="p-4 d-flex flex-column">
                <div className="d-flex align-items-start gap-3 mb-3">
                    <div
                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "50%",
                            backgroundColor: "#E5EDFF",
                            color: "#2563EB",
                            fontWeight: 800,
                            fontSize: "1.1rem"
                        }}
                    >
                        {initials}
                    </div>

                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <Card.Title className="h5 mb-1 text-truncate">
                            {props.name ?? "Unknown Staff Member"}
                        </Card.Title>
                        <Badge bg={getRoleVariant(role)} className="fw-semibold">
                            {role}
                        </Badge>
                    </div>

                    <Button
                        className="flex-shrink-0"
                        variant="outline-primary"
                        size="sm"
                        onClick={() => contactCard(props)}
                    >
                        Add
                    </Button>
                </div>

                <div className="mb-3">
                    <DetailRow label="Email">
                        {props.email ? <a href={`mailto:${props.email}`}>{props.email}</a> : "Not provided"}
                    </DetailRow>
                    <DetailRow label="Phone">{props.phone}</DetailRow>
                    <DetailRow label="Office">{props.office}</DetailRow>
                    <DetailRow label="Office Hours">{props.officeHours}</DetailRow>
                </div>

            </Card.Body>
        </Card>
    );
}
