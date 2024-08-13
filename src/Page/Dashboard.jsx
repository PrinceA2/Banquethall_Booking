import React from 'react';
import SideBar from '../Component/SideBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "../App.css"
import "../Dashboard.css"
import CardTop from '../Component/Dashboard/CardTop';


export default function Dashboard() {
  return (
    <Box className="main-container">
      <SideBar />
      
      <Box component="main" className="main-content">
      <Typography 
       className='page-title'
       variant="h6">
        Dashboard
      </Typography>

      <CardTop/>
      </Box>  
    </Box>
  );
}
