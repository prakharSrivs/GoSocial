import React, { useState } from 'react'
import './signup.css'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Signup() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    const [loading,setLoading]=useState(false)
    const [image,setImage]=useState();
    const navigate = useNavigate();

    const makeApiRequestForSignUp = async (email,username,password,imageURL)=>{
        const url = process.env.REACT_APP_BACKEND_ENDPOINT+'users/signup'
        const response = await fetch(url, {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ username, email, password ,imageURL}),
        });
        return await response.json();
    }

    const makeApiRequestForImageUpload = async (image)=>{
        const formData = new FormData();
        formData.append("file",image);
        formData.append("upload_preset",process.env.REACT_APP_CLOUD_PRESET);
        formData.append("cloud_name",process.env.REACT_APP_CLOUD_NAME)
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`
        const response = await fetch(url,{method:"post",body: formData})
        return await response.json();
    }
    const handleSubmit =async (e) =>{
        e.preventDefault();
        setLoading(true)
        const imageResponse = await makeApiRequestForImageUpload(image);
        const response=await makeApiRequestForSignUp(email,username,password,imageResponse.url);
        if(response.token)
        {
            localStorage.setItem("authorization",response.token);
            localStorage.setItem("userId",response.userId)
            localStorage.setItem("username",response.username)
            localStorage.setItem("imageURL",response.imageURL)
            navigate('/')
        }
        else {
            setLoading(false)
            alert(response.message)
        }
    }    
  return (
    <div className='authContainer signupContainer'>
        <div className="authBox signupBox">
            <img className='authBoxLink logo' src='/logoOnBoarding.png' onClick={()=> navigate('/')} />
            <div className="authBoxText authHeading ">
                Create an Account <div className="authSubHeading">Enter your Details</div>
            </div>
            <form className='authForm' onSubmit={handleSubmit}>
                <div className="imageInput">
                    <label for="image-input" className='avatarImage imageInputLabel'></label>
                    {
                        image?
                        <div className='authBoxText authSubHeading'>{image.name}</div> :
                        <label for="image-input" className='authBoxText authSubHeading'>Upload Profile Image</label>
                    }
                    <input id='image-input' type='file' accept='image/*' onChange={(e)=> setImage(e.target.files[0])} required/>
                </div>
                <TextField 
                    fullWidth
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    type='email'
                    onChange={(e)=> setEmail(e.target.value)} 
                    value={email}
                    required    
                />
                <TextField 
                    fullWidth
                    id="outlined-basic" 
                    label="Username" 
                    variant="outlined" 
                    onChange={(e)=> setUsername(e.target.value)}
                    value={username}
                    type='text' 
                    required    
                />
                <TextField 
                    fullWidth
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined" 
                    type='password'
                    onChange={(e)=>setPassword(e.target.value)} 
                    value={password}
                    required
                />
            {
                loading ? 
                <div className="loader"></div>:
                <button type='submit' className='authFormActionButton authBoxText'>Sign Up</button>
            }
            </form>
            <div className="authBoxLink authBoxText authAlternateAction" onClick={()=> navigate('/user/login')}>
                Already a User? Login 
            </div>
        </div>
    </div>
  )
}

export default Signup