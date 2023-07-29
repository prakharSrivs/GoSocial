import React, { useEffect, useState } from 'react'
import './DetailedFeeds.css'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom';


function DetailedFeeds() {

    const [posts,setPosts]=useState([]);
    const [postsLoader,setPostsLoader]=useState();
    const navigate = useNavigate();

    useEffect(()=>{
        const url = process.env.REACT_APP_BACKEND_ENDPOINT+"posts/"
        fetch(url,{
            headers:{
                userId:localStorage.getItem("userId")
            }
        })
        .then(async(res)=>  await res.json())
        .then(({posts}) =>{
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
    <div className='feedsContainer'>
          <Header />
          <div className="posts">
            {
              posts.map((post,index)=>{
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

                        {
                            postsLoader[index] && postsLoader[index]==true ? <div className="loader"></div> :
                            <img 
                              src={post.liked ? "/heartFilled.svg" : "heart.svg"} 
                              alt='likeButton'
                              onClick={(e)=> handleLikeClick(e,post,index)}
                            />
                        } 
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