import { Container, TextField, Typography,Button,Grid } from "@mui/material";
import {useEffect,useState}from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Rating1({event,change,posted}){

    const [value, setValue] = useState(null)
    const [sumValue, setSumValue] = useState(null);
   
    const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
useEffect(()=>{
    if(event.rating){
        const rateSum = event.rating.reduce((sum, rate) => sum + parseInt(rate.rating, 10), 0) / event.rating.length;

    setSumValue(rateSum)}
    else{setSumValue(0)}
    
},[])



async function postRate(rateObj){
try{
    const response = await axios.post(`http://localhost:3000/users/rate/${event.event._id}`,rateObj, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('event'),
        },
      })
    if(response.data==='rated'){showMessage('already rated thank you')}
    change()
}catch(e){console.log('error try post rate',e);}
}

const showMessage = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
};

const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSnackbar(false);
};


const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    console.log(formValues);
    postRate(formValues)
  
    // Log the form data object
    console.log('Form Data:', formValues);
  };
  

  
    return (
        <Container sx={{mt:10,bgcolor:'white'}}>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
    <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={'error'}>
        {snackbarMessage}
    </MuiAlert>
</Snackbar>
            <Typography variant="h5">
                event rating 
            </Typography>
            <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >{!posted?<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    
      <Typography component="legend">Rate the event</Typography>
      <Rating
        name="rating"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      
            <TextField
              margin="normal"
              required
              fullWidth
              id="comment"
              label="Add Comment"
              name="comment"
              autoComplete="comment"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
            </Box>:null}


        
      <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}flexDirection={'column'} mt={10}
      >
      {!event.rating&&sumValue===0?<Typography variant="h6">no rateing yet</Typography>:null}
        <Typography>avrage rates</Typography>
      <Rating name="readOnly" value={sumValue} readOnly sx={{mb:10}}/>
      <Typography variant="h5">Comments:</Typography>
      {!event.rating?<Typography variant="h6">no comments yet</Typography>:null}
      {event.rating?event.rating.filter((rate)=>rate.comment).map((rate,index)=>
            <Grid item key={index} xs={12} sm={12} md={12} mt={10}display={'flex'} justifyContent={'center'} alignItems={'center'}flexDirection={'column'}>

            <Typography variant="h5">{rate.userName}</Typography>
            <Rating name="readOnly" value={rate.rating} readOnly/>
            <Typography variant="h6">{rate.comment}</Typography>
        </Grid>)
      :null}</Grid>
    </Box>

        </Container>
    )
}