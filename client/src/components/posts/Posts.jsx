import React from 'react'
import './posts.css'

import Post from '../post/Post'

const Posts = ({posts}) => {
  return (
    <div className='posts'>

      {
        posts.map(eachPost => (
          <Post key={Math.random()} post={eachPost} />
        ))
      }


    </div>
  )
}

export default Posts