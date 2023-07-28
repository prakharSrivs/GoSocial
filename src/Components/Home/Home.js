import React from 'react'
import Header from '../Header/Header'
import './Home.css'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

function Home() {


  return (
    <div className='homePageContainer'>
        <Header />
        <div className="imageFeeds">
            <ResponsiveMasonry columnsCountBreakPoints={{400: 2,600:3, 750: 4, 900: 6}}>
            <Masonry columnsCount={1} gutter={"5px"}>
                <div className='imageFeed'>
                    <img src="/post1.jpeg" />
                    <div className="likeButton"> <img src='/heart.svg' /></div> 
                </div>
                <div className='imageFeed'>
                    <img src="/post2.jpeg" />
                    <div className='likeButton'><img src='/heart.svg' /></div>
                </div>
                <div className='imageFeed'>
                    <img src="/post3.jpg" />
                    <div className='likeButton'><img src='/heart.svg' /></div>
                </div>
                <div className='imageFeed'>
                    <img src="/post4.jpeg" />
                    <div className='likeButton'><img src='/heart.svg' /></div>
                </div>
                <div className='imageFeed'>
                    <img src="/post5.jpeg" />
                    <div className='likeButton'><img src='/heart.svg' /></div>
                </div>
            </Masonry>
            </ResponsiveMasonry>
        </div>
    </div>
  )
}

export default Home