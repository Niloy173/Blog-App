import React from 'react';
import './posts.css';

import { CgSearchLoading } from "react-icons/cg";

import Post from '../post/Post';

const Posts = ({posts}) => {

  return (
    <div className='posts'>

      {
        Array.isArray(posts) && posts.length > 0 ? posts.map(eachPost => (
          <Post key={Math.random()} post={eachPost} />
        ))
        : (
          <div className='loading'>
            <div className='icon'><CgSearchLoading className='licon'/></div>
            <div className='msg'>
                <h3>Loading ..........</h3>
                <p>Please wait for some moment</p>
            </div>

          </div>
        )
      }


    </div>
  )
}

export default Posts