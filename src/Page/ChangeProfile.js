import React from 'react'
import SideBar from '../Component/SideBar'
import { Box, Button, Card, Grid, TextField,Select,MenuItem 
,DialogTitle,FormControl,InputLabel,Typography} from '@mui/material'

function ChangePassword() {
    const [roleName, setRoleName] = React.useState('');


    
  const handleRoleChange = (event) => {
    setRoleName(event.target.value);
  };

    return(
        
 <Box sx={{ display: 'flex'}}>
  <SideBar />
  <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
  <Typography component="h1" variant="h5" align="left" sx={{ mb: 2 }}>
          Change Profile
    </Typography>
  <Card sx={{ minWidth: 275 }}>
    <Grid container>
      <Grid item xs={6} sx={{ mb: 0, pl: 2, pr: 2 }}>
      <DialogTitle sx={{ pl: 0, pr: 0 }}>Name of user</DialogTitle>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            type="text"
            autoComplete="name"
            size="small"
          />
          </Grid>
          <Grid item xs={6} sx={{ mb: 0, pl: 2, pr: 2 }}>
          <DialogTitle sx={{ pl: 0, pr: 0 }}>Role Mapping</DialogTitle>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="role"
            label="role"
            name="role"
            type="text"
            autoComplete="role"
            size="small"
          />
          </Grid>
          <Grid item xs={6} sx={{ mb: 0, pl: 2, pr: 2 }}>
          <DialogTitle sx={{ pl: 0, pr: 0 }}>Mobile</DialogTitle>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="mobile"
            label="Mobile"
            name="mobile"
            type="text"
            autoComplete="mobile"
            size="small"
          />
          </Grid>
          <Grid item xs={6} sx={{ mb: 0, pl: 2, pr: 2 }}>
          <DialogTitle sx={{ pl: 0, pr: 0 }}>Email Id</DialogTitle>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            size="small"
          />
          </Grid>
          <Grid item xs={6} sx={{ mb: 0, pl: 2, pr: 2 }}>
          <DialogTitle sx={{ pl: 0, pr: 0 }}>Image Upload</DialogTitle>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="upload"
            name="upload"
            type="file"
            autoComplete="fileupload"
            size="small"
          />
          </Grid>
          <Grid item xs={6} sx={{ mb: 0, pl: 2, pr: 2 }}>
          <DialogTitle sx={{ pl: 0, pr: 0 }}>Status</DialogTitle>
          <FormControl fullWidth size="small">
            <InputLabel id="role-name-label">Role Name</InputLabel>
            <Select
              labelId="role-name-label"
              id="role-name-select"
              value={roleName}
              label="Role Name"
              onChange={handleRoleChange}
            >
              <MenuItem value={'1'}>1</MenuItem>
              <MenuItem value={'2'}>2</MenuItem>
              <MenuItem value={'3'}>3</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2,float:'right'}}
          >
            Submit
          </Button>
          </Grid>
          </Grid>
          </Card>
    </Box>
    </Box>
    )
}
export default ChangePassword