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
                <Navbar bg="light" className="border-bottom px-3 flex-shrink-0">
                    <Nav className="flex-row gap-2">
                        <Nav.Link as={Link} to="/" className="text-dark">Home</Nav.Link>
                        <Nav.Link as={Link} to="/reports" className="text-dark">Reports</Nav.Link>
                        <Nav.Link as={Link} to="/settings" className="text-dark">Settings</Nav.Link>
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