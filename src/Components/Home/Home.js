import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import './Home.css'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {

    const [posts,setPosts]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        const url = process.env.REACT_APP_BACKEND_ENDPOINT+"posts/"
        fetch(url,{
            headers:{
                userId:localStorage.getItem("userId")
            }
        })
        .then(async(res)=>  await res.json())
        .then(({posts}) =>{
            let tempPosts = posts.map((post)=> {
                return {...posts,loading:false};
            })
            setPosts(posts)
        })
        .catch((e)=>console.log(e));
    },[])

    const makeApiRequestToLike =async (post)=>{
        const id=post.id;
        const url =process.env.REACT_APP_BACKEND_ENDPOINT+"post/like"
        await fetch(url,{
            method: 'POST',
            headers: {
              authorization: localStorage.getItem("authorization"),
              'Content-Type': 'application/json', 
              'postid':id,
            },
            body: JSON.stringify({postId:id}),
          }).then(()=>{
                post.liked = !post.liked;
                let tempPosts =posts.splice(posts.indexOf(post),1,post) 
                setPosts(tempPosts);
          })
        .catch((er)=> alert(er.message))
    }

    const handleLikeClick =async (e,post)=>{
        e.stopPropagation();    
        if(localStorage.getItem("authorization")) 
        makeApiRequestToLike(post);
        else 
        alert("You must be logged in to like a post")
    }

  return (
    <div className='homePageContainer'>
        <Header />
        <div className="imageFeeds">
            {
                posts.length==0 &&
                <h1 className="authBoxText">No Posts Available Currently</h1>
            }
            <ResponsiveMasonry columnsCountBreakPoints={{400: 2,600:3, 750: 4, 900: 6}}>
            <Masonry columnsCount={1} gutter={"5px"}>
            {
                posts.map((post,index)=>{
                    return (
                    <div className='imageFeed' key={index} onClick={()=>navigate("/feed")}>
                        <img src={post.imageURL} />
                        <button className="likeButton" onClick={(e)=> handleLikeClick(e,post)}> 
                            <img src={post.liked ? "/heartFilled.svg" : "heart.svg"} alt='likeButton'/>
                        </button> 
                    </div>
                    )
                })
            }
            </Masonry>
            </ResponsiveMasonry>
        </div>
    </div>
  )
}

export default Home