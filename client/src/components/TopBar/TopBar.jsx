import React, { useCallback, useContext, useEffect, useState } from 'react'
import './topbar.css'

import { Link } from 'react-router-dom'

//icons
import { AiOutlineMenu } from 'react-icons/ai'
import { BsDiscord, BsFacebook, BsSearch, BsTwitter } from 'react-icons/bs'
import { Context } from '../../context/Context'

// import no-image
import jwtDecode from 'jwt-decode'
import noUser from '../../assets/7612643-nophoto.png'


const TopBar = () => {
  const {user, dispatch} = useContext(Context);
  const [topbarstatus, setTopbarStatus] = useState(false);

  const PF = "http://localhost:5000/Images/";
  let userInformation;
  
  if(user){
    userInformation = jwtDecode(user);
  }

  const handleLogOut = (e) => {
    dispatch({ type: "LOG_OUT"})
  }

  const controllDirection = useCallback((e) => {
    // const window = e.currentTarget;
    if(topbarstatus){
      setTopbarStatus(false)
    }

  },[topbarstatus])

  useEffect(() => {
    window.addEventListener("scroll", controllDirection);

    return () => {
      window.removeEventListener("scroll", controllDirection)
    }
  },[controllDirection])

  return (
    
    <div className='top'>
      <div className='topLeft'>

        <BsFacebook className='topIcon'/>
        <BsTwitter className='topIcon'/>
        <BsDiscord className='topIcon'/>

      </div>
      <div className='topCenter'>
      
      {<AiOutlineMenu className='menu-icon' onClick={() => setTopbarStatus((prevState) => !prevState)}/>}
      <ul className={topbarstatus? 'showTopbar': 'topList'}>
      
        
        <li className='topListItem'><Link className='link' to={"/"}>Home</Link></li>
        <li className='topListItem'><Link className='link'to={"/about"}>About</Link> </li>
        <li className='topListItem'><Link className='link'to={"/write"}>Write</Link></li>
        <li className='topListItem'><Link className='link'to={"/contact"}>Contact</Link></li>
        <li className='topListItem'>
          {user?(<Link className='link' to={"/"} onClick={handleLogOut}>LogOut</Link>):null}
        </li>
  
      </ul>

      
      </div>
      <div className='topRight'>
      
       {
        user?
        (
          userInformation.profile ?
          (<Link className='link' to={"/about"}><img  className='topImg' src={PF + userInformation.profile}
          alt='profileimage' /></Link>)
          :(<Link className='link' to={"/about"}><img  className='topImg' src={noUser}
          alt='profileimage' /></Link>)
        ): <div>
          <ul className="topList-login-register">
            <li className="topListItem"><Link className='link' to={"/login"}>Login</Link></li>
            <li className="topListItem"><Link className='link' to={"/register"}>Rgister</Link></li>
          </ul>
        </div>
       }

        <BsSearch className='topSearchIcon' />
      
      </div>
    </div>
  )
}

export default TopBar