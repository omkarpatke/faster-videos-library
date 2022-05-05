import React from 'react';
import './category.css';

export function CategoryBar() {
  return (
      <>
    <div className='catergories'>
      <span className='category'>All</span>
      <span className='category'>Html</span>
      <span className='category'>CSS</span>
      <span className='category'>JavaScript</span>
    </div>
    <div className='border-bottom'></div>
    </>
  )
}
