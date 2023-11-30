import {  Typography,Card, CardContent, CardMedia, Grid, Box } from '@mui/material';
import EventCard from './eventCard';
import FilterBy from '../filterOptions';
import { useState } from 'react';


export default function ListEventsShow({events,sortHandle}){


return(

<Grid container spacing={10} >
    <Grid mt={10}>
<Box sx={{ flexGrow: 1, ml:20}}>
      <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color:'white',fontSize:'xx-large',flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
          >
        Events coming soon
      </Typography>
      
<FilterBy filterBy={sortHandle}/></Box></Grid>
{events.map((event, index) => (
    <Grid item key={index} xs={12} sm={12} md={12} mt={10}display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <EventCard event={event}/>
    </Grid>
  ))}</Grid>)
}