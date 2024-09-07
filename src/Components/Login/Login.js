import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [disabled,setDisabled]=useState(false);
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate();

    const makeApiRequestForLogin =async (email,password)=>{
        const url=process.env.REACT_APP_BACKEND_ENDPOINT+"users/login"
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email,password})
        })
        return await response.json();
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const response = await makeApiRequestForLogin(email,password);
        if(response.token)
        {
            localStorage.setItem("authorization",response.token);
            localStorage.setItem("userId",response.uid)
            localStorage.setItem("username",response.username)
            localStorage.setItem("imageURL",response.imageURL)
            navigate('/home')
        }  
        else{
            setLoading(false);
            alert(response.message);   
        }
    }

  return (
    <div className='authContainer'>
        <div className="authBox signupBox">
            <img className='authBoxLink logo' src='/logoOnBoarding.png' alt='HighOn Logo' onClick={() => navigate('/')}/>
            <div className="authBoxText authHeading ">
                Log In <div className="authSubHeading">to Continue to Highon</div>
            </div>
            <form className='authForm' onSubmit={handleSubmit}>
                <TextField 
                    fullWidth
                    label="Email" 
                    variant="outlined" 
                    type='email'
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)}
                    required    
                />
                <TextField 
                    fullWidth
                    label="Password" 
                    variant="outlined" 
                    type='password' 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                />
            {
                loading ? 
                <div className="loader"></div>:
                <button type='submit' className='authFormActionButton authBoxText' disabled={disabled}>Log In</button>
            }
            </form>
            <div className="authBoxLink authBoxText authAlternateAction" onClick={()=> navigate('/user/signup')}>
                Create an Account
            </div>
        </div>
    </div>
  )
}

export default Login