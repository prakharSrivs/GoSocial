import { Alert, Snackbar, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [disabled,setDisabled]=useState(false);
    const [loading,setLoading]=useState(false);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const makeApiRequestForLogin =async (email,password)=>{
        const url=process.env.REACT_APP_BACKEND_ENDPOINT+"users/login"
        const response = await axios.post(url,{
            email, password
        })
        console.log(response)
        return response;
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const response = await makeApiRequestForLogin(email,password);
        console.log(response.headers['authorization'])
        if(response.headers['authorization'])
        {
            localStorage.setItem("authorization",response.headers['authorization']);
            localStorage.setItem("userId",response.user.id)
            localStorage.setItem("username",response.user.username)
            localStorage.setItem("imageURL",response.user.imageURL)
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
            <Snackbar
                open={open}
                autoHideDuration={40000}
                onClose={()=>setOpen(false)}
                action={()=>setOpen(false)}
                anchorOrigin={{vertical:"top", horizontal:"center"}}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity="info"
                    variant="filled"    
                    sx={{ width: '100%' }}
                >
                    Credentials: Email=prakhar@gmail.com  Password=Prakhar
                </Alert>
            </Snackbar>
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