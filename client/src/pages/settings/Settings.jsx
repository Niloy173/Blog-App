import React, { useContext, useState } from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import Sidebar from '../../components/sidebar/SideBar'
import JwtDecoder from '../../context/DecodeToken'

import './settings.css'

// import no-image
import axios from 'axios'

// import no-image
import noUser from '../../assets/7612643-nophoto.png'
import { Context } from '../../context/Context'

const Settings = () => {
  

  const {user, dispatch} = useContext(Context)
  const userInformation = JwtDecoder(user);
  const [flag, setFlag] = useState(false);
  const [errors, setErros] = useState({});

  const InitialValue = { username: '', email: '', password: '',profilePicture:''}
  const [formData, setFormData] = useState(InitialValue);


  const handler = (e) => {
    const {name,value} = e.target;

      if(name === "profilePicture"){
        
        setFormData({...formData, [name]: e.target.files[0]})
        
      }else{
       setFormData({...formData, [name]: value});
      }
    }
  

    

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const errors = {};
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

    if(formData.username){

      if(formData.username.length < 4){
        errors.username = 'Username is too short or empty'
      }
    }

    if(formData.email){

      if(!regex.test(formData.email)){
        errors.email = 'Invalid email address'
      }
    }

    if(formData.password){

      if(formData.password.length < 4 || formData.password.length > 10) {
        errors.password = 'password must be with in (4-9) characters'
      }
    }

    if(Object.keys(errors).length === 0){

        if(formData.profilePicture){
          
          const data = new FormData();
          data.append('image',formData.profilePicture);

        
            try {
              const response = await fetch("/api/upload",{
                method : 'POST',
                body: data
              });

              const result = await response.json();
              console.log(result);
              formData.profilePicture = result.response['secure_url'];
              
            } catch (error) {
              setFlag(error.message);
              console.log(error);
              
            }
          }else{
            formData.profilePicture = userInformation.profile;
          }
        
        formData.username = formData.username ? formData.username : userInformation.username;
        formData.email = formData.email ? formData.email : userInformation.useremail;
    
        try {
    
          console.log(formData);
          await axios.put(`/api/user/${userInformation.userid}`,formData);
          //dispatch({ type: 'LOG_OUT'});
    
        } catch (error) {
          setFlag(error.response.message);
        }
    }else{
      setErros(errors);
    }
    
    
  }

 


  return (
    
    <div className='settings'> 
    
      <div className="settingsWrapper">
      
        <div className="settingsTitle">
        
          <span className="settingsUpdateTitle">Update Your Account</span>
          {/*<span className="settingsDeleteTitle">Delete Account</span>*/}

        </div>
        <p>{flag?flag:null}</p>

        <form onSubmit={handleSubmit}   className="settingsForm">
        
          <label>Profile Picture</label>
          <div className="settingsProfilePic">
          
           {
            formData.profilePicture ?
            ( <img src={URL.createObjectURL(formData.profilePicture)}
              alt='updatedUser' />):
            (
              userInformation.profile?
              (<img src={userInformation.profile} alt="profilePicture" />)
              :<img src={noUser} alt="noUser" />
            )
           }
          
          <label htmlFor='fileInput'>
            <AiOutlineUserAdd  title='change your profile' className='settingsProfileIcon'>Change your profile</AiOutlineUserAdd>
            
          </label>

          <input accept='.jpg, .jpeg, .png' onChange={handler} name="profilePicture" type={"file"} id={"fileInput"} style={{display: "none"}} />

          </div>


          <label>Username</label>
          <input type={"text"} placeholder={userInformation.username} name="username"
          onChange={handler}
          />
          <p style={{color: 'red'}} >{errors.username}</p>

          <label>Email</label>
          <input type={"email"} placeholder={userInformation.useremail} name="email"
          onChange={handler}
          />
          <p style={{color: 'red'}} >{errors.email}</p>

          <label>password</label>
          <input type={"password"} placeholder={"password must be with in (4-9) characters"} name="password" 
          onChange={handler}/>
          <p style={{color: 'red'}} >{errors.password}</p>

          
           
        {
          Image || formData.email || formData.password || formData.username ?
          (<button type='submit'>update</button>):null
        }
             
          

          
        </form>

      
      </div>

      <Sidebar/>
    
    </div>
  )
}

export default Settings