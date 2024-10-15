import { Button, MenuItem, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Add = () => {
    // array and function for drop down menu
    const courseCategories = [
        { value: 'irp', label: 'Industry Readiness Program' },
        { value: 'smp', label: 'Six Month Program' },
        { value: 'upskilling', label: 'Upskilling Program' },
      ];
      const [category, setCategory] = useState('');

      const handleChange = (event) => {
        setCategory(event.target.value);
        fetchValue(event);     
      };




     const navigate=useNavigate();
      //array and function to submit data
      const[course,setCourse]=useState(
        {courseName:'',
          courseDescription:'',
          courseCategory:'',
          courseId:'',
          courseFee:''})

      const fetchValue=(event)=>{
      setCourse({...course,[event.target.name]: event.target.value});
      }
  



      const location=useLocation()
      const sendData=()=>{
      //console.log(course);
      if(location.state!=null){
        console.log("for updation")
        // item below is the object put under state in home.jsx; course is the object used to define/connect the coursefield details in the form
        axios.put('http://localhost:3000/course/edit/'+location.state.item._id,course).then((res)=>{
        alert("Data updated");
        navigate('/home');
      }).catch((error)=>{
        console.log(error);
      })
     }
     else{
      console.log("inside post")
      axios.post('http://localhost:3000/course/addcourse',course).then((res)=>{
        navigate('/home');
      }).catch((error)=>{
        console.log(error)
      })
     }
    }
     useEffect(()=>{
      if(location.state!=null){
        setCourse({...course,
          courseId:location.state.item.courseId,
          courseName:location.state.item.courseName,
          courseDescription:location.state.item.courseDescription,
          courseImage:location.state.item.courseImage,
          courseCategory:location.state.item.courseCategory,
          courseFee:location.state.item.courseFee
        })
      }
     },[])
     return (
      <div>
        <br />
        <h2>Add Course</h2><br />
        <TextField fullWidth id="outlined-basic" label="Course ID" variant="outlined"onChange={fetchValue} name="courseId" value={course.courseId}/><br /><br />
        <TextField fullWidth id="outlined-basic" label="Course Name" variant="outlined" onChange={fetchValue} name="courseName" value={course.courseName}/><br /><br />
        <br />
        <TextField fullWidth id="outlined-select" select label="Course Category" value={course.courseCategory} onChange={handleChange} variant="outlined"  name="courseCategory"  >
        {courseCategories.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
        ))}
        </TextField><br /><br />
        <TextField  fullWidth id="outlined-basic" variant="outlined" label="Image url" onChange={fetchValue} name="courseImage" value={course.courseImage}></TextField><br /><br />
        <TextField
        fullWidth
          id="outlined-textarea-basic"
          label="Course Description"
          multiline onChange={fetchValue} name="courseDescription" value={course.courseDescription} /><br /><br />
        <TextField fullWidth id="outlined-basic" label="Course Fee" variant="outlined" onChange={fetchValue} name="courseFee" value={course.courseFee} /><br />
        <Button variant="contained" sx={{backgroundColor:'#96D0E2',color:'white', margin:2}} onClick={sendData} >Add Course</Button>
    </div>
  )
}

export default Add