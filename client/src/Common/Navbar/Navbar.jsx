import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="navbar-left">
                <div className="logo">
                    <span className='w2'>W2</span>Watch
                </div>
                <div className="search-bar">
                    <i className='bx bx-search-alt-2 search-bar-icon'></i>
                    <input type="text" placeholder='Search movies' className='search-bar-input'/>
                </div>
            </div>
            <div className="navbar-right">
                <div className="nav-links">
                    <Link to="/" style={{textDecoration:"none"}}>
                        <a className="nav-link nav-link-active">Home</a>    
                    </Link>
                </div>
                
                <div className="avatar">
                    T
                </div>

                <button className="logout-button">
                    logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;
