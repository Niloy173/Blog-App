import axios from 'axios';
import React, { useState } from 'react';
import './register.css';

import { useNavigate } from 'react-router-dom';

const Register = () => {

  const InitialValue = { username: '', email: '', password: ''};
  const [formData, setFormData] = useState(InitialValue);
  const [Errors, setErrors] = useState({});
  const [flag,setFlag] = useState(false);
  
  const Navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    if(!formData.username){
      errors.username = "Username is required";
    }
    if(!formData.email){
      errors.email = "Email is required";
    }else if(!regex.test(formData.email)){
      errors.email = 'Invalid email address'
    }

    if(!formData.password){
      errors.password = "Password is required"
    }else if(formData.password.length < 4 || formData.password.length > 10) {
      errors.password = "Password must be with in (4-9) characters"
    }


    
    
    if(Object.keys(errors).length === 0){
     
      try {

        const response = await axios.post(`/auth/register`,formData);
        response.data && window.location.replace("/login");
        
      } catch (error) {

        setFlag(error.response.data)
        setFormData(InitialValue);
        
      }
    }else{
      setErrors(errors);
    }
    
  }

  const handler = (e) => {
    const {name,value} = e.target;
    
    setFormData({...formData, [name]: value});
    
  }
  


  return (
  
  <div className="" id="register_section">
    <div id="secondContent" className="content_clone">

      <div id="register2"  className="register_page_clone">
  
  
        <h2> Create Your Account </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa temporibus molestias consequatur ad voluptatem doloribus, perspiciatis quidem dolorem ipsum 
          fugiat corporis tempore iusto omnis est laboriosam labore ducimus debitis. Iste!</p>

          <p style={{color: 'red'}}>{ flag ? flag: null}</p>
          
    
          <form onSubmit={handleSubmit} className="regFrom"  action="" method="post">

    
            <label  htmlFor="name"><b className="name"> Name </b></label><br/>
            <input className='userclass' id="uname" type="text" placeholder="Enter Name" name="username"  
            value={formData.username} onChange={handler}
            /><br/>
            <p style={{color: 'red'}}>{Errors.username}</p>
    
            <label  htmlFor="Email"><b className="email">Email Address</b></label>
            <input className="emailclass"  type="text" placeholder="Enter Email Address" name="email"
            value={formData.email} onChange={handler}
            /><br/>
            <p style={{color: 'red'}} >{Errors.email}</p>
    
            <br/>
            <br/>
    
            <label  htmlFor="Password"><b className="pass"> Create a Password</b></label>
            <input className="passclass" type="password" placeholder="Enter Password" name="password" 
            value={formData.password} onChange={handler}
            /><br/>
            <p style={{color: 'red'}} >{Errors.password}</p>
    
          
            <br/>
            <br/>
            <br/>
           
    
            <div className="submit">
              <button type="submit">Register</button>
    
            </div>

            
          </form>
          
        
      </div>
    
    
      <div id="another2" className="another_page_clone">
    
        
        <h2 id="yes_account" > Already Have a account ? </h2>
    
        <p id="sign_in_p" > Sign in and Continue your journey </p>
    
        <button id="sign_in_btn" onClick={() => Navigate("/login")}> Sign in </button>
    
      </div>
    
    </div>
  </div>
  )
}

export default Register