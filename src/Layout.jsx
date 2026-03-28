import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Layout = () => {
    return (
        <div className="vh-100 d-flex overflow-hidden">
            {/* Primary sidebar (left): This will populate with syllabi*/}
            <aside
                className="bg-light border-end p-3 flex-shrink-0"
                style={{ width: '250px', minWidth: '250px' }}
            >
                <Navbar.Brand as={Link} to="/" className="mb-0">Syllabus Analyzer</Navbar.Brand>
            </aside>

            {/* Right pane: secondary top nav + page content */}
            <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                <Navbar bg="light" className="border-bottom px-1 flex-shrink-0">
                    <Nav className="flex-row gap-2">
                        <Nav.Link as={Link} to="/overview" className="text-dark">Overview</Nav.Link>
                        <Nav.Link as={Link} to="/calendar" className="text-dark">Calendar</Nav.Link>
                        <Nav.Link as={Link} to="/staff" className="text-dark">Staff</Nav.Link>
                        <Nav.Link as={Link} to="/grading" className="text-dark">Grading</Nav.Link>
                        <Nav.Link as={Link} to="/more" className="text-dark">More</Nav.Link>
                    </Nav>
                </Navbar>

                <main className="flex-grow-1 p-4 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;