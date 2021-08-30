import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Layout.css';

const Layout = (props) => {
    return (
        <div>
            <Navbar />
            <div style={{paddingLeft:"45px", paddingRight:"45px"}}>
                {props.children}
            </div>
        </div>
    );
}

export default Layout;
