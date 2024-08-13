import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import banner from "../../images/banner/womanbanner.png";
// import StaffCentrallogo from '../../images/StaffCentral.png'; // Import your image file
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
 
function Resetpassword() {
    const  navigate = useNavigate()
    const [newPassword, setNewPassword] = React.useState('');
  const [validationStatuses, setValidationStatuses] = React.useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    };
  };
  
  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setNewPassword(value);

    if (value === '') {
      setValidationStatuses({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
        specialChar: false,
      });
    } else {
      const statuses = validatePassword(value);
      setValidationStatuses(statuses);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const allValid = Object.values(validationStatuses).every(Boolean);
    if (allValid) {
      console.log('Password is valid');
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
    <Grid>
      {/* <Avatar className='mart-logo main-logocss' alt="Online Mart" src={StaffCentrallogo}/> */}
    </Grid>
      <Box
        sx={{
          my: 6,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
   
     
        <Typography component="h1" variant="h4">
          <span className='sign-in'>Reset Password</span>
        </Typography>
        <Typography className='sign-up'>
            Enter OTP to reset your password.
          </Typography>
         
        <Box component="form" className='forgotpassword'>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="old"
            label="Old Password"
            name="old"
            autoComplete="Old password"
            autoFocus
          />
          <LightTooltip  title={ <Box>
          {newPassword !== '' && (
            <>
              {validationStatuses.length ? (
                <Alert severity="success">Password is at least 8 characters long</Alert>
              ) : (
                <Alert severity="error">Password must be at least 8 characters long</Alert>
              )}
              {validationStatuses.uppercase ? (
                <Alert severity="success">Password contains at least one uppercase letter</Alert>
              ) : (
                <Alert severity="error">Password must contain at least one uppercase letter</Alert>
              )}
              {validationStatuses.lowercase ? (
                <Alert severity="success">Password contains at least one lowercase letter</Alert>
              ) : (
                <Alert severity="error">Password must contain at least one lowercase letter</Alert>
              )}
              {validationStatuses.digit ? (
                <Alert severity="success">Password contains at least one digit</Alert>
              ) : (
                <Alert severity="error">Password must contain at least one digit</Alert>
              )}
              {validationStatuses.specialChar ? (
                <Alert severity="success">Password contains at least one special character (!@#$%^&*)</Alert>
              ) : (
                <Alert severity="error">Password must contain at least one special character (!@#$%^&*)</Alert>
              )}
            </>
          )}
        </Box>}>
           <TextField
          margin="normal"
          required
          fullWidth
          id="new_password"
          label="New Password"
          name="newpassword"
          autoComplete="newpassword"
          autoFocus
          type="password"
          value={newPassword}
          onChange={handlePasswordChange}
          error={!Object.values(validationStatuses).every(Boolean) && newPassword !== ''}
          helperText={!Object.values(validationStatuses).every(Boolean) && newPassword !== '' ? 'Please fix the errors below' : ''}
        />
        </LightTooltip>
       
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmpassword"
            label="Confirm Password"
            name="confirmpassword"
            autoComplete="confirmpassword"
            autoFocus
          />
          <Button
            className='sign-bt'
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={()=>navigate("/" )}
          >
           Submit
          </Button>
       
          {/* <Grid className='backtologin'>
          <Link href="#" onClick={()=>navigate("/")}>
             <ArrowBackIosOutlinedIcon /> Back to Login
          </Link>
          </Grid> */}
         
         
         
          </form>
        </Box>
       
      </Box>
    </Grid>
  </Grid>
  )
}
 
export default Resetpassword