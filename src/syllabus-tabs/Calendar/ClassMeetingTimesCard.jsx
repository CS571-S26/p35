import React from "react";
import { Badge, Card, Table } from "react-bootstrap";
import AddToCalendar from "../../functions/addToCalendarButton";

const DAY_INDEXES = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
};

const RRULE_DAYS = {
    Sunday: "SU",
    Monday: "MO",
    Tuesday: "TU",
    Wednesday: "WE",
    Thursday: "TH",
    Friday: "FR",
    Saturday: "SA"
};

function toIsoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function toRruleUntil(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}T235959Z`;
}

function getTermStartDate(season, year) {
    const normalizedSeason = season?.toLowerCase();
    const numericYear = Number(year) || new Date().getFullYear();

    if (normalizedSeason === "fall") {
        return new Date(numericYear, 8, 1);
    }

    if (normalizedSeason === "summer") {
        return new Date(numericYear, 5, 1);
    }

    return new Date(numericYear, 0, 15);
}

function getFirstMeetingDate(dayOfWeek, season, year) {
    const date = getTermStartDate(season, year);
    const targetDay = DAY_INDEXES[dayOfWeek];

    if (targetDay === undefined) {
        return null;
    }

    const daysToAdd = (targetDay - date.getDay() + 7) % 7;
    date.setDate(date.getDate() + daysToAdd);

    return date;
}

function getTermEndDate(importantDates, season, year) {
    const dateValues = (Array.isArray(importantDates) ? importantDates : [])
        .map((item) => item?.date_iso)
        .filter(Boolean)
        .map((dateIso) => new Date(`${dateIso}T00:00:00`))
        .filter((date) => !Number.isNaN(date.getTime()));

    if (dateValues.length > 0) {
        return new Date(Math.max(...dateValues.map((date) => date.getTime())));
    }

    const fallbackEnd = getTermStartDate(season, year);
    fallbackEnd.setDate(fallbackEnd.getDate() + 112);
    return fallbackEnd;
}

export function ClassMeetingTimesCard(props) {
    const classSessions = props.classSessions ?? [];
    const importantDates = props.importantDates ?? [];
    const termEndDate = getTermEndDate(importantDates, props.semesterSeason, props.semesterYear);

    return (
        <Card className="h-100">
            <Card.Body className="p-4 p-md-5">
                <Card.Title className="h4 mb-4">Class Sessions</Card.Title>
                {classSessions.length === 0 ? (
                    <p className="mb-0 text-muted">No class sessions found.</p>
                ) : (
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="text-muted fw-normal py-3 px-4 border-bottom">Type</th>
                                <th className="text-muted fw-normal py-3 px-4 border-bottom">Day</th>
                                <th className="text-muted fw-normal py-3 px-4 border-bottom">Time</th>
                                <th className="text-muted fw-normal py-3 px-4 border-bottom text-end">Add to Calendar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classSessions.map((session, index) => {
                                const isLastRow = index === classSessions.length - 1;
                                const cellClass = `px-4 py-3 align-middle ${isLastRow ? "border-bottom-0" : ""}`;
                                const firstMeetingDate = getFirstMeetingDate(
                                    session.day_of_week,
                                    props.semesterSeason,
                                    props.semesterYear
                                );
                                const recurrenceDay = RRULE_DAYS[session.day_of_week];
                                const canAddToCalendar = firstMeetingDate && recurrenceDay;

                                return (
                                    <tr key={`${session.type}-${session.day_of_week}-${index}`}>
                                        <td className={cellClass}>
                                            <Badge bg="primary" className="fw-semibold">
                                                {session.type ?? "Class"}
                                            </Badge>
                                        </td>
                                        <td className={`${cellClass} fw-semibold text-dark`}>
                                            {session.day_of_week ?? "TBD"}
                                        </td>
                                        <td className={cellClass}>
                                            {session.start_time_24h && session.end_time_24h
                                                ? `${session.start_time_24h} - ${session.end_time_24h}`
                                                : "TBD"}
                                        </td>
                                        <td className={`${cellClass} text-end`}>
                                            {canAddToCalendar ? (
                                                <AddToCalendar
                                                    event={session.type ?? "Class Session"}
                                                    date={toIsoDate(firstMeetingDate)}
                                                    startTime={session.start_time_24h}
                                                    endTime={session.end_time_24h}
                                                    recurrenceRule={`FREQ=WEEKLY;BYDAY=${recurrenceDay};UNTIL=${toRruleUntil(termEndDate)}`}
                                                    variant="outline-primary"
                                                    size="sm"
                                                    buttonText="Add"
                                                />
                                            ) : (
                                                <span className="text-muted">Unavailable</span>
                                            )}
                                        </td>
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
