import React from 'react'
import Header from '../Header/Header'
import './Home.css'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

function Home() {
  return (
    <div>
        <Header />
        <div className="imageFeeds">
            <ResponsiveMasonry columnsCountBreakPoints={{400: 2,600:3, 750: 4, 900: 6}}>
            <Masonry columnsCount={1} gutter={"5px"}>
            <img className='imageFeed' src="/post1.jpeg" />
            <img className='imageFeed' src="/post2.jpeg" />
            <img className='imageFeed' src="/post3.jpg" />
            <img className='imageFeed' src="/post4.jpeg" />
            <img className='imageFeed' src="/post5.jpeg" />
            </Masonry>
            </ResponsiveMasonry>
        </div>
    </div>
  )
}

export default Home