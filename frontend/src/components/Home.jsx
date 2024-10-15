import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';


const Home = () => {

   const[courses,SetCourse]=useState([]);
   useEffect(()=>{
    axios.get('http://localhost:3000/course/').then((res)=>{
      SetCourse(res.data);
    })
   },[])


   //Delete Course
   let deleteCourse=(p)=>{
    axios.delete('http://localhost:3000/course/remove/'+p).then((res)=>{
      alert('deleted');
      window.location.reload();
    })
    .catch(()=>{console.log("error")})
   }

// Update course
   const navigate=useNavigate();
   let updateCourse=(item)=>{
    navigate('/add',{state:{item}})//add is given so that the form is loaded
   }

   const user=localStorage.getItem("username")
  
  return (
    <div><br /><br /><br />
   <Typography gutterBottom variant='h5'>Welcome {user}</Typography>
    <Grid container spacing={2} >
      {courses.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.courseId}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%',width:'300px' }}>
            <CardMedia
              sx={{ height: 250 }}
              image={item.courseImage} // Dynamically set image for each movie
              title={item.courseName}
            />
            <CardContent sx={{flex: '1 0 auto'}}>
              <Typography gutterBottom variant="h5" component="div">
                {item.courseName}
              </Typography>
              <Typography variant="body2">
                <strong>Category:</strong> {item.courseCategory}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Description:</strong> {item.courseDescription}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Fee:</strong> {item.courseFee}
              </Typography>
              <Typography><br />
                <Button sx={{backgroundColor:'black',color:'white'}}>Read More</Button>
  
                <Button  sx={{backgroundColor:'red',color:'white'}} onClick={()=>deleteCourse(item._id)}>Delete</Button>
                <Button sx={{backgroundColor:'green',color:'white'}} onClick={()=>updateCourse(item)}>Edit</Button>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
 
  </div>
  )
}

export default Home