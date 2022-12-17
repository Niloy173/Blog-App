import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import './login.css';

import { useNavigate } from 'react-router-dom';

// context file
import { loginSuccess } from '../../context/Action';
import { Context } from '../../context/Context';

const Login = () => {

  const Navigate = useNavigate();
  const emailRef = useRef('');
  const passRef = useRef('');
  const [flag,setFlag] = useState(false);

  const {dispatch, isFetching} = useContext(Context);

  const delay = (number) => {
    return new Promise(res => setTimeout(res,number));
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START'});
    try {

      const response = await axios.post(`/api/auth/login`,{
        email: emailRef.current.value,
        password: passRef.current.value
      });
  
      await delay(500)
      dispatch(loginSuccess(response.data));
      Navigate("/") // go to home
      

    } catch (error) {
      setFlag(error.response.data);
      dispatch({ type: 'LOGIN_FAILURE'});
    }
    
    // console.log(isFetching);
  }
  return (
   
    <div>
    
    {/*<nav id="navbar"  >

    <div 
     className="logo"><Link className='link' to={"/"} >LOGO</Link></div>

  </nav>*/}

  
    <div className="" id="login_section">

      <div id="firstContent" className="content">

        <div id="register1"  className="registartion_page">
          <h2> Sign in To Your Account</h2>
          <p> Required Information </p>
    
          <form  onSubmit={handleSubmit} className="LoginFrom"  action="" method="post">

            <p style={{color: 'red'}}>{ flag ? flag: null }</p>
    
            <label  htmlFor="Email"><b className="email">Email Address</b></label>
            <input ref={emailRef} id="uemail" className='emailclass' type="text" placeholder="Enter Email Address" name="email" required />
    
    
            <label  htmlFor="Password"><b className="pass">Password</b></label>
            <input ref={passRef} id="upass" className='passclass' type="password" placeholder="Enter Password" name="password" required />
    
    
            <div className="submit">
              <button type="submit" disabled={isFetching}>Login</button>
    
            </div>
            <div className="container">
              <span className="">Forget Password ?</span>
            </div>
          </form>
        </div>
  
  
       
  
        <div id="another1"  className="another_page">
  
          <h2 id="no_account"> Don't Have a account ? </h2>
          
  
          <p id="sign_in_reg"> Register For free and start your jourey </p>
  
          <button id="register_btn" onClick={() => Navigate("/register")}> Register for free </button>
  
        </div>
      </div>
    </div>
    
    </div>
  )
}

export default Login