import React from 'react';
import './WatchLater.css';
import { SideBar , CategoryBar } from '../../components/index';

export function WatchLater() {
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <CategoryBar />
    <div>Watch Later Page</div>
    </div>
    </div>
  )
}
