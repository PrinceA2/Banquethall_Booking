import React from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Card, Grid } from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [hover, setHover] = React.useState(false);
  const [hover2, setHover2] = React.useState(false);
  const navigate = useNavigate();
  const buttonStyles = {
    backgroundColor: hover ? '#e53935' : 'white',
    color:hover? 'white':'red',
    padding: "30px 80px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid',
    borderColor: 'error',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };
  const buttonStyles2 = {
    backgroundColor: hover2 ? '#e53935' : 'white',
    color:hover2? 'white':'red',
    padding: "30px 80px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid',
    borderColor: 'error',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
            <Card style={{padding:"12px"}}>
            <Grid container spacing={2} sx={{textAlign:"-webkit-center"}}>
            
            <Grid item xs={6}>
            <Button 
           onMouseEnter={() => setHover(true)}
           onMouseLeave={() => setHover(false)} 
           onClick={() => { navigate('/changepassword')}}
          className='setting-icon' style={buttonStyles} variant="outlined" color="error">
           
               <PasswordIcon style={{ fontSize: '40px' }}/>
              
               <p style={{ margin: 0 }}>Change Password</p>
            </Button>
            </Grid>
            <Grid item xs={6}>
            <Button onMouseEnter={() => setHover2(true)}
              onMouseLeave={() => setHover2(false)} 
              onClick={() => { navigate('/changeprofile')}}
              style={buttonStyles2} variant="outlined" color="error">
            <ManageAccountsIcon style={{ fontSize: '40px' }}/>
             
              <p style={{ margin: 0 }}>Change Profile</p>
            </Button>
            </Grid>
           
            </Grid>
            </Card>

      
          
          </Box>
    </Box>
  )
}
