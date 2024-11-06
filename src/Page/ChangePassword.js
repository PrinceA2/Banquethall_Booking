import React from 'react'
import SideBar from '../Component/SideBar'
import { Box, Button, Card, TextField, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent';

function ChangePassword() {

return(
    <Box sx={{display:'flex'}}>
    <SideBar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
     
    <Typography component="h1" variant="h5" align="left" sx={{ mb: 2 }}>
          Change Password
    </Typography>
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="currentPassword"
            label="Current Password"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            size="small"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            size="small"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            size="small"
          />
         
          <Button
            type="submit"
           
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 ,float:'right',textTransform:'capitalize'}}
          >
            Update Password
          </Button>
          <Button
            type="submit"
           
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2,mr:2 ,float:'right',textTransform:'capitalize'}}
          >
            cancel
          </Button>
          </CardContent>
          </Card>
        </Box>
  </Box>
)




}
export default ChangePassword 