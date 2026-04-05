import React from 'react';
import { Button } from 'react-bootstrap';

export default function SyllabusButton({ course, isActive, index, onChangeSyllabus }) {
    return (
        <Button
            key={`${course.course_code}-${index}`}
            variant={isActive ? 'dark' : 'outline-secondary'}
            className="w-100 text-start mb-2"
            onClick={() => onChangeSyllabus(index)}
        >
            {course.course_code}
        </Button>
    );
}
