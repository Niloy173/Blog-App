import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './home.css'

// components
import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import SideBar from '../../components/sidebar/SideBar'

const Home = () => {

  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  

  useEffect(() => {

    const fetch_all_post = async () => {

      const response = await axios.get(`/posts`+search);
      setPosts(response.data);

    }

    fetch_all_post();

  },[search]);

  return (
   
    <>
    
     <Header/>
     <div className='home'>
     
      <Posts posts={posts}/>
      <SideBar/>
     </div>
    
    </>
   
  );
}

export default Home