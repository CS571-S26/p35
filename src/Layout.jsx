import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Layout = () => {
  return (
    // vh-100 makes the container the full height of the screen
    // d-flex flex-column stacks the topbar and the body vertically
    <div className="vh-100 d-flex flex-column">
      
      {/* 1. Top Navigation Bar */}
      <Navbar bg="dark" variant="dark" className="flex-shrink-0">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">My Dashboard</Navbar.Brand>
        </Container>
      </Navbar>

      {/* 2. Body Container (Sidebar + Content) */}
      {/* overflow-hidden prevents the entire page from scrolling, keeping the top bar fixed */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        
        {/* Sidebar */}
        <Nav 
          className="flex-column bg-light border-end p-3 flex-shrink-0" 
          style={{ width: '250px' }}
        >
          <Nav.Link as={Link} to="/" className="text-dark">Home</Nav.Link>
          <Nav.Link as={Link} to="/reports" className="text-dark">Reports</Nav.Link>
          <Nav.Link as={Link} to="/settings" className="text-dark">Settings</Nav.Link>
        </Nav>

        {/* 3. Main Content Area */}
        {/* flex-grow-1 makes it take the remaining width. overflow-auto allows just this section to scroll */}
        <main className="flex-grow-1 p-4 overflow-auto">
          <Outlet /> 
        </main>
        
      </div>
    </div>
  );
};

export default Layout;