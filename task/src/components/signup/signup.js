import React from 'react';
import { useState } from 'react';
import "./signup.module.css";
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




function Signup() {

 //STYLES//
 const avatarStyle={backgroundColor:'#e1b830'}
 const butStyle={backgroundColor:'#e1b830',  margin:'2rem 0 2rem 0'}
 const style = {
  borderRadius:'1rem',
  width: '30%',
  height: 'auto' ,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}; 

//TOAST//
const notifyUser = () =>  toast.error("Wrong username or password!", {
  position: toast.POSITION.BOTTOM_CENTER
});

 //MODAL WINDOW// 
  let [name, setName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => {setIsModalOpen(true);
  setName(userName)}
  const handleModalClose = () => setIsModalOpen(false);
  

//CHECK USERS//    
let [userName, setUsername] = useState('');
let [password, setPassword] = useState('');
let [email, setEmail] = useState('');

    const checkUser  = (e) => {
      e.preventDefault();

    let notify = false; 
    const dataFromStorage = JSON.parse(window.localStorage.getItem('Information'))

      for (let i = 0; i < dataFromStorage.length; i++) {
     
        if (dataFromStorage[i].username.userName === userName && dataFromStorage[i].password.password === password) {
          
          handleOpen(); 
          notify = true;  

        }          
    }
    
    if (!notify) {
      console.log('fedoinsdflvkn dfnvdlfknvel;s')

    notifyUser();

  }

      }


    return (
    <React.Fragment> 
    <Grid align='center'>
        <div className="neo-log" >
            <Grid >
        <Avatar style={avatarStyle} >
            <LockOpenTwoToneIcon/>
        </Avatar>
        <h2>Sign up</h2>
            </Grid>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '90%', }, }}
      noValidate
      autoComplete="off"
    >
      <TextField label="email" variant="outlined" required value={email} onChange={(e) => setEmail(e.target.value)}/>
      <TextField label="Username" variant="outlined" required value={userName} onChange={(e) => setUsername(e.target.value)}/>
      <TextField label="Password" type='password' variant="outlined" required value={password} onChange={(e) => setPassword(e.target.value)} />
      <TextField label="Confirm Password" tpe='password' variant='outlined' required value={password} onChange={(e) => setPassword(e.target.value)}/>
      <br></br>
      
      <Button style={butStyle} variant="contained" type='submit' onClick={checkUser}>Sign up</Button>
      <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box  sx={style}>
            <Grid align='center'> 
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Hi {name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Welcome to Phey shop!
              </Typography>
            </Grid>
          </Box>
      </Modal>
    </Box>
      

      <Link to="/login"> Already have Account! Click Here </Link>
        </div>   
        <ToastContainer transition={Zoom}  role="alert"/>
    </Grid>
    </React.Fragment>
    );
}


export default Signup;
