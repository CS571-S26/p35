import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default function SyllabusNavigationBar() {
    const location = useLocation();
    const activeTab = location.pathname.split('/').filter(Boolean).at(-1) ?? 'overview';

    const tabs = [
        { to: 'overview', label: 'Overview' },
        { to: 'calendar', label: 'Calendar' },
        { to: 'staff', label: 'Staff' },
        { to: 'grading', label: 'Grading' },
        { to: 'what-if', label: 'What-If Calculator' },
        { to: 'more', label: 'More' }
    ];

    return (
        <Navbar className="border-bottom px-1 flex-shrink-0">
            <Nav className="flex-row gap-2">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.to || (activeTab === 'p35' && tab.to === 'overview');

                    return (
                        <Nav.Link
                            key={tab.to}
                            as={Link}
                            to={tab.to}
                            className={isActive ? 'text-primary fw-semibold' : 'text-dark'}
                            style={isActive ? { borderBottom: '3px solid #0d6efd' } : undefined}
                        >
                            {tab.label}
                        </Nav.Link>
                    );
                })}
            </Nav>
        </Navbar>

    );
}
