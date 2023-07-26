import React from 'react'
import Header from '../Header/Header'
import './Home.css'

function Home() {
  return (
    <div>
        <Header />
        <div className="imageFeeds">
            <div className="imageFeed"><img src="/post1.jpeg" /></div>
            <div className="imageFeed"><img src="/post2.jpeg" /></div>
            <div className="imageFeed"><img src="/post3.jpg" /></div>
            <div className="imageFeed"><img src="/post4.jpeg" /></div>
            <div className="imageFeed"><img src="/post5.jpeg" /></div>
        </div>
    </div>
  )
}

export default Home