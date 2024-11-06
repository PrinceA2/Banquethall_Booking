import React from 'react';
import "./Registration.css"
import { useNavigate } from "react-router-dom";
import banner from "../../images/banner/bg-02.png";
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
import {useState } from 'react';

function Registration() {
      const  navigate = useNavigate()
      const [ accountEmpCode, setaccountEmpCode ] = useState('');
      const [ password, setPassword ] = useState('');
      const [cnfPassword,setCnfPassword] = useState('');
      const [email,setemail] = useState('');
      const [errors, setErrors] = useState({});
      const [isSubmitted, setIsSubmitted] = useState(false);
      

      const validateForm = ()=>{
        const newerror = {};
        if(!accountEmpCode){
         newerror.accountEmpCode = "UserName is required"
        }
        if (!email) {
          newerror.email = 'email is required';
        } else if (password.length < 6) {
          newerror.email = 'email should be valid';
        }
        if (!password) {
         newerror.password = 'Password is required';
       } else if (password.length < 6) {
         newerror.password = 'Password must be at least 6 characters';
       }
       if (!cnfPassword) {
        newerror.cnfPassword = 'confirmPassword is required';
      } else if (password.length < 6) {
        newerror.cnfPassword = 'confirmPassword must be at least 6 characters';
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

       const handleUserChange = (e) => {
        setaccountEmpCode(e.target.value);
        if (isSubmitted && e.target.value) {
          setErrors((prevErrors) => ({ ...prevErrors, accountEmpCode: '' }));
        }
      };
      const handleEmailChange = (e) => {
        setemail(e.target.value);
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
      const handlecnfPasswordChange = (e) => {
        setCnfPassword(e.target.value);
        if (isSubmitted && e.target.value) {
          setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        
      };}
  
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
          <Typography className='sign-up'>
           Need an account? <Link href="#"> Sign In</Link>
          </Typography>
          </Grid>
        
          <Typography component="h1" variant="h4"> 
            <span className='sign-in'>Sign Up</span>
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleButtonClick}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleUserChange}
              error={!!errors.accountEmpCode}
              helperText={errors.accountEmpCode}
            />
            <Grid sx={{display:'flex',mt:1}}>
             <TextField
              sx={{width:'80%'}}
              required
              name="email"
              label="email"
              type="email"
              id="email"
              autoComplete="current-email"
              onChange={handleEmailChange}
              error={!!errors.accountEmpCode}
              helperText={errors.accountEmpCode}
            />
             <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ml:2,textTransform:'capitalize' }}>
                        Send
                      </Button>
              </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="otp"
              label="otp"
              type="number"
              id="otp"
              autoComplete="current-otp"
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
              <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="confirm-Password"
              type="password"
              id="confirmpassword"
              autoComplete="current-password"
              onChange={handlecnfPasswordChange}
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
                <Link href="#" onClick={()=>navigate("/")} variant="body2" className='forgot-password'>
                  All ready registered login?
                </Link>
                </Grid>
            </Grid>
           
            <Button 
              className='sign-bt'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={()=>navigate("/dasbord" )}
              //  onClick={handleButtonClick}
            >
             Sign up
            </Button>
         
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

    // <div className="container">
    //   <div className="registration-form">
    //     <h2>Registration</h2>
    //     <form>
    //       <div className="form-group">
    //         <label >Username</label>
    //         <input type="text"  name="username" />
    //       </div>
    //       <div className="form-group">
    //         <label>Email</label>
    //         <input type="email"  name="email" />
    //       </div>
    //       <div className="form-group">
    //         <label >Password</label>
    //         <input type="password"  name="password" />
    //       </div>
    //       <div className="form-group">
    //         <label >Confirm Password</label>
    //         <input type="password" />
    //       </div>
    //       <button type="submit" className='reaistatin_btn'>Register</button>
    //       <button className='back_btn' onClick={()=> naviagte("/")} >Back</button>
    //     </form>
    //   </div>
    // </div>
  
}

export default Registration;