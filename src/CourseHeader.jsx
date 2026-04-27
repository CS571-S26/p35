import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useCurrentSyllabus } from './context/AllSyllabiContext'


export default function SyllabusNavigationBar() {
    const currentSyllabus = useCurrentSyllabus();

    if (!currentSyllabus) {
        return (
            <div style={{ margin: '10px' }}>
                <h2 style={{ fontWeight: 'bold' }}>Loading...</h2>
            </div>
        );
    }

    const code = currentSyllabus.course_code 
    const title = currentSyllabus.course_title

    console.log(currentSyllabus)
    return (
        <div style={{ margin: '10px' }}>
            {code ? <h2 style={{ fontWeight: 'bold' }}>{code}</h2> : <></>}
            {title ? <h6>{currentSyllabus.course_title}</h6> : <></>}
        </div>
    );
}