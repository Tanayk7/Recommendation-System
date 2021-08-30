import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const { authenticated, logoutUser } = useContext(AppContext);
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className='navbar'>
            <div className="navbar-left">
                <Link to='/'>
                    <div className="logo">
                        <span className='w2'>W2</span>Watch
                    </div>
                </Link>
                {
                    path !== '/login' && path !== '/signup' &&
                    <div className="search-bar">
                        <i className='bx bx-search-alt-2 search-bar-icon'></i>
                        <input type="text" placeholder='Search movies' className='search-bar-input'/>
                    </div>
                }
            </div>
            <div className="navbar-right">
                <div className="nav-links">
                    <Link to="/" style={{textDecoration:"none"}}>
                        <a className="nav-link nav-link-active">Home</a>    
                    </Link>
                </div>
                {
                    authenticated ?
                    <>
                        <div className="avatar">
                            T
                        </div>
                        <button className="logout-button" onClick={logoutUser}>
                            logout
                        </button>
                    </>
                    :
                    <>
                        <Link to='/login'>
                            <button className='login-button'>
                                login
                            </button>
                        </Link>
                        <Link to='/signup'>
                            <button className='signup-button'>
                                signup
                            </button>
                        </Link>
                    </>
                }   
            </div>
        </div>
    );
}

export default Navbar;
