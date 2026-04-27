import React from 'react';
import { Outlet, Link, useMatch } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default function SyllabusNavigationBar() {


    return (
        <Navbar className="border-bottom px-1 flex-shrink-0">
            <Nav className="flex-row gap-2">
                <Nav.Link as={Link} to="overview" className="text-dark" >Overview</Nav.Link>
                <Nav.Link as={Link} to="calendar" className="text-dark" >Calendar</Nav.Link>
                <Nav.Link as={Link} to="staff" className="text-dark">Staff</Nav.Link>
                <Nav.Link as={Link} to="grading" className="text-dark">Grading</Nav.Link>
                <Nav.Link as={Link} to="more" className="text-dark" >More</Nav.Link>
            </Nav>
        </Navbar>

    );
}