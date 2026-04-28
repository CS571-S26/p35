import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function SyllabusButton({ course, isActive, index, onChangeSyllabus, onRemoveSyllabus, onViewPdf }) {
    const hasPdf = Boolean(course.uploaded_pdf_data_url);
    const viewIcon = `${import.meta.env.BASE_URL}icons/view.png`;
    const closeIcon = `${import.meta.env.BASE_URL}icons/close.png`;

    return (
        <Card className={`mb-2 ${isActive ? 'border-dark' : ''}`}>
        <Card.Body className="p-2">
        <Button
            key={`${course.course_code}-${index}`}
            variant={isActive ? 'dark' : 'outline-secondary'}
            className="w-100 text-start mb-2"
            onClick={() => onChangeSyllabus(index)}
        >
            {course.course_code}
        </Button>

                <div className="d-flex gap-2 justify-content-end">
                    <Button
                        variant="link"
                        className="p-0 border-0"
                        disabled={!hasPdf}
                        onClick={() => onViewPdf(index)}
                        aria-label="View syllabus PDF"
                        title="View syllabus"
                    >
                        <img
                            src={viewIcon}
                            alt="View syllabus"
                            style={{ width: '22px', height: '22px', objectFit: 'contain', opacity: hasPdf ? 1 : 0.45 }}
                        />
                    </Button>

                    <Button
                        variant="link"
                        className="p-0 border-0"
                        onClick={() => onRemoveSyllabus(index)}
                        aria-label="Remove syllabus"
                        title="Remove syllabus"
                    >
                        <img
                            src={closeIcon}
                            alt="Remove syllabus"
                            style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                        />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
