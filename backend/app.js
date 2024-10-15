const express=require('express')
const cors=require('cors')
const morgan=require('morgan');
const app=new express;


app.use(morgan('dev'));
app.use(cors());

const cRoute=require('./routes/course_routes');
app.use('/course', cRoute)
const user_route=require('./routes/user')
app.use("/user",user_route)

require('dotenv').config();
const PORT=process.env.PORT;
require('./db/connection');




app.listen(PORT,()=>{console.log(`Server is initiated on PORT ${PORT}`);})
