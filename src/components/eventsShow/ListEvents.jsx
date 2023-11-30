import {  Typography,Card, CardContent, CardMedia, Grid } from '@mui/material';
import EventCard from './eventCard';


export default function ListEventsShow({events}){
return(
    
<Grid container spacing={10} >
{events.map((event, index) => (
    <Grid item key={index} xs={12} sm={12} md={12} mt={10}display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <EventCard event={event}/>
    </Grid>
  ))}</Grid>)
}