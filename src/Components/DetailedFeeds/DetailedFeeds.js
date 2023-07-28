import React, { useEffect, useState } from 'react'
import './DetailedFeeds.css'
import Header from '../Header/Header'


function DetailedFeeds() {

    const [posts,setPosts]=useState([]);
    const [reload,setReload]=useState(false);

    useEffect(()=>{
        const url = process.env.REACT_APP_BACKEND_ENDPOINT+"posts/"
        fetch(url,{
            headers:{
                userId:localStorage.getItem("userId")
            }
        })
        .then(async(res)=>  await res.json())
        .then(({posts}) => setPosts(posts))
        .catch((e)=>console.log(e));
    },[reload])


    const makeApiRequestToLike =async (id)=>{
        const url =process.env.REACT_APP_BACKEND_ENDPOINT+"post/like"
        await fetch(url,{
            method: 'POST',
            headers: {
              authorization: localStorage.getItem("authorization"),
              'Content-Type': 'application/json', 
              'postid':id,
            },
            body: JSON.stringify({postId:id}),
          }).then(()=> setReload(!reload))
        .catch((er)=> alert(er.message))
    }

    const handleLikeClick =async (e,id)=>{
        e.stopPropagation();
        if(localStorage.getItem("authorization")) 
        makeApiRequestToLike(id);
        else 
        alert("You must be logged in to like a post")
    }

  return (
    <div className='feedsContainer'>
          <Header />
          <div className="posts">
            {
              posts.map((post)=>{
                return(
                  <div className="postContainer">
                  <div className="postHeader">
                    <div className="profileImage"><img  src={post.authorImageURL} alt='ProfileImage'/></div>
                    <div className="profileDetails">
                      <div className="username">{post.authorName}</div>
                      <div className="locationAndTime">{post.location}</div>
                    </div>
                    <div className="options"><img src='option.png' /></div>
                  </div>
                  <div className="postImage">
                    <img src={post.imageURL} />
                    <button className="likeButton" > 
                            <img 
                              src={post.liked ? "/heartFilled.svg" : "heart.svg"}
                              alt='likeButton' 
                              onClick={(e)=> handleLikeClick(e,post.id)}
                            />
                    </button> 
                  </div>
                  <div className="postLikes">
                    <div className="postLikesProfileImages">
                      {post.likes.map((like,index)=>{
                        return (
                          <img src={like.userImageURL} />
                        )
                      })}
                    </div>
                    {post.likes.length!=0 &&
                      (post.likes.length==1 ?
                      post.likes[0].userName===localStorage.getItem("username") ?
                      "You Liked the Post":
                      post.likes[0].userName+" Liked the post":
                      post.likes[0].userName+" and "+ post.likes.length +" others emoted" )                   
                    }
                  </div>
                  <div className="postDescription">
                    {post.description.length<124 ? 
                      post.description :
                      post.description.slice(0,124)
                    }
                  </div>
                  </div>
                )
              })
            }
          </div>
    </div>
  )
}

export default DetailedFeeds