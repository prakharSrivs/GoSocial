import React, { useState } from 'react'
import './Header.css'
import { Navigate, useNavigate } from 'react-router-dom';

function Header() {

  const [authStatus,setAuthStatus]=useState("Log In");
  const navigate = useNavigate()

  if(localStorage.getItem("authorization") && authStatus!="Log Out")  setAuthStatus("Log Out")

  const handleLogout = ()=>{
    if(authStatus=="Log Out")
    {
      localStorage.removeItem("authorization");
      localStorage.removeItem("username");
      localStorage.removeItem("profile")
      setAuthStatus("Log In")
    }
    else if(authStatus=="Log In")
    {
      navigate("/user/login")
    }
  }

  return (
    <div className='headerContainer'>
        <img className='logo' src='/logoOnBoarding.png' />
        <div className="headerLinks">
            <div className="createPostButton" onClick={()=> navigate('/post/create')}>
                <img src='/addPost.svg' className='headerLink' />
            </div>
            <div className="searchPostsButton">
                <img src='/search.png' className='headerLink' />
            </div>
            <button className='authFormActionButton authBoxText' onClick={handleLogout}>{authStatus}</button>
        </div>
    </div>
  )
}

export default Header