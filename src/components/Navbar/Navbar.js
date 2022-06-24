import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useUserAuth, useToastContext, useVideos } from '../../context/index';


export function Navbar(props) {
  const { isLogIn , setIsLogIn }  = useUserAuth();
  const { videoDispatch } = useVideos();
  
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
        {props.searchBar
        ? <input type="search" name="search" id="search" onChange={e => videoDispatch({type:"USER_SEARCHED_VIDEOS" , payload:e.target.value})} className='search-input'></input>
        : null
         }
        <i className="search-icon lni lni-search-alt" title='Search'></i>
        {isLogIn 
        ? <div className="logout-btn" onClick={logoutHandler}>Logout</div>
        : <Link className="login-link" to='/login'>Login</Link>
        }
    </nav>
    </>
  )
}
