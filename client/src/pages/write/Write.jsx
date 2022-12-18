import React, { useState } from 'react';
import WriteImage from '../../assets/write.jpg';
import './write.css';

import axios from 'axios';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import JwtDecoder from '../../context/DecodeToken';

const Write = () => {
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Music');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null);
  const [flag, setFlag] = useState(false);

  const user = JwtDecoder(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      category,
      desc,
      username: user.username
    }

    if(photo){
      const data = new FormData();
      const filename = Date.now() + "-"+ photo.name;

      data.append("name",filename);
      data.append("photo", photo);
      // console.log(data)
      
      try {
        
        const response = await axios.post(`/api/upload`,data);
        newPost.photo = response.data;

      } catch (error) {
        setFlag(error.message);
        console.log(error.message);
      }
    }

    try {

      const response = await axios.post(`/api/posts`, newPost);
      // console.log(response)
      window.location.replace("/post/"+response.data._id);

    } catch (error) {
      setFlag(error.message);
    }

   
  }



  return (
    
    <div className="write">


    {
      photo ?
      (<img src={URL.createObjectURL(photo)}
      alt='coverImage' className='writeImg' />):
      (<img src={WriteImage}
      alt='coverImage' className='writeImg' />)
    }

    
      <form onSubmit={handleSubmit} action="" className='writeForm'>
      
        <div className="writeFormGroup">
        
        
          <label className='fileInput'  htmlFor='fileInput'>
            <BsFillCloudUploadFill className='writeIcon' title='upload photo'/>
          </label>
          <input onChange={(e) => setPhoto(e.target.files[0])}  name='photo' accept='.jpg, .jpeg, .png' style={{display: 'none'}} type={"file"} id={"fileInput"}  />
          <input onChange={(e) => setTitle(e.target.value)} name='title' className='writeInput_' autoFocus={true} type={"text"} placeholder="title" required />
        
        </div>

        <div className='writeFormGroup'>
        
          <select onChange={(e) => setCategory(e.target.value)}  className='writeInput_' name='category'>
            
          <option value={"Music"}>Music</option>
          <option value={"Life"}>Life</option>
          <option value={"Sports"}>Sports</option>
          <option value={"Style"}>Style</option>
          <option value={"Tech"}>Tech</option>
          <option value={"Movie"}>Movie</option>
        
          </select>

        
        
        </div>

        <div className="writeFormGroup">
        
          <textarea onChange={(e) => setDesc(e.target.value)} name='desc' className={"writeInput_ writeText"} type="text"
          placeholder="Tell your story......." required />
        
        </div>


        <button className='writeSubmit'>Publish</button>

      
      </form>

      <p>{flag ? flag: null }</p>
    
    </div>
  )
}

export default Write