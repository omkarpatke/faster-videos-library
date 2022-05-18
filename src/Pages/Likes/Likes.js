import React from 'react';
import './Likes.css';
import { SideBar , CategoryBar } from '../../components/index';

export function Likes() {
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <CategoryBar />
    <div>Likes Page</div>
    </div>
    </div>
  )
}
