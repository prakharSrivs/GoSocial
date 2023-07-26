import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='headerContainer'>
        <img className='logo' src='/logoOnBoarding.png' />
        <div className="headerLinks">
            <div className="createPostButton">
                <img src='/search.png' className='headerLink' />
            </div>
            <div className="searchPostsButton">
                <img src='/addPost.svg' className='headerLink' />
            </div>
        </div>
    </div>
  )
}

export default Header