import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppBarHeader from './header';
import ListEventsShow from './eventsShow/ListEvents';
import { Container, Typography, CircularProgress } from '@mui/material';

const serverBaseUrl = 'http://localhost:3000/';

function HomePage() {
  const [data, setData] = useState(null);
  const[filtered,setFiltered]=useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverBaseUrl}rout/getevents`);
        setData(response.data);
        setFiltered(response.data)
        setLoading(false);
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
    <Container>
      <AppBarHeader filterEvents={handleSearch}/>
      <Typography variant="h2" align="center" gutterBottom>
        Events
      </Typography>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
        <ListEventsShow events={filtered} />
      )}
    </Container>
  );
}

export default HomePage;
