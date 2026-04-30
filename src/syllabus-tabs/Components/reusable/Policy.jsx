import React from 'react';

export default function Policy({ color = '#1f5be6', title, text }) {
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
            <h3 className="h6 mb-2" style={{ color, fontWeight: 700 }}>
                {title ?? 'Policy'}
            </h3>
            <p className="mb-0 text-secondary">
                {text ?? 'No policy information available.'}
            </p>
        </div>
    );
}
