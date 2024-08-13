import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import banner from "../../images/forgotpswd.png";
import {useState } from 'react';
import "./Forgotpswd.css"
 function Forgotpswd() {
  const  navigate = useNavigate()
  const [ email, setEmail ] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);


  const validateForm = ()=>{
    const newerror = {};
    if(!email){
     newerror.email = "email is required"
    }
   
   return newerror;
  }



  const handleButtonClick = (e) => {
   e.preventDefault();
   setIsSubmitted(true);
   console.log(email)
    const formErrors = validateForm();
 if (Object.keys(formErrors).length === 0) {
   // Form is valid, proceed with form submission (e.g., API call)
   console.log('Form is valid, submitting...');
   // Add your form submission logic here
 } else {
   setErrors(formErrors);
 }
  }
  const handleEmailChange = (e) => {
   setEmail(e.target.value);
   if (isSubmitted && e.target.value) {
     setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
   }
 };

 
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>   
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} className='login-bg auth-wrapper' square>
        <Box
          sx={{
            my: 6,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid className='md-30  reset'>
           <Typography component="h1" variant="h4">
              Reset Password
          </Typography>
          <Typography className='sign-up'>
          let us help you
          </Typography>
          </Grid>
        
          <Typography > 
            <span className='signin'>Enter your registered email address</span>
          </Typography>
          <Box component="form" className='email-field' noValidate sx={{ mt: 1 }}  onSubmit={handleButtonClick}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            
          

            <Grid container>
            {/* <Grid item xs={6}>
            <FormControlLabel
              className='remember'
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                </Grid>
                {/* <Grid item xs={6}>
                <Link href="#"  variant="body2" className='forgot-password'>
                  Forgot password?
                </Link>
                </Grid> */}
            {/* </Grid> */}
           
            <Button 
              className='sign-bt'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>navigate("/resetpswd" )}
              //  onClick={handleButtonClick}
            >
             Reset My Password
            </Button>
            <div className='login'>
            <a  className="txt1" href='' onClick={()=>navigate("/")}> Login? </a>
            </div>
            
          </Box>
        </Box>
      </Grid>
    </Grid>
    )
}

export default Forgotpswd;