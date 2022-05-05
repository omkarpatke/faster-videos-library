import React from 'react';
import { SideBar, CategoryBar } from '../../components/index';
import './HomePage.css';

export function HomePage() {
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <CategoryBar />
    <div>HomePage</div>
    </div>
    </div>
  )
}
