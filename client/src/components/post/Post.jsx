import React from "react";
import { Link } from 'react-router-dom';
import './post.css';



const Post = ({post}) => {
  const PF = "http://localhost:5000/Images/";
  return (
   
    <div className="post">
      
     {post.photo && 
      ( <img className="postImg"
      src={PF + post.photo}
      alt={post.photo}
      />
      )}

      <div className="postInfo">

        <div className="postCategories">
          <span className="postCategory"> Category: <b>{post.category}</b></span>
        </div>
        

        <div className="postTitle">
          {post.title}
        </div>

        <span className="postDate">
        {new Date(post.createdAt).toDateString()}
      </span>

        <hr/>


      
      </div>

      <p className="postDesc">
      
      {post.desc.substring(0,200)}
      
      </p>

     

      <div className="learn_more">
      
       <Link className="link" to={`/post/${post._id}`}> <b>Click here to learn more</b></Link>
      
      </div>

    </div>
  )
}

export default Post;