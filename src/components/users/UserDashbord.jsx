import * as React from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import EventCard from '../eventsShow/eventCard';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useState,useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBarHeader from '../header';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function UserDashboard() {


    const [data, setData] = useState(null);
    const[filtered,setFiltered]=useState(null)
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            const res = await axios.get(
                'http://localhost:3000/users/getevents',
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('event'),
                  },
                }
              )
              
              setData(res.data);
              setFiltered(res.data);
              setLoading(false)
               
        } catch (error) {
          console.log('Client error trying to get events:', error);
          setLoading(true);
        }
      };
      fetchData();
      
    }, []);
  
    function handleSearch(input) {
          console.log(input);
          setFiltered(data.filter((event) => event.name.includes(input)));
        
        
  }





  return (
    <ThemeProvider theme={defaultTheme}>
         {loading&&filtered===null ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
    <Container>
      <CssBaseline />
      <AppBarHeader  filterEvents={handleSearch}/>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Your Parties
            </Typography>
            
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>


          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          {filtered !== null &&
            filtered.map((event,i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
               <EventCard event={event}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box></Container>)}
        </ThemeProvider>
  );
}