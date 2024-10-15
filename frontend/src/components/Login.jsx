import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import './styles/loginform.css'
import axios from 'axios';

const Login = () => {
    const[user,Setuser]=useState({username:'',password:''})
    const navigate=useNavigate();
    let updateUser=(event)=>{
        Setuser({...user,[event.target.name]:event.target.value})
    }
    
    let sendData=(event)=>{
        // if((user.username=="admin")&&(user.password=="1234")){
        //     localStorage.setItem("username","admin")
        //     navigate('/home')
        // }
        // else{
        //     alert("Invalid Credentials")
        // }
        axios.post("http://localhost:3000/users/login",users)//login from user.js
        .then((res)=>{
            console.log(res)
            alert(res.data.message)
            if(res.data.usertoken){
                localStorage.setItem("token",res.data.usertoken);
                navigate('/home')
            }
        })
    }   

  return (
    <div class="body">
        <Box display="flex" minHeight="80vh" >
            
        <Stack spacing={4} direction="column" sx={{ width: '300px' }} >
        <Typography variant='h4' >Login</Typography>
        <TextField id="outlined-basic" label="Username" name="username" value={user.username} variant="outlined" onChange={updateUser} />
        <TextField id="outlined-basic" label="Password" name="password" value={user.password} variant="outlined" onChange={updateUser} />
        <Button size="large" onClick={sendData} variant="contained" endIcon={<LoginIcon/>}>Login</Button>
        </Stack>
        </Box>
    </div>
  )
}

export default Login