import { Typography,Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

export default function EventCard({event,userShow}){
const freeTicket = event.places-event.persons.length
const formattedDate = new Date(event.date).toLocaleDateString();
const dateObject = new Date(event.date);
const hours = dateObject.getHours().toString()
const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    return(
        <Link to={`/event/${event._id}`} style={{ textDecoration: 'none' }}>  
<Card 
sx={{
    width: 600,
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
    },
  }}
>
{freeTicket===0&&!userShow&&(<div style={{color:'white',background:'red',boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.9)',
position:'absolute',marginTop:30,width:'600px',height:'30px',textAlign:'center',lineHeight:'1',fontSize:'x-large'}}>
    sold out</div>)}
        <CardMedia
          component="img"
          alt={event.name}
          height="300"
          image={event.pic}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {event.free ? 'Free' : `Price: ${event.price}`}
            {`    ${freeTicket} avalible ticket`}
            
          </Typography>
          <Typography>{`${formattedDate} at:${hours}:${minutes}`}</Typography>
        </CardContent>
      </Card>
      </Link>
      )
}