import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';


export function SideBar() {

const activeStyle = ({isActive}) =>  {
    return {
      fontWeight : isActive ? "600" : "500",
      backgroundColor: isActive ? '#e4e1e1' : '',
    }
}

  return (
    <>
    <div className="sidebar-links">
      <NavLink style={activeStyle} className='sidebar-link' title='Home' to='/'><i className="fa-solid fa-house"></i> <span className='link-content'>Home</span> </NavLink>
      <NavLink style={activeStyle} className='sidebar-link' title='Likes' to='/likes'><i className="fa-solid fa-thumbs-up"></i> <span className='link-content'>Likes</span></NavLink>
      <NavLink style={activeStyle} className='sidebar-link' title='Watch Later' to='/watch-later'><i className="fa-solid fa-clock"></i><span className='link-content'>Watch Later</span></NavLink>
      <NavLink style={activeStyle} className='sidebar-link' title='History' to='/history'><i className="fa-solid fa-clock-rotate-left"></i><span className='link-content'>history</span></NavLink>
    </div>
    </>
  )
}
