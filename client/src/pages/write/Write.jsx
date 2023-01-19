import React, { useState } from 'react';
import WriteImage from '../../assets/write.jpg';
import './write.css';

import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import JwtDecoder from '../../context/DecodeToken';
import { projectStorage } from '../../firebase/config';

const Write = () => {
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Music');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null);
  const [flag, setFlag] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [isdisabled, setIsDisabled] = useState(false);


  const user = JwtDecoder(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);

    const newPost = {
      title,
      category,
      desc,
      username: user.username
    }

    if(photo){
      // const data = new FormData();
      // const filename = Date.now() + "-"+ photo.name;

      // data.append("name",filename);
      // data.append("photo", photo);
      // // console.log(data)
      
      // try {
        
      //   const response = await axios.post(`/api/upload`,data);
      //   newPost.photo = response.data;

      // } catch (error) {
      //   setFlag(error.message);
      //   console.log(error);
      // }

       /* using firebase */
          
       const storageRef = ref(projectStorage, photo.name);
       const updateTask = uploadBytesResumable(storageRef, photo);

       updateTask.on('state_changed', (snap) =>{
         let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
         setPercentage(percentage)
       },(err) => {
         setFlag(err)
       },
       ()=> {


         getDownloadURL(updateTask.snapshot.ref)
         .then((url) => {
       
           newPost.photo = url;
           axios.post(`/api/posts`, newPost)
           .then((response) => {
     
             console.log(response)
             window.location.replace("/post/"+response.data._id);
           })
           .catch((error) => {
            setFlag(error)
           })

         });

       });

    }else{

      axios.post(`/api/posts`, newPost)
      .then((response) => {

        console.log(response)
        window.location.replace("/post/"+response.data._id);
      })
     

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

        {
          percentage > 0 &&
          (
            <div className="percentage">
              <progress value={percentage}  max={100}></progress>
              {Math.round(percentage)}%
            </div>
          )
        }
        
        
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


        {
          !isdisabled &&
          <button className='writeSubmit'>Publish</button>
        }


      
      </form>

      <p>{flag ? flag: null }</p>
    
    </div>
  )
}

export default Write