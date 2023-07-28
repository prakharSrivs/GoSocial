import React, { useEffect, useState } from 'react'
import './CreatePost.css'
import { Navigate, useNavigate } from 'react-router-dom'

function CreatePost() {

  const navigate = useNavigate();
  const [image,setImage]=useState();
  const [description,setDescription]=useState();
  const [location,setLocation] = useState();
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(!localStorage.getItem("authorization")) 
    {
      alert("You need to be logged in to Create a Post")
      navigate('/user/login')
    }
  },[])

  const makeApiRequestForImageUpload = async (image)=>{
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset",process.env.REACT_APP_CLOUD_PRESET);
    formData.append("cloud_name",process.env.REACT_APP_CLOUD_NAME)
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`
    const response = await fetch(url,{method:"post",body: formData})
    return await response.json();
  }

  const makeApiRequestForSignUp = async (location,description,imageURL)=>{
    const url =process.env.REACT_APP_BACKEND_ENDPOINT+'post/create'
    const response = await fetch(url, {
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem("authorization")
        },
        body:JSON.stringify({ location, description, imageURL}),
    });
    return await response.json();
  }

  const handleSubmit =async () =>{
    setLoading(true)
    const imageResponse = await makeApiRequestForImageUpload(image);
    const response=await makeApiRequestForSignUp(location,description,imageResponse.url);
    if(response.message==="Post Created Successfully")
    {
        navigate('/')
    }
    else {
        setLoading(false)
        alert(response.message)
    }
  }  
  
  const submitForm = ()=>{
    handleSubmit();
  }

  return (
    <div className='createPostsContainer'>
        <div className="createPostsHeader">
          <div className="button backButton">
            <img src='/goBack.svg' alt='Back Button' onClick={()=> navigate('/')}/>
          </div>
          {
                loading ? 
                <div className="loader"></div>:
                <div className="button postButton" onClick={submitForm}>Post</div>
          }
        </div>  
        <div className="createPostsBody">
          <form className='createPostForm '>
              <div className="descriptionInput">
                <label for="story" className='label'>Description</label>
                <textarea 
                    id="story" 
                    name="story" 
                    rows="5" 
                    cols="33" 
                    spellCheck="true" 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
              </div>
              <div className="locationInput">
                <label className='label' for="story"> Location</label>
                <textarea 
                    id="story" 
                    name="story" 
                    rows="2" 
                    cols="33" 
                    spellCheck="true" 
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                />
              </div>
              <div className="imageInput">
                  <label for="image-input" className='authBoxText authSubHeading postImageLabel label'>Click to Upload an Image</label>
                  {
                      image &&
                      <div className='authBoxText authSubHeading '>{image.name}</div> 
                  }
                  <input id='image-input' type='file' accept='image/*' onChange={(e)=> setImage(e.target.files[0])} />
              </div>
          </form>
        </div>
    </div>
  )
}

export default CreatePost