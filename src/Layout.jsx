import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import SyllabusNavigationBar from './SyllabusNavigationBar'
import CourseHeader from './CourseHeader'

export default function Layout() {
    return (
        <div className="vh-100 d-flex overflow-hidden">
            {/* Primary sidebar (left): This will populate with syllabi*/}
            <Sidebar />


            {/* Right pane: secondary top nav + page content */}
            <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                <div>
                    <CourseHeader />
                    <SyllabusNavigationBar />
                </div>
                <main className="flex-grow-1 p-4 overflow-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}
