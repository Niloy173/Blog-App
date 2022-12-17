import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../context/Context'
import JwtDecoder from '../../context/DecodeToken'
import './singlepost.css'



const SinglePost = () => {
 
  // update mode;
  const [desc, setDesc] = useState('');
  const [title,setTitle] = useState('');
  const [flag,setFlag] = useState(false);
  const [singlePost, setSinglePost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);

  // const PF = "http://localhost:5000/Images/";
  const PF = "https://blog-application-3ytw.onrender.com/Images/";
  const locattion = useLocation();
  const pathid = locattion.pathname.split("/")[2];
  let {user} = useContext(Context);
  let owner;

  useEffect(() => {

    const fetch_single_post = async () => {
      const response_single_post = await axios.get(`/api/posts/${pathid}`);
      setSinglePost(response_single_post.data);
      setDesc(response_single_post.data.desc);
      setTitle(response_single_post.data.title);
    }

    fetch_single_post();

  },[pathid]);
  


  if(user){
    owner = JwtDecoder(user);
  }

  const handleDelete = async (e) => {
     try {

     
     await axios.delete(`/api/posts/delete-post/${pathid}`,
      {
        headers: {
          'Authorization': user
        },
        data: {username: owner.username}
      });
      window.location.replace("/");

     } catch (error) {
      setFlag(true);
      console.log(error)
     }
  }

  const handleUpdate = async (e) => {
   
    try {
      
    const response = await axios.put(`/api/posts/update-post/${pathid}`,
    {
      username: owner.username,
      title,
      desc
    },{
      headers:{
        'authorization': user
      }
    });

      setSinglePost(response.data)
      setUpdateMode(false);

    } catch (error) {
      setFlag(true);
      console.log(error);
    }

  }

  const handleCancel = () =>{
    setUpdateMode(false);
  }

  

  return (
    <div className='singlePost'>
    
      <div className="singlePostWrapper">
      
          {
            singlePost.photo &&
            (<img src={PF + singlePost.photo}
            alt={singlePost.photo} className="singlePostImg" />)
          }

          {
            updateMode?
            (
              <input type={"text"} value={title} 
              onChange={(e) => setTitle(e.target.value)} />
            ):
            <div>

            <h1 className="singlePostTitle">
            {singlePost.title}
            {singlePost.username === owner?.username && 
              (
                <div className="singlePostEdit">
                  <AiOutlineEdit title='edit' className='singlePostIcon' onClick={(e) => setUpdateMode(true) }/>
                  <AiOutlineDelete title='delete' className='singlePostIcon' onClick={handleDelete}/>
                </div>
            )}
            
            </h1>
             

                
            </div>
          }

          <div className="singlePostInfo">

                <span className='singlePostAuthor'>Author: <b>
                
                <Link className='link' to={`/?username=${singlePost.username}`}>{singlePost.username}</Link>
                
                </b></span>
                <span className="singlePostDate">{ new Date(singlePost.createdAt).toDateString()}</span>
    
           </div>

          {
            updateMode?
            (
              <div>

              <textarea value={desc}
              onChange={(e) => setDesc(e.target.value)}
              /><br/>

              <div className='btn-action'>

                <button onClick={handleUpdate}>update</button>
                <button onClick={handleCancel}>Cancel</button>

              </div>
              
              </div>
            ):
            (
              <textarea value={singlePost.desc} className='singlePostDesc' style={{height: desc && desc.length / 2 }}>
             
             </textarea>
            )
          }
         

           
      </div> 
      
      <p>
          {
            flag? flag: null
          }
      </p>
    </div>
  )
}

export default SinglePost