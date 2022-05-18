import React from 'react';
import { useVideos } from '../../context/videosContext';
import './category.css';

export function CategoryBar() {
  const { setToggleTab, toggleTab }  = useVideos();

  const toggleTabHandler = tab => {
    setToggleTab(tab);
  }

  const activeStyle = {
    backgroundColor:'#000',
    color:'#fff',
  }

  const normalStyle = {
    backgroundColor:'#e7e2e2',
  }


  return (
      <>
    <div className='catergories'>
      <span style={toggleTab === 'All' ? activeStyle : normalStyle } onClick={() => toggleTabHandler('All')} className='category'>All</span>
      <span style={toggleTab === 'html' ? activeStyle : normalStyle } onClick={() => toggleTabHandler('html')} className='category'>Html</span>
      <span style={toggleTab === 'css' ? activeStyle : normalStyle } onClick={() => toggleTabHandler('css')} className='category'>CSS</span>
      <span style={toggleTab === 'javascript' ? activeStyle : normalStyle } onClick={() => toggleTabHandler('javascript')} className='category'>JavaScript</span>
    </div>
    <div className='border-bottom'></div>
    </>
  )
}
