import { motion } from 'framer-motion';
import React from "react";
import { Link } from 'react-router-dom';
import './post.css';



const Post = ({post}) => {

  return (
   
    <motion.div 
    initial={{ opacity: 0}}
    animate={{ opacity: 1 }}
    transition={{ delay: 1}} 
    className="post" layout>
      
     {post.photo && 
      ( <motion.img 
        
      className="postImg"
      src={post.photo}
      alt={"PostImage"}
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

    </motion.div>
  )
}

export default Post;