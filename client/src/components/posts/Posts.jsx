import React from 'react';
import './posts.css';

import Post from '../post/Post';

const Posts = ({posts}) => {

  return (
    <div className='posts'>

      {
        Array.isArray(posts) && posts.length > 0 ? posts.map(eachPost => (
          <Post key={Math.random()} post={eachPost} />
        )): 'Currently no post avaliable'
      }


    </div>
  )
}

export default Posts