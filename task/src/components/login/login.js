import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.module.css";
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AUTH_URL } from '../url';
import axios from 'axios';

async function login(email, name, password) {
  try {
    const response = await axios.post(AUTH_URL, { email, name, password });
    return response.data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function Login() {

  //STYLES//
  const avatarStyle = { backgroundColor: '#e1b830' }
  const butStyle = { backgroundColor: '#e1b830', margin: '2rem 0 2rem 0' }
  const style = {
    borderRadius: '1rem',
    width: '30%',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  //TOAST//
  const notifyUser = () => toast.error("Wrong username or password!", {
    position: toast.POSITION.BOTTOM_CENTER
  });

  //MODAL WINDOW// 
  let [userName, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [email, setEmail] = useState('');
  const navigate = useNavigate();

  const checkUser = async (e) => {
    e.preventDefault();
    const user = await login(email, userName, password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/feed');
    }
    else {
      notifyUser();
    }
  }


  return (
    <React.Fragment>
      <Grid align='center'>
        <div className="neo-log" >
          <Grid >
            <Avatar style={avatarStyle} >
              <LockOpenTwoToneIcon />
            </Avatar>
            <h2>Log in</h2>
          </Grid>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '90%', },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="email" variant="outlined" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Username" variant="outlined" required value={userName} onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Password" type='password' variant="outlined" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <FormControlLabel control={<Checkbox color='default' />} label="Remember me" /><br></br>
            
            <Button style={butStyle} variant="contained" type='submit' onClick={checkUser}>Log in</Button>
           
          </Box>

        <Link to="/signup"> Haven't signed up yet? Click here! </Link>
        
        </div>
        <ToastContainer transition={Zoom} role="alert" />
      </Grid>
    </React.Fragment>
  );
}


export default Login;