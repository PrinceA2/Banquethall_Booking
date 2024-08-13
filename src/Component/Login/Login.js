import React from 'react';
import "./Login.css"
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
import banner from "../../images/banner/AdminImage.jpg";
import {useState } from 'react';


function Login() {
     const  navigate = useNavigate()
     const [ accountEmpCode, setaccountEmpCode ] = useState('');
	   const [ password, setPassword ] = useState('');
     const [errors, setErrors] = useState({});
     const [isSubmitted, setIsSubmitted] = useState(false);


     const validateForm = ()=>{
       const newerror = {};
       if(!accountEmpCode){
        newerror.accountEmpCode = "UserName is required"
       }
       if (!password) {
        newerror.password = 'Password is required';
      } else if (password.length < 6) {
        newerror.password = 'Password must be at least 6 characters';
      }
      return newerror;
     }

   

     const handleButtonClick = (e) => {
      e.preventDefault();
      setIsSubmitted(true);
      console.log(accountEmpCode)
       console.log(password)
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
      setaccountEmpCode(e.target.value);
      if (isSubmitted && e.target.value) {
        setErrors((prevErrors) => ({ ...prevErrors, accountEmpCode: '' }));
      }
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      if (isSubmitted && e.target.value) {
        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
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
          <Grid className='md-30'>
           <Typography component="h1" variant="h4">
              Welcome to Mart
          </Typography>
          
          </Grid>
        
          <Typography component="h1" variant="h4"> 
            <span className='sign-in'>Sign in</span>
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}  onSubmit={handleButtonClick}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
              error={!!errors.accountEmpCode}
              helperText={errors.accountEmpCode}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <Grid container>
            <Grid item xs={6}>
            <FormControlLabel
              className='remember'
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
                </Grid>
                <Grid item xs={6}>
                <Link href='' onClick={()=>navigate("/forgotpswd")}  variant="body2" className='forgot-password'>
                  Forgot password?
                </Link>
                </Grid>
            </Grid>
            <Typography className='sign-up' sx={{mt:2}}>
           Need an account? <Link href="#" onClick={()=>navigate("/register")}> Sign Up</Link>
          </Typography>
            <Button 
              className='sign-bt'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>navigate("/dasboard" )}
              //  onClick={handleButtonClick}
            >
             Login
            </Button>
         
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

}

export default Login;