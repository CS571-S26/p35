import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

export default function Sidebar(props) {
    return (

            <aside
                className="bg-light border-end p-3 flex-shrink-0"
                style={{ width: '250px', minWidth: '250px' }}
            >
                <Navbar.Brand as={Link} to="/" className="mb-0">Syllabus Analyzer</Navbar.Brand> 
                
                <div>
                    
                </div>
            </aside>

    );
}
