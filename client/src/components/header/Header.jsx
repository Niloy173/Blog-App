import React from 'react'
import './header.css'

// background Image
import headerBackground from '../../assets/homeBackground.jpg'

const Header = () => {
  return (
    <div className='header'>
      
      <div className='headerTitles'>
      
        <span className='headerTitleSm'>The Only Guide You Need</span>
        <span className='headerTitleLg'>Blog</span>
      
      </div>

      <img className='headerImg' src={headerBackground} alt='headerImage' />

    </div>
  )

  
}

export default Header