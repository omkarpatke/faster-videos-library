import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useUserAuth, useToastContext } from '../../context/index';


export function Navbar() {
  const { isLogin, setIsLogIn }  = useUserAuth();
  const notify = useToastContext();
  const navigate = useNavigate();

  const logoutHandler = () => {
    notify('You Are Successfully Logout!' , {type:'success'});
    setIsLogIn(false);
    localStorage.clear();
    navigate('/');
 }
  return (
    <>
    <nav className="navbar">
        <Link to='/' className="brand-logo">Faster Videos</Link>
        <input type="search" name="search" id="search" className='search-input'></input>
        <i className="search-icon lni lni-search-alt" title='Search'></i>
        {isLogin 
        ? <div className="logout-btn" onClick={logoutHandler}>logout</div>
        : <Link className="login-link" to='/login'>Login</Link>
        }
    </nav>
    </>
  )
}
