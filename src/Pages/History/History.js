import React from 'react';
import './History.css';
import { SideBar , CategoryBar } from '../../components/index';

export function History() {
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <CategoryBar />
    <div>History Page</div>
    </div>
    </div>
  )
}
