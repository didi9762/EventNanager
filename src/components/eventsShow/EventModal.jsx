import {CircularProgress, Grid, Box, CardMedia, Typography, Container, CardContent, IconButton } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppBarHeader from '../header';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Rating1 from './rating';
import { Login } from '@mui/icons-material';


export default function EventPage(props){
const {id}= useParams()
const [posted,setPosted]=useState(false)
const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [type,setType] = useState('success')
    const [event,setEvent]= useState(null)   
    const [loading, setLoading] = useState(true); 
    const [location,setLocation]= useState(null)
    const[obj,setObj] = useState(null) 

useEffect(()=>{
    async function getData(){
        try{
            const response = await axios.get(`http://localhost:3000/rout/getevent/${id}`)
            const data = await response.data
            setEvent(data.event)
            setObj(data)
            setLoading(false)
            getLocation(id)

       
        }catch(e){console.log('error try get event data:',e);setLoading(true);}
       }
    
     getData()
},[])

function change(){
setPosted(true)
}

async function getLocation(id){
try{
    const response= await axios.get(`http://localhost:3000/rout/getmap/${id}`)
    if (response.data==='no location'){return}
    const blob = await response.blob()
    const urlImg =  URL.createObjectURL(blob)
    setLocation(urlImg)
}catch(e){console.log('error try get map',e);}
}

const showMessage = (message,typeM) => {
    setType(typeM)
    setSnackbarMessage(message);
    setOpenSnackbar(true);
};

const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSnackbar(false);
};

async function handlesave(){
    const eventData = event._id
    try{
        const res = await axios.put(
            'http://localhost:3000/rout/saveplace',
            { eventData },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('event'),
              },
            }
          );
         
          if(res.data==='already exist'){showMessage('ticket already saved','error')}
          else if(res.data==='full'){showMessage('no more avelible tickets','error')}
          else if(res.data==='age limited'){showMessage('you are to young for that','error')}
          else  if(res.status==200){showMessage('sucssusfull','success')}
    }catch(e){'error save palce',e}
}



    return(<Container >
        <AppBarHeader/>
        <Container sx={{width:'85%'}}>
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
            </div>
          ) : (
            
        
            <Box sx={{ flexGrow: 1}}>
<Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
    <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={type}>
        {snackbarMessage}
    </MuiAlert>
</Snackbar>

            <Grid  sm={12} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
          <CardMedia component="img" height="500" image={event.pic} alt="Event Image" sx={{mb:5}}></CardMedia>
         <Container >
            <div  className='textErea' style={{background:'white',marginBottom:50,height:'200px', padding:10}} >
            <Typography variant='h10'>
                {event.name}
            </Typography>
            <Typography variant='h6'>
               {event.describe}
            </Typography>

            <Typography variant='h6'>{`${new Date(event.date).toLocaleDateString()}
             ${new Date(event.date).getHours().toString()}:${new Date(event.date).getMinutes().toString().padStart(2, '0')} `}</Typography>
            </div>
         
         
            <div className='reserve' style={{height:'200px',background:'white',padding:'10px'}}>
                <Typography variant='h5'>{`age limited:${event.minAge?event.minAge:'18'}`}</Typography>
                <Typography variant='h5'>PRICE : {event.price}</Typography>
                <IconButton onClick={handlesave}>
                    save a ticket
                </IconButton>
         </div>
         <div>
            {location?<img src={location}></img>:null}
         </div>
         <div className='rating' >
            
        <Rating1 event={obj} change={change} posted={posted}/>
         </div>
         </Container>
          </Grid>
          </Box>
          )}
          </Container>
          </Container>
          
    )
}