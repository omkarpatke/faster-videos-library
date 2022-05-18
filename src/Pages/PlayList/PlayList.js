import React from 'react';
import { SideBar , CategoryBar } from '../../components/index';
import './PlayList.css';

export function PlayList() {
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <CategoryBar />
    <div>Play List Page</div>
    </div>
    </div>
  )
}
