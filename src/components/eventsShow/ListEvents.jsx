import {  Typography,Card, CardContent, CardMedia, Grid } from '@mui/material';


export default function ListEventsShow({events}){
return(<Grid container spacing={3}>
{events.map((event, index) => (
    <Grid item key={index} xs={12} sm={6} md={4}>
      <Card>
        <CardMedia
          component="img"
          alt={event.name}
          height="140"
          image={event.picture}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {event.free ? 'Free' : `Price: ${event.price}`}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Places: {event.places}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}</Grid>)
}