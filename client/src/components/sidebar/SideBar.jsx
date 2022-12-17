import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsDiscord, BsFacebook, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './sidebar.css';

//sidebar image
import SidebarImage from '../../assets/sidebar.jpg';
const SideBar = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
    const fetch_all_category = async () => {
      const response = await axios.get(`/api/posts`);
      const category_arr = [];

      if(Array.isArray(response.data)){

        response.data.forEach(e => {
        
          if(category_arr.indexOf(e.category) === -1){
  
            category_arr.push(e.category)
          }
      })

      setCategories(category_arr)
    }
    



      
        
      }
      
    

    fetch_all_category()
  },[]);
  
  return (
   
    <div className='sidebar'>
    
      <div className='sidebarItem'>
      
        <span className='sidebarTitle'>ABOUT ME</span>
        <img src={SidebarImage} alt='aboutImage' />
        
        <p>
          A blog (short for “weblog”) is an online journal or informational website run by an individual, group, or corporation that offers regularly updated content (blog post) about a topic. It presents information in reverse chronological order and 
          it's written in an informal or conversational style
        </p>
        
      </div>

      <div className='sidebarItem'>
      
        <span className='sidebarTitle'>CATEGORIES</span>

        <ul className='sidebarList'>
        
            
         {
          categories.length ? categories.map(category => (
            <li key={category.toString()} className='sidebarListItem'>
              <Link className='link' to={`/?category=${category}`}>{category}</Link>
            </li>
          )): 'no category found'
         }

        
        </ul>

      </div>

      <div className='sidebarItem'>
      
        <span className='sidebarTitle'>FOLLOW US</span>
        <span className='sidebarSocial'>
        
        
        <BsFacebook className='sidebarIcon'/>
        <BsTwitter className='sidebarIcon'/>
        <BsDiscord className='sidebarIcon'/>

        
        </span>
      </div>
    
    </div>
  )
}

export default SideBar