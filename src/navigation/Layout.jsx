import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Sidebar from './Sidebar/Sidebar';
import SyllabusNavigationBar from './Sidebar/SyllabusNavigationBar'
import CourseHeader from './CourseHeader'
import { useSyllabi } from '../context/AllSyllabiContext';

export default function Layout() {
    const { allSyllabi } = useSyllabi();
    const hasSyllabi = allSyllabi.length > 0;

    return (
        <div className="vh-100 d-flex overflow-hidden">
            {/* Primary sidebar (left): This will populate with syllabi*/}
            <Sidebar />


            {/* Right pane: secondary top nav + page content */}
            <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                {hasSyllabi && (
                    <div>
                        <CourseHeader />
                        <SyllabusNavigationBar />
                    </div>
                )}
                <main className="flex-grow-1 p-4 overflow-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}
