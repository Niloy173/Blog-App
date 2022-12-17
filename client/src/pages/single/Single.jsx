import React from 'react'
import SideBar from '../../components/sidebar/SideBar'
import SinglePost from '../../components/singlepost/SinglePost'

// css file
import './single.css'

const Single = () => {
  return (
    <div className='single'>
    
      <SinglePost/>
      <SideBar/>
    
    </div>
  )
}

export default Single