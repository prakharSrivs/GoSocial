import React from 'react'
import './DetailedFeeds.css'
import Header from '../Header/Header'


function DetailedFeeds() {
  return (
    <div className='feedsContainer'>
          <Header />
          <div className="posts">
            <div className="postContainer">
                  <div className="postHeader">
                    <div className="profileImage"><img  src='/demoProfile.png' alt='ProfileImage'/></div>
                    <div className="profileDetails">
                      <div className="username">Username</div>
                      <div className="locationAndTime">Aurunachal Pradesh 20 mins ago</div>
                    </div>
                    <div className="options"><img src='option.png' /></div>
                  </div>
                  <div className="postImage">
                    <img src='/post2.jpeg' />
                  </div>
                  <div className="postLikes">
                    <div className="postLikesProfileImages">
                      <img src='/demoProfile.png' />
                      <img src='/demoProfile.png' />
                      <img src='/demoProfile.png' />
                    </div>
                    Akhil Reddy and 35 others emoted
                  </div>
                  <div className="postDescription">
                    Praveen Singh I didn't realise the inner meaning and the feel in the film (I mean subtitles ) when I watched it in my...
                  </div>
            </div>

            <div className="postContainer">
                  <div className="postHeader">
                    <div className="profileImage"><img  src='/demoProfile.png' alt='ProfileImage'/></div>
                    <div className="profileDetails">
                      <div className="username">Username</div>
                      <div className="locationAndTime">Aurunachal Pradesh 20 mins ago</div>
                    </div>
                    <div className="options"><img src='option.png' /></div>
                  </div>
                  <div className="postImage">
                    <img src='/post1.jpeg' />
                  </div>
                  <div className="postLikes">
                    <div className="postLikesProfileImages">
                      <img src='/demoProfile.png' />
                      <img src='/demoProfile.png' />
                      <img src='/demoProfile.png' />
                    </div>
                    Akhil Reddy and 35 others emoted
                  </div>
                  <div className="postDescription">
                    Praveen Singh I didn't realise the inner meaning and the feel in the film (I mean subtitles ) when I watched it in my...
                  </div>
            </div>

          </div>
    </div>
  )
}

export default DetailedFeeds