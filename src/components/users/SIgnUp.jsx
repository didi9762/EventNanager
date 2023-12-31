import axios from 'axios';
import AppBarHeader from '../header';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Event Manager
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {


    async function signin(datauser){
        try{
            const response = await axios.post('http://localhost:3000/users/signup',datauser)
            if (response.status==200) {
            const token = response.data
            localStorage.setItem('event',token)
            window.location.href = localStorage.getItem('lasturl')
            }
            else{console.log(response.status);}
        }catch(e){console.log('error try to log in:',e);}
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const datauser = ({
    
      username: data.get('username'),
      password: data.get('password'),
      firstName:data.get('firstname'),
        lastName:data.get('lastname'),
        age:data.get('age')
    });
    signin(datauser)
  };

  return (
    <ThemeProvider theme={defaultTheme}>
        <AppBarHeader/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
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
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstname"
              label="first name"
              type="firstname"
              id="firstname"
              autoComplete="firstname"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="last naem"
              type="lastname"
              id="lastnaem"
              autoComplete="lastname"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="age"
              label="age"
              type="age"
              id="age"
              autoComplete="age"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
              <Link to={`/UserPage`} style={{ textDecoration: 'none' }}> 
                  {"already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}