import React, {useState } from 'react';
import SideBar from '../SideBar'
import { Box, Grid, Typography } from '@mui/material'
import TypeOFMenuList from '../../TypeOfMenuList';
import { Category } from '@mui/icons-material';


function TypeOfMenu() {


  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
<Box sx={{display:'flex'}} className="main-container">
    <SideBar />
    <Box component="main" className="main-content" sx={{ flexGrow: 1,}}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
        <Typography className='head-title' component="h1" variant="h6" align="left">
          Type Of Menu
        </Typography>
        </Grid>
      </Grid>
    </Box>

    <Grid container spacing={2} sx={{ mt:0 }}>
    <Grid item xs={12} className='pdt-0'>
      <TypeOFMenuList/>
      </Grid>
    </Grid>    
    </Box>
  </Box>
  )
}

export default TypeOfMenu
