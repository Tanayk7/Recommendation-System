import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const { authenticated, logoutUser, searchMovies, search_results } = useContext(AppContext);
    const location = useLocation();
    const path = location.pathname;

    console.log("Search results: ", search_results);

    const handleSearch = (e) => {
        if(e.key === "Enter"){
            if(e.target.value.trim() !== ""){
                searchMovies(e.target.value);
            }
        }
    }

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
                        <input type="text" placeholder='Search movies' className='search-bar-input' onKeyUp={handleSearch}/>
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
