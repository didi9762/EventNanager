import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppBarHeader from './header';
import ListEventsShow from './eventsShow/ListEvents';
import {Box, Container, Typography, CircularProgress } from '@mui/material';

const serverBaseUrl = 'http://localhost:3000/';

function HomePage() {
  const [data, setData] = useState(null);
  const[filtered,setFiltered]=useState(null)
  const [loading, setLoading] = useState(true);
  const [sortedEvents,setSortedEvents]=useState(null)




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
        setFiltered(data.filter((event) => event.name.includes(input)));   
}
function sortHandle(sort){
    if(sort==='date')
    {const sorted = filtered.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    setFiltered(sorted)}
    else if(sort==='popular')
    {const sorted= filtered.slice().sort((a, b) => b.persons.length - a.persons.length)
        setFiltered(sorted);
    }}



  return (
    <Container>
      <AppBarHeader filterEvents={handleSearch} />
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
        <ListEventsShow events={filtered} sortHandle={sortHandle} />
      )}
    </Container>
  );
}

export default HomePage;
