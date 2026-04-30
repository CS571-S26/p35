import React from 'react';

export default function Resource({ color = '#1f5be6', name, type, details, isbn, link }) {
    return (
        <div
            className="p-3 h-100"
            style={{
                border: '1px solid #e5e4e7',
                borderLeft: `6px solid ${color}`,
                borderRadius: '8px',
                backgroundColor: '#fff'
            }}
        >
            <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap mb-2">
                <h3 className="h6 mb-0" style={{ color, fontWeight: 700 }}>
                    {name ?? 'Resource'}
                </h3>
                {type ? (
                    <span
                        className="small fw-semibold text-uppercase"
                        style={{ color }}
                    >
                        {type}
                    </span>
                ) : null}
            </div>

            {details ? (
                <p className="mb-2 text-secondary">{details}</p>
            ) : null}

            {isbn ? (
                <p className="mb-2 text-secondary small">ISBN: {isbn}</p>
            ) : null}

            {link ? (
                <a href={link} target="_blank" rel="noreferrer">
                    Open resource
                </a>
            ) : null}
        </div>
    );
}
