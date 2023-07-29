import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import './Home.css'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {

    const [posts,setPosts]=useState([]);
    const [postsLoader,setPostsLoader]=useState();
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        setLoading(true);
        const url = process.env.REACT_APP_BACKEND_ENDPOINT+"posts/"
        fetch(url,{
            headers:{
                userId:localStorage.getItem("userId")
            }
        })
        .then(async(res)=>  await res.json())
        .then(({posts}) =>{
            setLoading(false);
            setPostsLoader(new Array(posts.length))
            setPosts(posts)
        })
        .catch((e)=>{
            alert("Failed to Load the Posts, Try again after some time")
        });
    },[])

    const makeApiRequestToLike =async (post,index)=>{
        const id=post.id;
        setPostsLoader((intialValue)=>{
            let temp =[...intialValue];
            temp[index]=true;
            return temp;
        })
        const url =process.env.REACT_APP_BACKEND_ENDPOINT+"post/like"
        await fetch(url,{
            method: 'POST',
            headers: {
              authorization: localStorage.getItem("authorization"),
              'Content-Type': 'application/json', 
              'postid':id,
            },  
            body: JSON.stringify({postId:id}),
          }).then((res)=>{
                if(res.ok) post.liked = !post.liked;
                else if(res.status==403) {
                    alert("Auth Token Expired, Please Login Again ")
                    localStorage.removeItem("authorization");
                    localStorage.removeItem("imageURL");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("username");
                    navigate('/user/login')
                }
                else alert(res.statusText);
                let tempPosts=posts;
                tempPosts[index]=post;
                setPosts(tempPosts);
                setPostsLoader((intialValue)=>{
                    let temp =[...intialValue];
                    temp[index]=false;
                    return temp;
                })
          })
        .catch((er)=> alert(er.message))
    }

    const handleLikeClick =async (e,post,index)=>{
        e.stopPropagation();    
        if(localStorage.getItem("authorization")) 
        makeApiRequestToLike(post,index);
        else 
        alert("You must be logged in to like a post")
    }

  return (
    <div className='homePageContainer'>
        <Header />
        <div className="imageFeeds">
            {
                loading ?
                <div className="authBoxText">Loading Posts...</div>:
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
                        <button className="likeButton" onClick={(e)=> handleLikeClick(e,post,index)}>
                        {
                            postsLoader[index] && postsLoader[index]==true ? <div className="loader"></div> :
                            <img src={post.liked ? "/heartFilled.svg" : "heart.svg"} alt='likeButton'/>
                        } 
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