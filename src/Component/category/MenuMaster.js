import React from 'react';
import SideBar from '../SideBar'
import { Box, Card, Grid, Typography } from '@mui/material'
import MenuMasterList from '../../MenuMasterList';


function MenuMaster() {

  return (
<Box sx={{display:'flex'}} className="main-container">
    <SideBar />
    <Box component="main" className="main-content" sx={{ flexGrow: 1,}}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
        <Typography className='head-title' component="h1" variant="h6" align="left">
          Menu Master
        </Typography>
        </Grid>
    
      </Grid>
    </Box>

    <Grid container spacing={2} sx={{ mt:0 }}>
    <Grid item xs={12} className='pdt-0'>
      <MenuMasterList/>
      </Grid>
    </Grid>    
    </Box>
  </Box>
  )
}

export default MenuMaster
